import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useHelloQuery } from "client-controllers"
import { ApolloProvider } from "@apollo/client";
import { client } from "client-controllers";

const Content = () => {
  const { data, loading, error } = useHelloQuery();

  return (
    <View style={styles.container}>
      <Text>{loading ? "Loading" : error ? JSON.stringify(error) : data?.hello || "No data form the API"}</Text>
      <StatusBar style="auto" />
    </View>
  )
}

export default function App() {

  return (
    <ApolloProvider client={client}>
      <Content />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
