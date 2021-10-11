import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {useHelloQuery} from "client-controllers"

export default function App() {
  const {data, loading} = useHelloQuery();
  return (
    <View style={styles.container}>
      <Text>{loading ? "Loading" : data?.hello || "No data form the API"}</Text>
      <StatusBar style="auto" />
    </View>
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
