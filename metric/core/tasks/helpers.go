package tasks

func getEndpoint(parsedData interface{}) string {
	for _, v := range parsedData.([]interface{}) {
		if v.(map[string]interface{})["prop"] == "apiEndpoint" {
			return v.(map[string]interface{})["value"].(string)
		}
	}

	return ""
}

func getAPIKeys(parsedData interface{}) []string {
	for _, v := range parsedData.([]interface{}) {
		if v.(map[string]interface{})["prop"] == "apiKeys" {
			var result []string

			for _, apiKey := range v.(map[string]interface{})["value"].([]interface{}) {
				result = append(result, apiKey.(string))
			}
			return result
		}
	}

	return nil
}