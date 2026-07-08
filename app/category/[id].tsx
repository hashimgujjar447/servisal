import CategoryDetailCard from "@/components/CategoryDetailCard";
import Input from "@/components/Input";
import ModalHeader from "@/components/ModalHeader";
import { Colors } from "@/constants/colors";
import { useCategory } from "@/context/CategoriesContext";
import { services } from "@/data/data";
import { Category } from "@/types/categories";
import { Service } from "@/types/service";
import { EvilIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const CategoryDetail = () => {
  const [allServices, setAllServices] = useState<Service[]>(services);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [filteredServices, setFilteredServices] = useState<Service[] | null>(
    null,
  );
  const [searchValue, setSearchValue] = useState("");
  const { allCategories } = useCategory();
  const router = useRouter();

  const { id } = useLocalSearchParams();

  useEffect(() => {
    const ct = allCategories.filter((category) => category.id == id)[0];
    setSelectedCategory(ct);

    const allMatchServices = allServices.filter(
      (service: Service) => service.categoryId === id,
    );
    setFilteredServices(allMatchServices);
  }, [id]);

  return (
    <View>
      <ModalHeader text={selectedCategory?.title ?? ""} />
      <View style={styles.container}>
        <Input
          placeholder="Search Service"
          value={searchValue}
          onChangeText={setSearchValue}
          leftIcon={<EvilIcons name="search" size={24} color="black" />}
          style={{ borderColor: Colors.placeholder, marginBottom: 20 }}
        />

        <View style={styles.cardsContainer}>
          {filteredServices?.map((service) => (
            <CategoryDetailCard
              key={service.id}
              onPress={() =>
                router.push({
                  pathname: "/(modals)/serviceDetailModal",
                  params: { id: service.id },
                })
              }
              item={service}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CategoryDetail;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
