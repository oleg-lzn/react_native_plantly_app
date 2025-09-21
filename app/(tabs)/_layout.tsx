import { Link, Redirect, Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, StyleSheet } from "react-native";

export default function RootLayout() {
  const hasFinishedOnboarding = useUserStore(
    (state) => state.hasFinishedOnboarding
  );

  if (!hasFinishedOnboarding) {
    return <Redirect href="/onboarding" />;
  }
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorGreen }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="leaf" color={color} size={size} />
          ),
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable style={styles.plusButton} hitSlop={20}>
                <AntDesign name="plus-circle" size={24} color="black" />
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    marginRight: 18,
    color: theme.colorGreen
  }
});
