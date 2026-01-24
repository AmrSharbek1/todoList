import { useContext } from "react";
import { ToastContext } from "./toastContext";

export const useToast = () => {
  return useContext(ToastContext);
};
