import React, { useContext, useEffect, useState } from "react"

const defaultContext = {
  favorites: {
    launches: {},
    launchPads: {},
  },
  isOpen: false,
  addFavoriteLaunch: () => {},
  addFavoriteLaunchPad: () => {},
  removeFavoriteLaunch: () => {},
  removeFavoriteLaunchPad: () => {},
  toggleIsOpen: () => {},
}

export const FavoritesContext = React.createContext(defaultContext)

export const useFavoritesContext = () => useContext(FavoritesContext)

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState()
  const [open, setOpen] = useState()

  useEffect(() => {
    // Check localstorage
    // update state
  }, [])

  const addFavoriteLaunch = () => {}
  const addFavoriteLaunchPad = () => {}
  const removeFavoriteLaunch = () => {}
  const removeFavoriteLaunchPad = () => {}
  const toggleIsOpen = () => {}

  return (
    <FavoritesContext.Provider
      values={{
        favorites,
        open,
        addFavoriteLaunch,
        addFavoriteLaunchPad,
        removeFavoriteLaunch,
        removeFavoriteLaunchPad,
        toggleIsOpen,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
