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
  isFavoriteLaunch: (launch) => {},
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

    favorites.launches[launch.flight_number] = launch

    setFavorites(favorites)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }

  const addFavoriteLaunchPad = () => {}

  const removeFavoriteLaunch = (launch) => {
    if (!launch.flight_number) return

    const favorites = getLocalFavorites()

    delete favorites.launches[launch.flight_number]

    setFavorites(favorites)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }
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

  const isFavoriteLaunch = (launch) => {
    return Boolean(favorites.launches[launch.flight_number])
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
        isFavoriteLaunch: isFavoriteLaunch,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
