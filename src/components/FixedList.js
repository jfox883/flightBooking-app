import React from 'react'
import { Box, FlatList, Text, Spinner, VStack, Pressable } from 'native-base'

const FixedList = ({places, onItemPress}) => {

  const renderList = (place) => {
    return (
        <Pressable onPress={() => onItemPress(place.item)}>
          <Box px={2} my={2}>
            <Text>{place.item.PlaceName}, {place.item.CountryName}</Text>
          </Box>
        </Pressable>
    )
  }

  if(!places) return <Spinner />

  return (
    <Box position='absolute' height={250} top={78} width='100%' zIndex={1} bg='white'>
      <FlatList
        data={places}
        keyExtractor={item => item.PlaceId}
        renderItem={item => renderList(item)}
      />
    </Box>
  )
}

export default FixedList
