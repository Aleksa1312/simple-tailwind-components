import React, { createContext, useContext, FC } from "react";
import { twMerge } from "tailwind-merge";

interface IProgressProps {
  value?: number;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

interface IProgressContext {
  value: number;
}

const ProgressContext = createContext<IProgressContext | null>(null);

interface IProgressComponent extends FC<IProgressProps> {
  Fill: FC<IProgressFillProps>;
  Value: FC<IProgressValueProps>;
}

const Progress: IProgressComponent = (props) => {
  const { value = 0 } = props;

  const progressContextValue: IProgressContext = {
    value: value
  };

  return (
    <ProgressContext.Provider value={progressContextValue}>
      <div className={twMerge("overflow-hidden relative flex items-center", props.className)}>
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === Progress.Value) {
              return child;
            }
            if (child.type === Progress.Fill) {
              return child;
            }
          }
        })}
      </div>
    </ProgressContext.Provider>
  );
};

interface IProgressFillProps {
  className?: string;
}

const ProgressFill: FC<IProgressFillProps> = (props) => {
  const { value } = useContext(ProgressContext)!;

  return <div className={twMerge("h-full", props.className)} style={{ width: `${value}%` }}></div>;
};

interface IProgressValueProps {
  className?: string;
}

const ProgressValue: FC<IProgressValueProps> = (props) => {
  const { value } = useContext(ProgressContext)!;

  return <p className={twMerge("absolute", props.className)}>{value}%</p>;
};

Progress.Fill = ProgressFill;
Progress.Value = ProgressValue;

Progress.displayName = "Progress";
ProgressFill.displayName = "Progress.Fill";
ProgressValue.displayName = "Progress.Value";

export default Progress;
