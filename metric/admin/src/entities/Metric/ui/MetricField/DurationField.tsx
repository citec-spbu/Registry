import { FC } from "react";
import { IDurationParam, MetricParamData } from "../../types/params";
import { Tooltip } from "@/shared/ui/Tooltip";
import { Duration, DurationValue } from "@/shared/ui/DurationInput";

interface DurationFieldProps extends IDurationParam, MetricParamData {
  onChange: (value: DurationValue) => void;
  className?: string;
}

const DurationField: FC<DurationFieldProps> = ({
  value,
  label,
  tooltip,
  onChange,
  className = "",
}) => {
  return (
    <div className={className}>
      {!!tooltip && (
        <Tooltip className="text-[#A3AED0]" tooltip={tooltip}>
          <h2 className="inline-block">{label}</h2>
        </Tooltip>
      )}
      {!tooltip && <h2 className="inline-block">{label}</h2>}
      <div className="pt-4" />
      <Duration value={value} onChange={onChange} />
    </div>
  );
};

export default DurationField;
