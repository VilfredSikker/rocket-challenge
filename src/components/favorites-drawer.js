import {
  Box,
  Flex,
  Stack,
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
      position="fixed"
      right="0"
      top="0"
      bottom="0"
      bg="white"
      p="6"
      zIndex="modal"
      minWidth={["100%", "40%"]}
      height="100%"
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
        <Box overflow="scroll" maxHeight="90vh">
          <Tabs variant="enclosed">
            <TabList position="sticky">
              <Tab>Launches</Tab>
              <Tab>Launch Pads</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack direction="column" spacing="3">
                  {Object.entries(favorites?.launches)?.map(([key, value]) => (
                    <Box mb="2" borderBottom="1px solid black">
                      <LaunchItem
                        key={`launch-item-${key}`}
                        launch={value}
                        sx={{
                          borderWidth: "0px",
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </TabPanel>
              <TabPanel>
                {Object.entries(favorites?.launchPads)?.map(([key, value]) => (
                  <Box mb="2" borderBottom="1px solid black">
                    <LaunchPadItem
                      key={`launch-pad-${key}`}
                      launchPad={value}
                      sx={{
                        borderWidth: "0px",
                      }}
                    />
                  </Box>
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </Box>
  )
}
