import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, StyleSheet, View, Pressable } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.image}
      />
      <Pressable style={styles.button} onPress={() => router.navigate("/home")}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2e7e5",
    minHeight: "100%",
  },
  button: {
    backgroundColor: "#ed7059",
    padding: 10,
    borderRadius: 15,
    paddingHorizontal: 50,
    marginTop: 40,
  },
  buttonText: {
    fontSize: 15,
    color: "#f2e7e5",
    fontFamily: "font8bit",
  },
  image: {
    height: 320,
    width: 320,
  },
});
