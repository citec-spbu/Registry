import { Dropdown } from "@/shared/ui/Dropdown";
import { Tooltip } from "@/shared/ui/Tooltip";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  useCreateMetricMutation,
  useGetMetricInfoQuery,
} from "@/entities/Metric/model/metricApi";
import { LoadingCircle } from "@/shared/ui/LoadingCircle";
import { metricSlice } from "@/entities/Metric";
import { IAbstractMetricDetailed } from "@/entities/Metric/types";
import { Modal } from "@/shared/ui/Modal";
import { PlusIcon } from "@/shared/ui/Icons";
import { shallowEqual } from "react-redux";

interface CreateProps {
  project: string;
  resource: string;
}

const Create: FC<CreateProps> = ({ project, resource: resourceId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState<IAbstractMetricDetailed | null>(
    null
  );

  const resource = useAppSelector(
    (state) => state.resource.resources.find((r) => r.id == resourceId),
    shallowEqual
  );

  const { data } = useGetMetricInfoQuery();

  // only use metrics for this resource
  const metrics = useAppSelector(
    (state) => state.metric.metrics.filter((m) => m.resource == resourceId),
    shallowEqual
  );
  const dispatch = useAppDispatch();

  // Only show metrics that are not already created
  const filteredData =
    data?.filter(
      (metric) =>
        !metrics.find((m) => m.name == metric.name) &&
        metric.platform == resource?.platform
    ) || [];

  const [mutate, { data: createData, isLoading }] = useCreateMetricMutation();

  const handleSubmitClick = async () => {
    if (!selected) return;

    // If there are dependencies, open modal
    if (selected.dependencies.length > 0) {
      setIsOpen(true);
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    if (!selected) return;

    await mutate({
      project: project,
      resource: resourceId,
      name: selected.name,
    });
    setSelected(null);
    setIsOpen(false);
  };

  // Update the store
  // createData contains an array of metrics (the target metric and all its newly created dependencies)
  useEffect(() => {
    createData?.forEach((metric) => {
      // with how the API works, no metrics from 'createData' could have already been in 'metrics'
      // but having that id check allows me to sleep well at night
      if (metric && !metrics.find((m) => m.id == metric.id)) {
        dispatch(metricSlice.actions.pushMetric(metric));
      }
    });
  }, [createData]);

  if (!data || !filteredData || !filteredData.length) return <div></div>;

  return (
    <>
      <div>
        <Tooltip className="text-[#A3AED0]" tooltip="Select a metric to add">
          <h2 className="inline-block">Add Metric</h2>
        </Tooltip>
        <div className="pt-2" />
        <div className="flex justify-between items-center gap-11">
          <Dropdown
            placeholder="Select a metric"
            value={selected?.name || ""}
            onChange={(name) =>
              setSelected(data?.find((m) => m.name == name) || null)
            }
            namePrefix="new-metric"
            options={filteredData.map((metric) => metric.name)}
          />
          {!isLoading && (
            <button
              onClick={handleSubmitClick}
              className={
                "w-80 flex justify-center items-center gap-4 h-12 py-3 px-14 font-medium rounded-lg " +
                (selected
                  ? "text-[#F3F0FF] bg-[#551FFF]"
                  : "text-[#551FFF] bg-[#F3F0FF]")
              }
            >
              <PlusIcon width="15.124" height="15.124" />
              <span>Add Metric</span>
            </button>
          )}
          {isLoading && (
            <div className="w-80 h-12 py-1 flex justify-center items-center text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg">
              <LoadingCircle size={26} />
            </div>
          )}
        </div>
      </div>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className="bg-white text-center relative pt-7 w-1/2 rounded-lg pb-11">
          <h2 className="font-bold text-2xl text-primary">Add Metric</h2>
          <div className="pt-6">
            This metric will start additional dependencies:
            <ul className="py-2 list-disc flex flex-col items-center">
              {selected?.dependencies.map((dep) => (
                <li key={dep}>{dep}</li>
              ))}
            </ul>
          </div>
          <p className="pt-4 pb-6">Start the metric?</p>
          <div className="flex justify-center gap-10">
            <button
              onClick={() => setIsOpen(false)}
              className="py-3 px-14 text-[#551FFF] font-medium bg-[#F3F0FF] rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="py-3 px-14 bg-[#551FFF] font-medium text-[#F3F0FF] rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Create;
