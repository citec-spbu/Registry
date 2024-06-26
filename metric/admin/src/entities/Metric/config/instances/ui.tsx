import { FC } from "react";
import { IMetric, MetricName } from "./types";
import { TotalCommits } from "../../instances/TotalCommits";
import { IssueCompleteness } from "../../instances/IssueCompleteness";
import PullRequestHangTime from "../../instances/PullRequestHangTime/ui/PullRequestHangTime";
import RapidPullRequests from "../../instances/RapidPullRequests/ui/RapidPullRequests";
import Grade from "../../instances/Grade/ui/Grade";
import { DominantWeekDay } from "../../instances/DominantWeekDay";
import { CodeChurn } from "../../instances/CodeChurn";
import { CodeOwnership } from "../../instances/CodeOwnership";

interface MetricUIProps {
  metric: IMetric;
  dependencies: IMetric[];
}

const MetricUI: FC<MetricUIProps> = ({ metric, dependencies }) => {
  switch (metric.name) {
    case MetricName.TotalCommits:
      return <TotalCommits {...metric} dependencies={dependencies} />;
    case MetricName.IssueCompleteness:
      return <IssueCompleteness {...metric} dependencies={dependencies} />;
    case MetricName.PullRequestHangTime:
      return <PullRequestHangTime {...metric} dependencies={dependencies} />;
    case MetricName.RapidPullRequests:
      return <RapidPullRequests {...metric} dependencies={dependencies} />;
    case MetricName.Grade:
      return <Grade {...metric} dependencies={dependencies} />;
    case MetricName.DominantWeekDay:
      return <DominantWeekDay {...metric} dependencies={dependencies} />;
    case MetricName.CodeChurn:
      return <CodeChurn {...metric} dependencies={dependencies} />;
    case MetricName.CodeOwnership:
      return <CodeOwnership {...metric} dependencies={dependencies} />;
    default:
      return <></>;
  }
};

export default MetricUI;
