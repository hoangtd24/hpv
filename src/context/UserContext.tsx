import { ReactNode, createContext, useContext, useState } from "react";

interface SurveyContext {
  showSurvey: boolean;
  setShowSurvey: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MySurveyContext = createContext<SurveyContext>({
  showSurvey: false,
  setShowSurvey: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useShowSurvey = () => useContext(MySurveyContext);

const SurveyContextProvider = ({ children }: { children: ReactNode }) => {
  const [showSurvey, setShowSurvey] = useState<boolean>(false);

  const authData = {
    showSurvey,
    setShowSurvey,
  };
  return (
    <MySurveyContext.Provider value={authData}>
      {children}
    </MySurveyContext.Provider>
  );
};

export default SurveyContextProvider;
