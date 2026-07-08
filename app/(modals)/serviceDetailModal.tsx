import Button from "@/components/Button";
import { Colors } from "@/constants/colors";
import { providers, reviews, services } from "@/data/data";
import { Provider } from "@/types/provider";
import { Review } from "@/types/review";
import { Service } from "@/types/service";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => {
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <AntDesign
          key={star}
          name={star <= Math.floor(rating) ? "star" : "staro"}
          size={size}
          color="#FFC107"
        />
      ))}
    </View>
  );
};

const ServiceDetailModal = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [service, setService] = useState<Service | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [serviceReviews, setServiceReviews] = useState<Review[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const found = services.find((s) => s.id === id) ?? null;
    setService(found);

    if (found) {
      const prov = providers.find((p) => p.id === found.providerId) ?? null;
      setProvider(prov);

      const revs = reviews.filter((r) => r.providerId === found.providerId);
      setServiceReviews(revs);
    }
  }, [id]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slide !== activeIndex) setActiveIndex(slide);
  };

  if (!service) return null;

  const carouselImages = [service.image, service.image, service.image];

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={carouselImages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            onScroll={onScroll}
            renderItem={({ item }) => (
              <Image source={item} style={styles.carouselImage} />
            )}
          />

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Entypo name="chevron-left" size={22} color={Colors.white} />
          </TouchableOpacity>

          {/* Chat Button */}
          <TouchableOpacity style={styles.chatButton} activeOpacity={0.8}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {carouselImages.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Title & Rating */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{service.title}</Text>
          </View>

          <View style={styles.ratingRow}>
            <StarRating rating={service.rating} size={16} />
            <Text style={styles.ratingText}>
              ({service.reviewCount} Reviews)
            </Text>
          </View>

          {/* Price */}
          <Text style={styles.price}>${service.price}/hr</Text>

          {/* Description */}
          <Text style={styles.sectionTitle}>Descriptions</Text>
          <Text style={styles.descriptionText}>{service.description}</Text>

          {/* About Provider */}
          <Text style={styles.sectionTitle}>About Service Provider</Text>
          {provider && (
            <View style={styles.providerCard}>
              <Image source={provider.image} style={styles.providerImage} />
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerRole}>Service Provider</Text>
              </View>
              <View style={styles.providerStats}>
                <View style={styles.statItem}>
                  <MaterialIcons name="work" size={14} color={Colors.primary} />
                  <Text style={styles.statText}>{provider.completedJobs}+ Jobs</Text>
                </View>
                <View style={styles.statItem}>
                  <AntDesign name="clockcircle" size={12} color={Colors.primary} />
                  <Text style={styles.statText}>{provider.experience}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Reviews */}
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {serviceReviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={review.userImage} style={styles.reviewerImage} />
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>{review.userName}</Text>
                  <Text style={styles.reviewText} numberOfLines={2}>
                    {review.review}
                  </Text>
                </View>
              </View>
              <StarRating rating={review.rating} size={14} />
            </View>
          ))}

          {/* Spacer for bottom button */}
          <View style={{ height: 90 }} />
        </View>
      </ScrollView>

      {/* Book Button */}
      <View style={styles.bookButtonContainer}>
        <Button
          onPress={() => {}}
          textColor={Colors.white}
          style={styles.bookButton}
        >
          Book a Service
        </Button>
      </View>
    </View>
  );
};

export default ServiceDetailModal;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Carousel
  carouselContainer: {
    position: "relative",
  },
  carouselImage: {
    width: width,
    height: 260,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: Colors.headerBackground,
    borderRadius: 12,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  chatButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#D6D6D6",
  },
  activeDot: {
    width: 22,
    backgroundColor: Colors.primary,
  },

  // Content
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.heading,
    flex: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  ratingText: {
    fontSize: 13,
    color: Colors.placeholder,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.heading,
    marginTop: 12,
  },

  // Sections
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.heading,
    marginTop: 22,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },

  // Provider
  providerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFB",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    gap: 12,
  },
  providerImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    resizeMode: "cover",
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.heading,
  },
  providerRole: {
    fontSize: 12,
    color: Colors.placeholder,
    marginTop: 2,
  },
  providerStats: {
    gap: 6,
    alignItems: "flex-end",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: Colors.text,
    fontWeight: "500",
  },

  // Reviews
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAll: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 22,
  },
  reviewCard: {
    backgroundColor: "#FAFAFB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    gap: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  reviewerImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    resizeMode: "cover",
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.heading,
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 19,
  },

  // Book Button
  bookButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  bookButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    height: 54,
  },
});
