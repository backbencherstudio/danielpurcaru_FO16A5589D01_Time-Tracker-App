import { createContext, useContext } from "react";

type EmpDataContextType = {
    fetchEmpData: () => void;
    handleEmpDataSaved: () => void;
    handleLoading: (st: boolean) => void;
};

export const EmpDataContext = createContext<EmpDataContextType>({
    fetchEmpData: () => { },
    handleEmpDataSaved: () => { },
    handleLoading: () => {}
});

export const useEmpData = () => useContext(EmpDataContext);