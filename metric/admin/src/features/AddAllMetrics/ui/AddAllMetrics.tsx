import { useAppDispatch, useAppSelector } from "@/app/store";
import { metricSlice } from "@/entities/Metric";
import { useGetMetricNamesQuery } from "@/entities/Metric/model/metricApi";
import { useCreateAllMetricsMutation } from "@/entities/Resource/model/resourceApi";
import { PlusIcon } from "@/shared/ui/Icons";
import { LoadingCircle } from "@/shared/ui/LoadingCircle";
import { FC, useEffect } from "react";

interface AddAllMetricsProps {
  resource: string;
}

const AddAllMetrics: FC<AddAllMetricsProps> = ({ resource: resourceId }) => {
  const metricInfo = useGetMetricNamesQuery();
  const metrics = useAppSelector((state) => state.metric.metrics);
  const [create, { data: createData, isLoading }] =
    useCreateAllMetricsMutation();

  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (leftToAdd) {
      const result = await create(resourceId);

      if (!result.hasOwnProperty("error")) {
        console.log(result);
      }
    }
  };

  useEffect(() => {
    console.log(createData);
    createData?.forEach((metric) => {
      if (metric && !metrics.find((m) => m.id == metric.id)) {
        dispatch(metricSlice.actions.pushMetric(metric));
      }
    });
  }, [createData]);

  if (!metricInfo.data || !metrics) return <></>;

  const leftToAdd = metricInfo.data.filter(
    (metric) =>
      !metrics.find((m) => m.name == metric.name && m.resource == resourceId)
  );

  if (leftToAdd.length == 0) return <></>;

  if (isLoading)
    return (
      <div className="w-full h-12 py-1 flex justify-center items-center text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg">
        <LoadingCircle size={26} />
      </div>
    );

  return (
    <button
      onClick={handleClick}
      className={
        "w-full flex justify-center items-center gap-4 h-12 py-3 px-14 font-medium rounded-lg text-[#551FFF] bg-[#F3F0FF]"
      }
    >
      <PlusIcon width="15.124" height="15.124" />
      <span>Add All Metrics</span>
    </button>
  );
};

export default AddAllMetrics;
