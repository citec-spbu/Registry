import { FC, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { groupData } from "../utils/generateGraphData";
import { PullRequests } from "../../PullRequests";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface GraphProps {
  data: PullRequests;
}

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  barThickness: 14,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
      display: false,
    },
    // to remove the y-axis labels
    y: {
      display: false,
    },
  },
  legend: {
    display: false,
  },
  plugins: {
    tooltip: {
      filter: function (tooltipItem: any) {
        return tooltipItem.datasetIndex === 0;
      },
    },
  },
  layout: {
    padding: {
      top: 40,
    },
  },
};

const Graph: FC<GraphProps> = ({ data }) => {
  const ref = useRef();

  const formatData = groupData(data, 7);

  const max = Math.max(
    ...formatData.map((item) => {
      return item.data;
    })
  );

  const layoutValues = formatData.map((_) => max);

  const formattedData: any = {
    labels: formatData.map((item) => item.label),
    datasets: [
      {
        label: "Rapid Pull Requests",
        data: formatData.map((item) => item.data || null),
        backgroundColor: "#551FFF",
        borderColor: "#551FFF",
        borderWidth: 1,
        borderRadius: 20,
        datalabels: {
          display: false,
        },
      },
      {
        label: "Layout",
        data: layoutValues,
        backgroundColor: "#E9EDF7",
        borderColor: "#E9EDF7",
        borderWidth: 1,
        borderRadius: 20,
        datalabels: {
          formatter: function (_: any, context: any) {
            return formatData[context.dataIndex].data || 0;
          },
          color: "#B0BBD5",
          align: "top",
          anchor: "end",
          font: {
            weight: "bold",
          },
        },
      },
    ],
  };

  return (
    <div className="relative h-40">
      <Bar
        ref={ref}
        plugins={[ChartDataLabels]}
        data={formattedData}
        options={options}
      />
    </div>
  );
};

export default Graph;
