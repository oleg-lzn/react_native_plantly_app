import { StyleSheet, FlatList, Text } from "react-native";
import { theme } from "@/theme";
import { usePlantStore } from "@/store/plantStore";
import { PlantCard } from "@/components/PlantCard";
import { PlantlyButton } from "@/components/PlantlyButton";
import { useRouter } from "expo-router";

export default function App() {
  const plants = usePlantStore((state) => state.plants);
  const router = useRouter();
  console.log(plants);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={
        plants.length === 0 ? styles.contentContainer : styles.emptyContainer
      }
      data={plants}
      ListEmptyComponent={
        <PlantlyButton
          title="Add your first plant"
          onPress={() => router.navigate("/new")}
        />
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlantCard plant={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: theme.colorWhite
  },
  contentContainer: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center"
  }
});
