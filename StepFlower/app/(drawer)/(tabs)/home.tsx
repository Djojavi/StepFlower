// app/(tabs)/home.tsx
import AppHeader from "@/components/AppHeader";
import { RutinaCard } from "@/components/RutinaCard";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const ROUTINES = [
  {
    id: "morning",
    title: "Mañana",
    date: "26/11/2025",
    stepsDone: 3,
    stepsTotal: 3,
    status: "ok" as const,
    avatarEmoji: "🍁",
  },
  {
    id: "clean",
    title: "Limpieza",
    date: "26/11/2025",
    stepsDone: 2,
    stepsTotal: 3,
    status: "pending" as const,
    avatarEmoji: "🌸",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <AppHeader title="StepFlower" />
      <Text allowFontScaling style={styles.sectionTitle}>Mis Rutinas</Text>
      <View style={styles.panel}>
        <FlatList
          data={ROUTINES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <RutinaCard
              id={item.id}
              title={item.title}
              date={item.date}
              stepsDone={item.stepsDone}
              stepsTotal={item.stepsTotal}
              status={item.status}
              avatarEmoji={item.avatarEmoji}
              onPress={(id) => router.push(`/routines/${id}`)}
            />
          )}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Crear rutina"
        style={styles.fab}
        onPress={() => {
          /* crear rutina */
        }}
      >
        <Text allowFontScaling style={styles.fabText}>＋</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f6f2ef", paddingTop: 10 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1e2a21",
    paddingHorizontal: 18,
    marginTop: 8,
    marginBottom: 8,
    textDecorationLine: "underline",
    textDecorationColor: "#2f6f52",
  },
  panel: {
    flex: 1,
    marginHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#4a8f74",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  fabText: { color: "white", fontSize: 34, marginTop: -2 },
});
