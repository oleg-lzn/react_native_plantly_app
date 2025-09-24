import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { theme } from "@/theme";
import { PlantlyImage } from "@/components/PlantlyImage";
import { PlantlyButton } from "@/components/PlantlyButton";
import { useState } from "react";
import { usePlantStore } from "@/store/plantStore";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";

export default function NewScreen() {
  const [plant, setPlant] = useState({
    name: "",
    wateringFrequency: ""
  });

  const [imageUri, setImageUri] = useState<string>();

  const router = useRouter();

  const addNewPlant = usePlantStore((state) => state.addPlant);
  // const clearPlants = usePlantStore((state) => state.clearPlants);

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

    addNewPlant(plant, imageUri);
    Alert.alert(`${plant.name} added`);
    console.log(`Plant added ${plant.name}`);
    setPlant({
      name: "",
      wateringFrequency: ""
    });
    router.back();
  };

  const handleChooseImage = async () => {
    if (Platform.OS === "web") return;
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      return Alert.alert(
        "Permission denied",
        "Please grant permission to access the media library"
      );
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.centered}
        activeOpacity={0.8}
        onPress={handleChooseImage}
      >
        <PlantlyImage imageUri={imageUri} />
      </TouchableOpacity>
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
      {/* <PlantlyButton title="Clear Plants" onPress={clearPlants} /> */}
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
    alignItems: "center",
    marginBottom: 24
  },
  label: {
    fontSize: 18,
    marginBottom: 8
  }
});
