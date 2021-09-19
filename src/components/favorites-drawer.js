import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/core"
import React from "react"
import { X } from "react-feather"
import { useFavoritesContext } from "../context/favorites-context"
import LaunchPad from "./launch-pad"
import { LaunchPadItem } from "./launch-pads"
import { LaunchItem } from "./launches"

export const FavoritesDrawer = () => {
  const { favorites, isOpen, toggleIsOpen } = useFavoritesContext()

  console.log(isOpen)

  return (
    <Box
      position="absolute"
      right="0"
      top="0"
      bottom="0"
      bg="white"
      p="6"
      zIndex="modal"
      maxWidth="50%"
      minWidth="40%"
      height="100vh"
      borderLeft="1px solid black"
      overflow="hidden"
      display={isOpen ? "block" : "none"}
    >
      <Flex justifyContent="space-between" alignItems="center" mb="2">
        <Text fontSize="2xl">Favorites</Text>
        <X onClick={toggleIsOpen} cursor="pointer" />
      </Flex>
      {!favorites ? (
        <Text>No Favorites</Text>
      ) : (
        <Box overflow="scroll" maxHeight="100%">
          <Tabs>
            <TabList position="sticky">
              <Tab>Launches</Tab>
              <Tab>Launch Pads</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {Object.entries(favorites?.launches)?.map(([key, value]) => (
                  <LaunchItem launch={value} />
                ))}
              </TabPanel>
              <TabPanel>
                {Object.entries(favorites?.launchPads)?.map(([key, value]) => (
                  <LaunchPadItem launchPad={value} />
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </Box>
  )
}
