package tasks

import (
	"core/models"
	"core/repositories"
	"encoding/json"
	"regexp"
)

func PullRequestsMetric(task models.Task, repo *repositories.SnapshotRepository) {
	var parsed []interface{}

	err := json.Unmarshal([]byte(task.Data), &parsed)

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "PullRequests", Data: "", Groups: task.Groups, Error: err.Error()})
		return;
	}

	issuesDB, err := repo.GetByGroupList("PullRequests", task.Groups)

	if err != nil {
		return;
	}

	issuesDBMap := mapSnapshotsByNodeIds(issuesDB)

	endpoint := getEndpoint(parsed)

	if endpoint == "" {
		repo.Create(&models.Snapshot{Metric: "PullRequests", Data: "", Groups: task.Groups, Error: "no API endpoint"})
		return;
	}

	apiKeys := getAPIKeys(parsed)

	if len(apiKeys) == 0 {
		repo.Create(&models.Snapshot{Metric: task.Metric, Data: "", Groups: task.Groups, Error: "no API keys", IsPublic: task.IsPublic})
	}

	if err != nil {
		repo.Create(&models.Snapshot{Metric: "PullRequests", Data: "", Groups: task.Groups, Error: err.Error()})
	}

	var issues []interface{}
	var outdated []uint

	page := 1
	issuesBatch := getIssueBatch(endpoint, page, apiKeys)

	for len(issuesBatch) != 0 {

		for _, issue := range issuesBatch {

			// if issue["html_url"] has '/pull/', continue
			pattern := `/pull/`
			re := regexp.MustCompile(pattern)
			match := re.FindStringSubmatch(issue.(map[string]interface{})["html_url"].(string))

			if len(match) == 0 {
				continue
			}

			issueInDB, foundInDB := issuesDBMap[issue.(map[string]interface{})["node_id"].(string)]
			issueDate := issue.(map[string]interface{})["updated_at"].(string)

			if foundInDB {
				var data interface{}

				err := json.Unmarshal([]byte(issueInDB.Data), &data)

				if err != nil {
					continue
				}

				issueDBDate := data.(map[string]interface{})["updated_at"].(string)

				if issueDate != issueDBDate {
					outdated = append(outdated, issueInDB.ID)
				} else {
					continue;
				}
			}

			issues = append(issues, issue)
		}

		page += 1
		issuesBatch = getIssueBatch(endpoint, page, apiKeys)
	}

	var result []*models.Snapshot
	
	for _, issue := range issues {

		if issue == nil {
			continue
		}

		data, err := json.Marshal(issue)

		if err != nil {
			continue
		}

		result = append(result, &models.Snapshot{
			Metric: "PullRequests",
			Data: string(data),
			Groups: task.Groups,
			Params: []models.SnapshotParam{
				{
					Name: "id",
					Value: issue.(map[string]interface{})["node_id"].(string),
				},
			},
			Error: "",
			IsPublic: task.IsPublic,
		})
	}

	if len(outdated) != 0 {
		repo.OutdateByIdList(outdated)
	}

	if len(result) != 0 {
		repo.CreateInBatches(result)
	}
}