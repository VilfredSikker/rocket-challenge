import React from "react"
import { Box } from "@chakra-ui/core"
import { Star } from "react-feather"
import { useFavoritesContext } from "../context/favorites-context"

export const FavoriteLaunchStar = ({ launch, ...rest }) => {
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
      {...rest}
    />
  )
}

export const FavoriteLaunchPadStar = ({ launchPad, ...rest }) => {
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
      {...rest}
    />
  )
}

const FavoriteStar = ({ isFavorite, onClick, ...rest }) => {
  return (
    <Box as="button" onClick={onClick} data-cy="launch-star" {...rest}>
      <Star className="star" fill={isFavorite ? "gold" : "none"} />
    </Box>
  )
}
