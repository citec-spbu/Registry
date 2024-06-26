import { useAppDispatch, useAppSelector } from "@/app/store";
import { metricSlice } from "@/entities/Metric";
import { useExecuteMetricMutation } from "@/entities/Metric/model/metricApi";
import { RefreshIcon } from "@/shared/ui/Icons";
import { FC, useState } from "react";
import { shallowEqual } from "react-redux";

interface ForceExecuteProps {
  metricId: string;
  className?: string;
}

const ForceExecute: FC<ForceExecuteProps> = ({ metricId, className }) => {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const [execute] = useExecuteMetricMutation();

  const metric = useAppSelector(
    (state) => state.metric.metrics.find((m) => m.id === metricId),
    shallowEqual
  );

  // Make a request
  const handleClick = async () => {
    if (isLoading) return;

    setLoading(true);
    if (metric) {
      const result = await execute(metric);

      if (!result.hasOwnProperty("error")) {
        dispatch(
          metricSlice.actions.updateStatus({
            metricId: metric.id,
            isTracked: true,
          })
        );
      }
    }

    setLoading(false);
  };

  // Updating the store is not needed here
  // The updates will arrive through the websocket

  return (
    <button
      onClick={handleClick}
      className={
        "bg-[#e9edf8] border-[#e2e7f5] h-[3.25rem] text-[#252525] w-[3.25rem] border  flex justify-center items-center rounded-xl " +
        className
      }
    >
      <RefreshIcon
        className={`${isLoading ? "animate-spin" : ""}`}
        height="22"
        width="22"
      />
    </button>
  );
};

export default ForceExecute;
