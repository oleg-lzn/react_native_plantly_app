import { View, StyleSheet } from "react-native";
import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import { PlantlyButton } from "@/components/PlantlyButton";

export default function Profile() {
  const toggleHasOnboarded = useUserStore((state) => state.toggleHadOnboarded);
  return (
    <View style={styles.container}>
      <PlantlyButton
        title="Back to Onboarding"
        onPress={() => toggleHasOnboarded()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite
  }
});
