import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [name, setName] = useState("Digite seu nome");

  function handleNext() {
    router.navigate("/dashboard");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Olá, {name}</Text>
      <Input
        onChangeText={(text) => {
          setName(text);
          if (text == "") {
            setName("Digite seu nome");
          }
        }}
      />
      <Button title="Entrar" onPress={handleNext}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    gap: 5,
  },

  tittle: {
    color: "#423566ff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
