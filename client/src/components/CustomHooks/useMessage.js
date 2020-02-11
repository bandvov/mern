import { useCallback } from "react";

const useMessage = () => {
  return useCallback(message => {
    if (window.M && message) {
      window.M.toast({html:message})
    }
  }, []);
};
export default useMessage;
