import {View, Text, ActivityIndicator, FlatList} from "react-native";
import {gql} from "graphql-request";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import client from "../graphqlClient";

const setQuery = gql`
  query sets($exercise: String) {
    sets(exercise: $exercise) {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = ({ListHeaderComponent, exerciseName}) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ["sets", exerciseName],
    queryFn: () => client.request(setQuery, {exercise: exerciseName}),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <FlatList
      data={data.sets.documents}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <Text
          style={{
            backgroundColor: "white",
            marginVertical: 5,
            padding: 10,
            borderRadius: 5,
            overflow: "hidden",
          }}>
          {item.reps} x {item.weight}
        </Text>
      )}
    />
  );
};

export default SetsList;
