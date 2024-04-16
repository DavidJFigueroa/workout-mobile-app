import {View, Text, ActivityIndicator, FlatList} from "react-native";
import {gql} from "graphql-request";
import {useQuery} from "@tanstack/react-query";
import client from "../graphqlClient";

const setQuery = gql`
  query exercises {
    sets {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = () => {
  const {data, isLoading, error} = useQuery({
    queryKey: ["sets"],
    queryFn: () => client.request(setQuery),
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
