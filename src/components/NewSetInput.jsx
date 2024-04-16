import {useState} from "react";
import {View, StyleSheet, TextInput, Button, Text} from "react-native";
import {gql} from "graphql-request";
import {useMutation} from "@tanstack/react-query";
import client from "../graphqlClient";

const mutationDocument = gql`
  mutation insertSet($newSet: NewSet!) {
    insertSet(
      document: $newSet
      dataSource: "Cluster0"
      database: "workouts"
      collection: "sets"
    ) {
      insertedId
    }
  }
`;

const NewSetInput = ({exerciseName}) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const {mutate, error, isError, isPending} = useMutation({
    mutationFn: (newSet) => client.request(mutationDocument, {newSet}),
  });

  const addSet = () => {
    console.warn("Add set:", reps, weight);

    const newSet = {
      exercise: exerciseName,
      reps: Number.parseInt(reps),
    };

    if (Number.parseFloat(weight)) {
      newSet.weight = Number.parseFloat(weight);
    }
    mutate(newSet);
    setReps("");
    setWeight("");
  };

  if (error) {
    console.log(error);
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
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
        <Button
          title={isPending ? "Adding..." : "Add"}
          onPress={addSet}></Button>
      </View>
      {isError && <Text style={{color: "red"}}>Failed to add</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    gap: 5,
  },
  row: {
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
