import React from "react"
import { Switch, Route } from "react-router-dom"
import { Flex, Text } from "@chakra-ui/core"

import Launches from "./launches"
import Launch from "./launch"
import Home from "./home"
import LaunchPads from "./launch-pads"
import LaunchPad from "./launch-pad"
import { FavoritesDrawer } from "./favorites-drawer"
import { useFavoritesContext } from "../context/favorites-context"

export default function App() {
  return (
    <div>
      <NavBar />
      <FavoritesDrawer />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/launches/:launchId">
          <Launch />
        </Route>
        <Route path="/launches">
          <Launches />
        </Route>

        <Route path="/launch-pads/:launchPadId">
          <LaunchPad />
        </Route>
        <Route path="/launch-pads">
          <LaunchPads />
        </Route>
      </Switch>
    </div>
  )
}

function NavBar() {
  const { toggleIsOpen } = useFavoritesContext()
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      position="sticky"
      top="0"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      zIndex="sticky"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
        onClick={toggleIsOpen}
        cursor="pointer"
      >
        Favorites
      </Text>
    </Flex>
  )
}
