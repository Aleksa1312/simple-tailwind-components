import React, { createContext, useContext, useEffect, useState, FC } from "react";
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

interface IDropdownComponent extends FC<IDropdownProps> {
  Trigger: FC<IDropdownTriggerProps>;
  Content: FC<IDropdownContentProps>;
  Overlay: FC<IDropdownOverlayProps>;
}

const Dropdown: IDropdownComponent = (props) => {
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

    document.addEventListener("keydown", handleEscPress);

    return () => document.removeEventListener("keydown", handleEscPress);
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

const DropdownTrigger: FC<IDropdownTriggerProps> = (props) => {
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

const DropdownContent: FC<IDropdownContentProps> = (props) => {
  const { isOpen } = useContext(DropdownContext)!;

  if (isOpen) {
    return (
      <div className={twMerge("z-50", props.className)} tabIndex={0}>
        {props.children}
      </div>
    );
  } else {
    return null;
  }
};

interface IDropdownOverlayProps {
  className?: string;
}

const DropdownOverlay: FC<IDropdownOverlayProps> = (props) => {
  const { handleClose, isOpen } = useContext(DropdownContext)!;

  if (isOpen) {
    return <label onClick={handleClose} className={twMerge("fixed w-full h-full top-0 left-0", props.className)} />;
  } else {
    return null;
  }
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Overlay = DropdownOverlay;

export default Dropdown;
