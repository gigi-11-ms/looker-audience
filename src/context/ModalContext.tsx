import { Dialog } from "@looker/components";
import React, {
  createContext,
  FC,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
  PropsWithChildren,
} from "react";

export enum MODAL_CONTEXT_ACTIONS_ENUM {
  OPEN = "open",
  CLOSE = "close",
}

type ModalType = {
  open: boolean;
  content: ReactNode | null;
  onClose?: () => void;
};

export type ModalContextActionType = {
  type: MODAL_CONTEXT_ACTIONS_ENUM;
  payload?: { content: ReactNode | null; onClose?: () => void };
};

type ModalContextType = {
  modal: ModalType;
  dispatch: Dispatch<ModalContextActionType>;
};

export const openModal = (
  dispatch: Dispatch<ModalContextActionType>,
  content: React.ReactNode,
  onClose?: () => void
) => {
  dispatch({
    type: MODAL_CONTEXT_ACTIONS_ENUM.OPEN,
    payload: { content, onClose },
  });
};

export const closeModal = (dispatch: Dispatch<ModalContextActionType>) => {
  dispatch({ type: MODAL_CONTEXT_ACTIONS_ENUM.CLOSE });
};

const ModalContext = createContext<null | ModalContextType>(null);

const modalReducer = (state: ModalType, action: ModalContextActionType) => {
  const { payload: { content, onClose } = {}, type } = action;
  switch (type) {
    case MODAL_CONTEXT_ACTIONS_ENUM.OPEN:
      return {
        open: true,
        content,
        onClose,
      };
    case MODAL_CONTEXT_ACTIONS_ENUM.CLOSE:
      return {
        open: false,
        content: null,
      };
    default:
      return state;
  }
};

const ModalContextProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [modal, dispatch] = useReducer(modalReducer, {
    open: false,
    content: null,
  });

  const values = {
    modal,
    dispatch,
  };

  const { open, content, onClose } = modal;
  return (
    <ModalContext.Provider value={values}>
      {children}
      <Dialog
        width={"70vw"}
        isOpen={open}
        content={content}
        onClose={() => {
          onClose?.();
          closeModal(dispatch);
        }}
      />
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal context provider is not defined");
  return ctx;
};

export default ModalContextProvider;
