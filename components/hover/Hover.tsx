import React, { createContext, useContext, useEffect, useState, FC } from "react";
import { twMerge } from "tailwind-merge";

interface IHoverProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  delay?: number;
}

interface IHoverContext {
  isOpen: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
}

const HoverContext = createContext<IHoverContext | null>(null);

interface IHoverComponent extends FC<IHoverProps> {
  Trigger: FC<IHoverTriggerProps>;
  Content: FC<IHoverContentProps>;
}

const Hover: IHoverComponent = (props) => {
  const { delay = 0 } = props;

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleMouseEnter() {
    setIsHover(true);
  }

  function handleMouseLeave() {
    setIsHover(false);
  }

  function handleFocus() {
    setIsFocus(true);
  }

  function handleBlur() {
    setIsFocus(false);
  }

  function handleOpenContent() {
    setIsOpen(true);
  }

  function handleCloseContent() {
    setIsOpen(false);
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isHover || isFocus) {
      timeout = setTimeout(handleOpenContent, delay);
    } else {
      timeout = setTimeout(handleCloseContent, delay < 200 ? 200 : delay);
    }

    return () => clearTimeout(timeout);
  }, [isHover, isFocus, delay]);

  const hoverContextValue: IHoverContext = {
    isOpen: isOpen,
    handleMouseEnter: handleMouseEnter,
    handleMouseLeave: handleMouseLeave,
    handleFocus: handleFocus,
    handleBlur: handleBlur
  };

  return (
    <HoverContext.Provider value={hoverContextValue}>
      <div className={twMerge("relative flex flex-col items-center", props.className)}>
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === Hover.Trigger) {
              return child;
            }
            if (child.type === Hover.Content) {
              return child;
            }
          }
          return null;
        })}
      </div>
    </HoverContext.Provider>
  );
};

interface IHoverTriggerProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const HoverTrigger: FC<IHoverTriggerProps> = (props) => {
  const { handleMouseEnter, handleMouseLeave, handleFocus, handleBlur } = useContext(HoverContext)!;

  return (
    <div
      className={props.className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      {props.children}
    </div>
  );
};

interface IHoverContentProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const HoverContent: FC<IHoverContentProps> = (props) => {
  const { isOpen, handleMouseEnter, handleMouseLeave, handleFocus, handleBlur } = useContext(HoverContext)!;

  if (isOpen) {
    return (
      <div
        className={twMerge("absolute", props.className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {props.children}
      </div>
    );
  } else {
    return null;
  }
};

Hover.Trigger = HoverTrigger;
Hover.Content = HoverContent;

export default Hover;
