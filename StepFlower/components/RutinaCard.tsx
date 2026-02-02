import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  id: string;
  title: string;
  date: string;
  stepsDone: number;
  stepsTotal: number;
  status: "ok" | "pending";
  avatarEmoji?: string;
  onPress: (id: string) => void;
};

export function RutinaCard({
  id,
  title,
  date,
  stepsDone,
  stepsTotal,
  status,
  avatarEmoji = "🌿",
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={() => onPress(id)}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}
    >
      <View style={styles.checkbox} />

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{avatarEmoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.steps}>
          {stepsDone}/{stepsTotal} steps
        </Text>
      </View>

      <View
        style={[
          styles.statusPill,
          status === "ok" ? styles.ok : styles.pending,
        ]}
      >
        <Text style={styles.statusText}>{status === "ok" ? "✓" : "✕"}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dff0d8",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#b7c2b2",
    backgroundColor: "#eaf3e6",
    marginRight: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#ffffffaa",
    borderWidth: 2,
    borderColor: "#6ea86a",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { fontSize: 22 },
  info: { flex: 1 },
  title: { fontSize: 18, fontWeight: "700", color: "#1d2a1f" },
  date: { fontSize: 12, color: "#506055", marginTop: 2 },
  steps: { fontSize: 14, color: "#1d2a1f", marginTop: 4 },
  statusPill: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  ok: { backgroundColor: "#2fb34a" },
  pending: { backgroundColor: "#f0c645" },
  statusText: { color: "white", fontWeight: "900" },
});
