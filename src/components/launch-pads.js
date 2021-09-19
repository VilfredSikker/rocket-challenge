import React from "react"
import { Badge, Box, Flex, SimpleGrid, Text } from "@chakra-ui/core"
import { Link } from "react-router-dom"

import Error from "./error"
import Breadcrumbs from "./breadcrumbs"
import LoadMoreButton from "./load-more-button"
import { useSpaceXPaginated } from "../utils/use-space-x"
import { useFavoritesContext } from "../context/favorites-context"
import { Star } from "react-feather"

const PAGE_SIZE = 12

export default function LaunchPads() {
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/launchpads",
    {
      limit: PAGE_SIZE,
    }
  )

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launchPad) => (
              <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  )
}

export function LaunchPadItem({ launchPad, sx }) {
  const { addFavoriteLaunchPad, removeFavoriteLaunchPad, isFavoriteLaunchPad } =
    useFavoritesContext()
  const isFavorite = isFavoriteLaunchPad(launchPad)

  return (
    <Box
      as={Link}
      to={`/launch-pads/${launchPad.site_id}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
      {...sx}
    >
      <Box p="6">
        <Flex justifyContent="space-between">
          <Box d="flex" alignItems="baseline">
            {launchPad.status === "active" ? (
              <Badge px="2" variant="solid" variantColor="green">
                Active
              </Badge>
            ) : (
              <Badge px="2" variant="solid" variantColor="red">
                Retired
              </Badge>
            )}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {launchPad.attempted_launches} attempted &bull;{" "}
              {launchPad.successful_launches} succeeded
            </Box>
          </Box>
          <Box
            onClick={(e) => {
              e.preventDefault()
              if (isFavorite) {
                removeFavoriteLaunchPad(launchPad)
              } else {
                addFavoriteLaunchPad(launchPad)
              }
            }}
          >
            <Star className="star" fill={isFavorite ? "gold" : "none"} />
          </Box>
        </Flex>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launchPad.name}
        </Box>
        <Text color="gray.500" fontSize="sm">
          {launchPad.vehicles_launched.join(", ")}
        </Text>
      </Box>
    </Box>
  )
}
