import React from "react"
import { Box } from "@chakra-ui/core"
import { Star } from "react-feather"
import { useFavoritesContext } from "../context/favorites-context"

export const FavoriteLaunchStar = ({ launch }) => {
  const { isFavoriteLaunch, addFavoriteLaunch, removeFavoriteLaunch } =
    useFavoritesContext()
  const isFavorite = isFavoriteLaunch(launch)

  return (
    <FavoriteStar
      isFavorite={isFavorite}
      onClick={(e) => {
        e.preventDefault()
        if (isFavorite) {
          removeFavoriteLaunch(launch)
        } else {
          addFavoriteLaunch(launch)
        }
      }}
    />
  )
}

export const FavoriteLaunchPadStar = ({ launchPad }) => {
  const { isFavoriteLaunchPad, addFavoriteLaunchPad, removeFavoriteLaunchPad } =
    useFavoritesContext()
  const isFavorite = isFavoriteLaunchPad(launchPad)

  return (
    <FavoriteStar
      isFavorite={isFavorite}
      onClick={(e) => {
        e.preventDefault()
        if (isFavorite) {
          removeFavoriteLaunchPad(launchPad)
        } else {
          addFavoriteLaunchPad(launchPad)
        }
      }}
    />
  )
}

const FavoriteStar = ({ isFavorite, onClick }) => {
  return (
    <Box as="button" onClick={onClick}>
      <Star className="star" fill={isFavorite ? "gold" : "none"} />
    </Box>
  )
}
