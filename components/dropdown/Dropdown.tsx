import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IDropdownProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

interface IDropdownContext {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const DropdownContext = createContext<IDropdownContext | null>(null);

const Dropdown = (props: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  const dropdownContextValue: IDropdownContext = {
    isOpen: isOpen,
    handleOpen: handleOpen,
    handleClose: handleClose
  };

  useEffect(() => {
    function handleEscPress(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", (e) => handleEscPress(e));

    return () => document.removeEventListener("keydown", (e) => handleEscPress(e));
  }, []);

  return (
    <DropdownContext.Provider value={dropdownContextValue}>
      <div className={twMerge("relative flex flex-col items-center", props.className)}>
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === Dropdown.Overlay) {
              return child;
            }
            if (child.type === Dropdown.Trigger) {
              return child;
            }
            if (child.type === Dropdown.Content) {
              return child;
            }
          }
        })}
      </div>
    </DropdownContext.Provider>
  );
};

interface IDropdownTriggerProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

Dropdown.Trigger = (props: IDropdownTriggerProps) => {
  const { handleOpen, handleClose, isOpen } = useContext(DropdownContext)!;

  return (
    <button onClick={isOpen ? handleClose : handleOpen} className={props.className}>
      {props.children}
    </button>
  );
};

interface IDropdownContentProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

Dropdown.Content = (props: IDropdownContentProps) => {
  const { isOpen } = useContext(DropdownContext)!;

  if (isOpen) {
    return (
      <div className={twMerge("z-50", props.className)} tabIndex={0}>
        {props.children}
      </div>
    );
  }
};

interface IDropdownOverlayProps {
  className?: string;
}

Dropdown.Overlay = (props: IDropdownOverlayProps) => {
  const { handleClose, isOpen } = useContext(DropdownContext)!;

  if (isOpen) {
    return <label onClick={handleClose} className={twMerge("fixed w-full h-full top-0 left-0", props.className)} />;
  }
};

export default Dropdown;
