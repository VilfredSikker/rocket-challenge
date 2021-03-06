import React, { useState } from "react"
import {
  Badge,
  Box,
  Image,
  SimpleGrid,
  Text,
  Flex,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/core"
import { format as timeAgo } from "timeago.js"
import { Link } from "react-router-dom"
import { useSpaceXPaginated } from "../utils/use-space-x"
import { formatDate } from "../utils/format-date"
import Error from "./error"
import Breadcrumbs from "./breadcrumbs"
import LoadMoreButton from "./load-more-button"
import { FavoriteLaunchStar } from "./favorite-star"
import { useFavoritesContext } from "../context/favorites-context"

const PAGE_SIZE = 12

export default function Launches() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  )
  const [filterFavorites, setFilterFavorites] = useState(false)

  const { isFavoriteLaunch } = useFavoritesContext()

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />
      <FormControl display="flex" alignItems="center" m={[2, null, 6]}>
        <FormLabel htmlFor="filter-favorites" mb="0">
          Only show favorites
        </FormLabel>
        <Switch
          id="filter-favorites"
          onChange={() => setFilterFavorites((prev) => !prev)}
        />
      </FormControl>

      <SimpleGrid
        m={[2, null, 6]}
        minChildWidth="350px"
        spacing="4"
        data-cy="launch-items"
      >
        {error && <Error />}
        {data &&
          data
            .flat()
            .filter((launch) => {
              if (filterFavorites) {
                return isFavoriteLaunch(launch)
              }
              return true
            })
            .map((launch) => (
              <LaunchItem launch={launch} key={launch.flight_number} />
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

export function LaunchItem({ launch, sx }) {
  return (
    <Box
      as={Link}
      to={`/launches/${launch.flight_number.toString()}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
      data-cy="launch-item"
      {...sx}
    >
      <Image
        src={
          launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          launch.links.mission_patch_small
        }
        alt={`${launch.mission_name} launch`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Box p="6">
        <Flex justifyContent="space-between" flex="1">
          <Box d="flex" alignItems="baseline">
            {launch.launch_success ? (
              <Badge px="2" variant="solid" variantColor="green">
                Successful
              </Badge>
            ) : (
              <Badge px="2" variant="solid" variantColor="red">
                Failed
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
              {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
            </Box>
          </Box>
          <FavoriteLaunchStar launch={launch} data-cy="launch-star" />
        </Flex>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launch.mission_name}
        </Box>
        <Flex>
          <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
          <Text color="gray.500" ml="2" fontSize="sm">
            {timeAgo(launch.launch_date_utc)}
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}
