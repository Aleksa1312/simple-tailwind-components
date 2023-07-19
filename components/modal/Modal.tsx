import React, { createContext, useContext, useEffect, useState, FC } from "react";
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

interface IModalComponent extends FC<IModalProps> {
  Trigger: FC<IModalTriggerProps>;
  Content: FC<IModalContentProps>;
  Close: FC<IModalCloseProps>;
  Overlay: FC<IModalOverlayProps>;
}

const Modal: IModalComponent = (props) => {
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

    document.addEventListener("keydown", handleEscPress);

    return () => document.removeEventListener("keydown", handleEscPress);
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
          if (child.type === Modal.Close) {
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

const ModalTrigger: FC<IModalTriggerProps> = (props) => {
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

const ModalContent: FC<IModalContentProps> = (props) => {
  const { isOpen } = useContext(ModalContext)!;

  if (isOpen) {
    return (
      <ol className="fixed top-0 bottom-0 left-0 right-0 m-auto p-5 z-50 h-fit w-fit">
        <ul className={props.className}>{props.children}</ul>
      </ol>
    );
  } else {
    return null;
  }
};

interface IModalCloseProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

const ModalClose: FC<IModalCloseProps> = (props) => {
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

const ModalOverlay: FC<IModalOverlayProps> = (props) => {
  const { isOpen, handleClose } = useContext(ModalContext)!;

  if (isOpen) {
    return (
      <div
        onClick={handleClose}
        className={twMerge("fixed w-full h-full top-0 left-0 z-10", props.className)}
        tabIndex={0}
      />
    );
  } else {
    return null;
  }
};

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Close = ModalClose;
Modal.Overlay = ModalOverlay;

export default Modal;
