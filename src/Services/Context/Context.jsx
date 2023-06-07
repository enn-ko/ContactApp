import { createContext, useMemo, useState } from "react";
import { getContactById } from "../Apis/FireStoreApi";

export const StateContext = createContext()

const StateContextProvider = ({children}) => {
  const [isToggledVisible, setIsToggledVisible] = useState(false);
  const [menuActive, setMenuActive] = useState(false)
    
 
    const data = {menuActive, setMenuActive,isToggledVisible,setIsToggledVisible}

    return (
        <StateContext.Provider value={data}>

            {children}

        </StateContext.Provider>
    )

}

export default StateContextProvider