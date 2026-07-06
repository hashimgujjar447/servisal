import CategoryCard from "@/components/CategoryCard";
import Input from "@/components/Input";
import ScreenContainer from "@/components/ScreenContainer";
import { Colors } from "@/constants/colors";
import { categories, services } from "@/data/data";
import { Category } from "@/types/categories";
import { EvilIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import userImage from "../../assets/images/user.png";

import ServiceCard from "@/components/ServiceCard";
import { Service } from "@/types/service";
export default function HomeScreen() {
  const [allCategories, setAllCategories] = useState<Category[]>(categories);
  const [allServices, setAllServices] = useState<Service[]>(services);
  const [selectedCategory, setSelectedCategory] = useState("1");

  console.log(categories);
  const [search, setSearch] = useState("");
  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.homeTopBarContainer}>
          <View style={styles.homeTopBarLeftContainer}>
            <View style={styles.homeTopBarLocationIconContainer}>
              <Entypo name="location-pin" size={27} color={Colors.primary} />
            </View>
            <View>
              <Text
                style={{ color: Colors.black, fontSize: 15, fontWeight: "500" }}
              >
                My Location
              </Text>

              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                Faisalabad, Pakistan
              </Text>
            </View>
          </View>
          <View>
            <Image style={styles.homeTopBarImage} source={userImage} />
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Input
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            leftIcon={<EvilIcons name="search" size={24} color="black" />}
            style={{
              borderColor: Colors.placeholder,
              backgroundColor: "white",
            }}
          />
        </View>
        <View style={styles.categoriesContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              All Categories
            </Text>
            <Text style={{ color: Colors.primary, fontSize: 12 }}>See all</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: 16,
            }}
          >
            {allCategories.map((category) => (
              <CategoryCard
                category={category}
                selectedCategory={selectedCategory}
              />
            ))}
          </View>
        </View>
        <View>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              Recommended for you
            </Text>
            <Text style={{ color: Colors.primary, fontSize: 12 }}>See all</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 20,
              gap: 15, // React Native 0.71+ mein support hai
            }}
          >
            <FlatList
              horizontal
              data={allServices}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
              renderItem={({ item }) => (
                <ServiceCard item={item} onPress={() => {}} />
              )}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  homeTopBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeTopBarLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  homeTopBarLocationIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
  },
  homeTopBarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: "contain",
  },
  categoriesContainer: {
    marginTop: 20,
  },
});
