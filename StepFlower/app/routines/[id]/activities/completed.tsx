import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
export default function CompletedScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.screen}>
      <View style={styles.center}>
        <Text allowFontScaling style={styles.title}>
          ¡Felicidades!
        </Text>
        <Text allowFontScaling style={styles.subtitle}>
          Terminaste exitosamente esta rutina.
        </Text>

        <View style={styles.bigArea}>
          <Image
            accessibilityLabel="Mensaje de felicidades"
            source={require("@/assets/images/felicidades.png")}
            style={styles.image}
            contentFit="contain"
          />
        </View>
        <Pressable
          style={styles.button}
          onPress={() => router.replace("/(drawer)/(tabs)/home")}
          accessibilityRole="button"
          accessibilityLabel="Inicio"
        >
          <Text allowFontScaling style={styles.buttonText}>
            Inicio
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f6f2ef" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "900" },
  subtitle: { marginTop: 8, textAlign: "center" },
  button: {
    marginTop: 20,
    backgroundColor: "#3c8f73",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: { color: "white", fontWeight: "800" },
  bigArea: { flex: 0.5, alignItems: "center", justifyContent: "center" },
  image: {
    width: 220,
    height: 220,
  },
});
