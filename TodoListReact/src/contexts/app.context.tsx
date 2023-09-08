import React, { createContext, useState } from 'react'

interface AppContextType {
  isCreated: boolean
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
  isEdited: boolean
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextType = {
  isCreated: false,
  setIsCreated: () => null,
  isEdited: false,
  setIsEdited: () => null
}

export const AppContext = createContext<AppContextType>(initialAppContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreated, setIsCreated] = useState<boolean>(initialAppContext.isCreated)
  const [isEdited, setIsEdited] = useState<boolean>(initialAppContext.isEdited)

  return (
    <AppContext.Provider value={{ isCreated, setIsCreated, isEdited, setIsEdited }}>{children}</AppContext.Provider>
  )
}

export default AppProvider
