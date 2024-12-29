import { ReactNode, useState } from "react";
import dayjs from "dayjs";

import GlobalContext from "./GlobalContext"

interface ContextWrapperProps {
  children: ReactNode
}

const ContextWrapper = ({ children }: ContextWrapperProps) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());

  return (
    <GlobalContext.Provider value={{ monthIndex, setMonthIndex }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default ContextWrapper