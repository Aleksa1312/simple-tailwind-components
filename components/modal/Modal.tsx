import React, { createContext, useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IModalProps {
  children: React.ReactNode | React.ReactNode[];
}

interface IModalContext {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const ModalContext = createContext<IModalContext | null>(null);

const Modal = (props: IModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  const modalContextValue: IModalContext = {
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
    <ModalContext.Provider value={modalContextValue}>
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Modal.Trigger) {
            return child;
          }
          if (child.type === Modal.Content) {
            return child;
          }
          if (child.type === Modal.Overlay) {
            return child;
          }
        }
      })}
    </ModalContext.Provider>
  );
};

interface IModalTriggerProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

Modal.Trigger = (props: IModalTriggerProps) => {
  const { handleOpen } = useContext(ModalContext)!;

  return (
    <button onClick={handleOpen} className={props.className}>
      {props.children}
    </button>
  );
};

interface IModalContentProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

Modal.Content = (props: IModalContentProps) => {
  const { isOpen } = useContext(ModalContext)!;

  if (isOpen)
    return (
      <ol className="fixed top-0 bottom-0 left-0 right-0 m-auto p-5 z-50 h-fit w-fit">
        <ul className={props.className}>{props.children}</ul>
      </ol>
    );
};

interface IModalCloseProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

Modal.Close = (props: IModalCloseProps) => {
  const { handleClose } = useContext(ModalContext)!;

  return (
    <button onClick={handleClose} className={props.className}>
      {props.children}
    </button>
  );
};

interface IModalOverlayProps {
  className?: string;
}

Modal.Overlay = (props: IModalOverlayProps) => {
  const { isOpen, handleClose } = useContext(ModalContext)!;

  if (isOpen)
    return (
      <div
        onClick={handleClose}
        className={twMerge("fixed w-full h-full top-0 left-0 z-10", props.className)}
        tabIndex={0}
      />
    );
};

export default Modal;
