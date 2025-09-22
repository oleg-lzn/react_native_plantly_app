import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { theme } from "@/theme";
import { PlantlyImage } from "@/components/PlantlyImage";
import { PlantlyButton } from "@/components/PlantlyButton";
import { useState } from "react";
import { usePlantStore, Plant } from "@/store/userStore";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function NewScreen() {
  const [plant, setPlant] = useState<Plant>({
    name: "",
    wateringFrequency: ""
  });

  const router = useRouter();

  const addNewPlant = usePlantStore((state) => state.addPlant);
  const handleSubmitPlant = () => {
    if (!plant.name) {
      return Alert.alert("Validation Error", "Give your plant a name");
    }

    if (!plant.wateringFrequency) {
      return Alert.alert(
        "Validation Error",
        `How often does ${plant.name} need to be watered?`
      );
    }

    if (Number.isNaN(Number(plant.wateringFrequency))) {
      return Alert.alert(
        "Validation Error",
        "Watering frequency must be a be a number"
      );
    }

    addNewPlant(plant);
    Alert.alert(`${plant.name} added`);
    console.log(`Plant added ${plant.name}`);
    setPlant({ name: "", wateringFrequency: "" });
    router.back();
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.centered}>
        <PlantlyImage />
      </View>
      <Text style={styles.label}> Name</Text>
      <TextInput
        style={styles.input}
        value={plant.name}
        onChangeText={(text) => setPlant({ ...plant, name: text })}
        placeholder="Add a plant"
        autoCapitalize="words"
      />
      <Text style={styles.label}>Watering Frequency (every x days)</Text>
      <TextInput
        style={styles.input}
        value={plant.wateringFrequency}
        onChangeText={(text) => setPlant({ ...plant, wateringFrequency: text })}
        placeholder="E.g. Every 5 days"
        keyboardType="number-pad"
      />
      <PlantlyButton title="Add Plant" onPress={handleSubmitPlant} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colorLightGray,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18
  },
  centered: {
    alignItems: "center"
  },
  label: {
    fontSize: 18,
    marginBottom: 8
  }
});
