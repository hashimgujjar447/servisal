import { CategoryProvider } from "@/context/CategoriesContext";
import { AuthProvider } from "@/context/RegisterContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <StatusBar style="dark" />

        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />

          <Stack.Screen name="welcome" />

          <Stack.Screen name="(auth)" />

          <Stack.Screen name="(tabs)" />

          <Stack.Screen
            name="(modals)/locationModal"
            options={{
              presentation: "modal",
            }}
          />

          <Stack.Screen
            name="(modals)/policyModal"
            options={{
              presentation: "modal",
            }}
          />

          <Stack.Screen
            name="(modals)/categoriesModal"
            options={{
              presentation: "modal",
            }}
          />

          <Stack.Screen
            name="(modals)/serviceDetailModal"
            options={{
              presentation: "card",
              animation: "slide_from_right",
            }}
          />

          <Stack.Screen
            name="(modals)/addCategoryModal"
            options={{
              presentation: "card",
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </CategoryProvider>
    </AuthProvider>
  );
}
