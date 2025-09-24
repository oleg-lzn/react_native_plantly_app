import { theme } from "@/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable style={styles.plusButton} hitSlop={20}>
                <AntDesign
                  name="plus-circle"
                  size={24}
                  color={theme.colorGreen}
                />
              </Pressable>
            </Link>
          )
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    color: theme.colorGreen
  }
});
