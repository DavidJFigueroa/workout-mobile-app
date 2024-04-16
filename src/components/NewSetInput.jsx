import {useState} from "react";
import {View, Text, StyleSheet, TextInput, Button} from "react-native";

const NewSetInput = () => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const addSet = () => {
    console.warn("Add set:", reps, weight);
    setReps("");
    setWeight("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={reps}
        onChangeText={setReps}
        style={styles.input}
        placeholder="Reps"
        keyboardType="numeric"></TextInput>
      <TextInput
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
        placeholder="Weight"
        keyboardType="numeric"></TextInput>
      <Button title="Add" onPress={addSet}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    gap: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
    borderColor: "gainsboro",
  },
});

export default NewSetInput;
