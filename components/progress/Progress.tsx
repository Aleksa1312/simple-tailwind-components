import React, { createContext, useContext } from "react";
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

const Progress = (props: IProgressProps) => {
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

Progress.Fill = (props: IProgressFillProps) => {
  const { value } = useContext(ProgressContext)!;

  return <div className={twMerge("h-full", props.className)} style={{ width: `${value}%` }}></div>;
};

interface IProgressValueProps {
  className?: string;
}

Progress.Value = (props: IProgressValueProps) => {
  const { value } = useContext(ProgressContext)!;

  return <p className={twMerge("absolute", props.className)}>{value}%</p>;
};

export default Progress;
