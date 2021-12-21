import React, { useContext, useState } from "react";
import { Alert, AlertType } from "../components/Alert";

type AlertTriggerFunctionType = (
  alertType: AlertType,
  text: string,
  onCloseHandler?: () => void
) => void;

interface AlertContextType {
  triggerAlert: AlertTriggerFunctionType;
}

export const AlertContext = React.createContext<AlertContextType>({
  triggerAlert: () => {}
});

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertType>("info");
  const [onClose, setOnClose] = useState<() => void>(() => {});

  const triggerAlert: AlertTriggerFunctionType = (
    alertType,
    text,
    onCloseHandler = () => {}
  ) => {
    setAlertText(text);
    setAlertType(alertType);
    setOnClose(onCloseHandler);
    setOpen(true);
  };

  const value: AlertContextType = {
    triggerAlert
  };

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
    </AlertContext.Provider>
  );
};
