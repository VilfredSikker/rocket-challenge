import React, { useContext, useEffect, useState } from "react"

const defaultContext = {
  favorites: {
    launches: {},
    launchPads: {},
  },
  isOpen: false,
  addFavoriteLaunch: (launch) => {},
  addFavoriteLaunchPad: (launchPad) => {},
  removeFavoriteLaunch: (launchId) => {},
  removeFavoriteLaunchPad: (launchPadId) => {},
  toggleIsOpen: () => {},
}

const STORAGE_KEY = "favorites"
export const FavoritesContext = React.createContext(defaultContext)

export const useFavoritesContext = () => useContext(FavoritesContext)

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState()
  const [open, setOpen] = useState()

  useEffect(() => {
    // Check localstorage
    const favorites = getLocalFavorites()
    console.log("here: ", favorites)
    // update state
    setFavorites(favorites)
  }, [])

  const addFavoriteLaunch = (launch) => {
    const favorites = getLocalFavorites()
    const newFavorites = { ...favorites }

    newFavorites.launches[launch.flight_number] = launch

    setFavorites(newFavorites)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites))
  }

  const addFavoriteLaunchPad = () => {}
  const removeFavoriteLaunch = () => {}
  const removeFavoriteLaunchPad = () => {}

  const getLocalFavorites = () => {
    const favorites = localStorage.getItem(STORAGE_KEY)

    if (!favorites) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ launches: {}, launchPads: {} })
      )
    }

    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  }

  const toggleIsOpen = () => {
    setOpen((prev) => !prev)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites: favorites,
        open: open,
        addFavoriteLaunch: addFavoriteLaunch,
        addFavoriteLaunchPad: addFavoriteLaunchPad,
        removeFavoriteLaunch: removeFavoriteLaunch,
        removeFavoriteLaunchPad: removeFavoriteLaunchPad,
        toggleIsOpen: toggleIsOpen,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
