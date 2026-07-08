import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";

import { serviceImages } from "@/data/serviceImages";

const { width } = Dimensions.get("window");

const ServiceCarousel = () => {
  const flatListRef = useRef<FlatList>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);

    if (slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={serviceImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={onScroll}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
      />

      <View style={styles.pagination}>
        {serviceImages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default ServiceCarousel;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 240,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#D6D6D6",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 22,
    backgroundColor: "#1976F3",
  },
});
