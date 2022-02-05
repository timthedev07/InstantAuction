import { FC, useEffect } from "react";
import { DangerIcon } from "../icons/alert/DangerIcon";
import SuccessIcon from "../icons/alert/SuccessIcon";
import WarningIcon from "../icons/alert/WarningIcon";
import { InfoIcon } from "../icons/InfoIcon";

export type AlertType = "warning" | "success" | "info" | "danger";

interface AlertProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  text: string;
  type: AlertType;
  onClose?: () => void;
}

const ICON_MAP = {
  danger: DangerIcon,
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon
};

const TEXT_MAP: Record<AlertType, string> = {
  success: "Awesome, everything worked just fine!",
  warning: "Oops, something went wrong.",
  info: "For your information",
  danger: "Watch out!"
};

export const Alert: FC<AlertProps> = ({
  onClose,
  setOpen: setActive,
  type,
  text,
  open: active
}) => {
  let element: Element | null;

  function handleClick() {
    element = document.querySelector("div#screen-overlay");
    if (!element) return;

    if (element.classList.contains("active")) {
      element.classList.remove("active");
      element.classList.add("inactive");
    }

    setActive(false);

    if (onClose) {
      onClose();
    }
  }

  useEffect(() => {
    element = document.querySelector("div#screen-overlay");
    if (!element) return;
    if (active) {
      if (!element.classList.contains("active")) {
        element.classList.add("active");
        element.classList.add("in-active");
      }
    }
  }, [active]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClick();
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const Icon = ICON_MAP[type];

  return (
    <div
      className={`custom-alert custom-alert ${
        active ? "alert-active" : "alert-inactive"
      }`}
      onClick={handleClick}
    >
      <div className="alert-content">
        <Icon className="alert-sign" />
        <div className="alert-text">
          <h5>{TEXT_MAP[type]}</h5>
          <p className="alert-paragraph">{text}</p>
        </div>
      </div>
      <pre className="text-right mt-auto mb-0">ESC</pre>
    </div>
  );
};
