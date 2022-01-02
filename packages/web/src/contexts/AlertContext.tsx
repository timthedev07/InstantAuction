import React, { useContext, useEffect, useState } from "react";
import { Alert, AlertType } from "../components/Alert";
import { CannotReachServer } from "../components/BottomAlert";

type AlertTriggerFunctionType = (
  text: string,
  alertType?: AlertType,
  onCloseHandler?: () => void
) => void;

interface AlertContextType {
  triggerAlert: AlertTriggerFunctionType;
  triggerServerLostError: () => void;
}

export const AlertContext = React.createContext<AlertContextType>({
  triggerAlert: () => {},
  triggerServerLostError: () => {}
});

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertType>("warning");
  const [onClose, setOnClose] = useState<() => void>(() => {});
  const [serverErrorOpen, setServerErrorOpen] = useState<boolean>(false);

  const triggerAlert: AlertTriggerFunctionType = (
    text,
    alertType = "warning",
    onCloseHandler = () => {}
  ) => {
    setAlertText(text);
    setAlertType(alertType);
    setOnClose(onCloseHandler);
    setOpen(true);
  };

  const triggerServerLostError = () => {
    setServerErrorOpen(true);
  };

  const value: AlertContextType = {
    triggerAlert,
    triggerServerLostError
  };

  useEffect(() => {
    if (serverErrorOpen) {
      setTimeout(() => {
        setServerErrorOpen(false);
      }, 5000);
    }
  }, [serverErrorOpen]);

  return (
    <AlertContext.Provider value={value}>
      <Alert
        open={open}
        setOpen={setOpen}
        text={alertText}
        type={alertType}
        onClose={onClose}
      />
      {children}
      <CannotReachServer open={serverErrorOpen} />
    </AlertContext.Provider>
  );
};
