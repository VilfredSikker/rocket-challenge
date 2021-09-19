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
  isFavoriteLaunchPad: (launchPad) => {},
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
    // update state
    setFavorites(favorites)
  }, [])

  const updateFavorites = (favorites) => {
    setFavorites(favorites)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }

  const addFavoriteLaunch = (launch) => {
    if (!launch.flight_number) return

    const newFavorites = { ...favorites }

    favorites.launches[launch.flight_number] = launch

    updateFavorites(newFavorites)
  }

  const addFavoriteLaunchPad = (launchPad) => {
    if (!launchPad.id) return

    const newFavorites = { ...favorites }

    newFavorites.launchPads[launchPad.id] = launchPad

    updateFavorites(newFavorites)
  }

  const removeFavoriteLaunch = (launch) => {
    if (!launch.flight_number) return

    const newFavorites = { ...favorites }

    delete newFavorites.launches[launch.flight_number]

    updateFavorites(newFavorites)
  }

  const removeFavoriteLaunchPad = (launchPad) => {
    if (!launchPad.id) return

    const newFavorites = { ...favorites }

    delete newFavorites.launchPads[launchPad.id]

    updateFavorites(newFavorites)
  }

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

  const isFavoriteLaunchPad = (launchPad) => {
    return Boolean(favorites.launchPads[launchPad.id])
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
        isFavoriteLaunchPad: isFavoriteLaunchPad,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
