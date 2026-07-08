import { categories } from "@/data/data";
import { Category } from "@/types/categories";
import React, { createContext, useContext, useState } from "react";

type CategoryContextType = {
  allCategories: Category[];
  setAllCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allCategories, setAllCategories] = useState<Category[]>(categories);

  return (
    <CategoryContext.Provider
      value={{
        allCategories,
        setAllCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used inside CategoryProvider");
  }

  return context;
};
