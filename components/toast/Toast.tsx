import React, { createContext, useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IToastProps {
  children: React.ReactNode | React.ReactNode[];
  open: boolean;
  onOpenChange: (state: boolean) => void;
}

interface IToastContext {
  open: boolean;
  onOpenChange: (state: boolean) => void;
}

const ToastContext = createContext<IToastContext | null>(null);

const Toast = (props: IToastProps) => {
  const toastContextValue: IToastContext = {
    open: props.open,
    onOpenChange: props.onOpenChange
  };

  useEffect(() => {
    function handleEscPress(e: KeyboardEvent) {
      if (e.key === "Escape") {
        props.onOpenChange(false);
      }
    }

    document.addEventListener("keydown", (e) => handleEscPress(e));

    return () => document.removeEventListener("keydown", (e) => handleEscPress(e));
  }, []);

  if (props.open) {
    return (
      <ToastContext.Provider value={toastContextValue}>
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === Toast.Content) {
              return child;
            }
          }
        })}
      </ToastContext.Provider>
    );
  }
};

interface IToastContentProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

Toast.Content = (props: IToastContentProps) => {
  const { onOpenChange, open } = useContext(ToastContext)!;

  const [isHover, setIsHover] = useState<boolean>(false);

  function handleMouseEnter() {
    setIsHover(true);
  }

  function handleMouseLeave() {
    setIsHover(false);
  }

  useEffect(() => {
    const timeout = setTimeout(() => onOpenChange(false), 5000);

    if (isHover) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [isHover]);

  return (
    <ol
      className="fixed p-5 max-w-md w-full h-fit bottom-0 right-0 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className={twMerge("w-full h-full p-5", props.className)} tabIndex={0}>
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === Toast.Close) {
              return child;
            }
          }
          return child;
        })}
      </ul>
    </ol>
  );
};

interface IToastCloseProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

Toast.Close = (props: IToastCloseProps) => {
  const { onOpenChange } = useContext(ToastContext)!;

  return (
    <button onClick={() => onOpenChange(false)} className={props.className}>
      {props.children}
    </button>
  );
};

export default Toast;
