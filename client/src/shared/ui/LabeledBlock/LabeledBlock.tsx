import { FC, ReactNode } from "react";

interface LabeledBlockProps {
  label: string;
  children: ReactNode | string | number;
}

const LabeledBlock: FC<LabeledBlockProps> = ({ label, children }) => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <h2 className="w-min text-2xl uppercase">{label}</h2>
      </div>
      <div className="w-3/4">{children}</div>
    </div>
  );
};

export default LabeledBlock;