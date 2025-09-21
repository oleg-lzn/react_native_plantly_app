import { StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "@/theme";
import { PlantlyImage } from "@/components/PlantlyImage";
import { PlantlyButton } from "@/components/PlantlyButton";
import { useState } from "react";
import { Plant } from "@/store/userStore";
import { usePlantStore } from "@/store/userStore";

export default function NewScreen() {
  const [plant, setPlant] = useState<Plant>({
    name: "",
    wateringFrequency: ""
  });

  const addNewPlant = usePlantStore((state) => state.addPlant);
  const handleNewPlant = () => {
    addNewPlant(plant);
    console.log(`Plant added ${plant.name}`);
    setPlant({ name: "", wateringFrequency: "" });
  };

  return (
    <View style={styles.container}>
      <PlantlyImage />
      <View style={styles.form}>
        <Text style={styles.label}> Name</Text>
        <TextInput
          style={styles.input}
          value={plant.name}
          onChangeText={(text) => setPlant({ ...plant, name: text })}
          placeholder="Add a plant"
        />
        <Text style={styles.label}>Watering Frequency (every x days)</Text>
        <TextInput
          style={styles.input}
          value={plant.wateringFrequency}
          onChangeText={(text) =>
            setPlant({ ...plant, wateringFrequency: text })
          }
          placeholder="E.g. Every 2 weeks"
          keyboardType=""""
        />
      </View>
      <PlantlyButton title="Add Plant" onPress={handleNewPlant} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 6,
    height: 50
  },
  form: {
    padding: 20,
    width: "100%",
    gap: 10
  },
  label: {
    fontSize: 20
  }
});
