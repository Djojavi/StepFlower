// app/routines/[id].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
const ROUTINE_DETAILS: Record<
  string,
  {
    title: string;
    date: string;
    stepsDone: number;
    stepsTotal: number;
    status: "ok" | "pending";
    avatarEmoji: string;
    activities: { id: string; title: string; done: boolean; icon: string }[];
  }
> = {
  morning: {
    title: "Mañana",
    date: "26/11/2025",
    stepsDone: 3,
    stepsTotal: 3,
    status: "ok",
    avatarEmoji: "🍁",
    activities: [
      { id: "a1", title: "Tender la Cama", done: true, icon: "🛏️" },
      { id: "a2", title: "Vestirse", done: true, icon: "👕" },
      { id: "a3", title: "Ir hacia la Parada", done: true, icon: "🚌" },
    ],
  },
  clean: {
    title: "Limpieza",
    date: "26/11/2025",
    stepsDone: 2,
    stepsTotal: 3,
    status: "pending",
    avatarEmoji: "🌸",
    activities: [
      { id: "b1", title: "Recoger ropa", done: true, icon: "🧺" },
      { id: "b2", title: "Barrer", done: true, icon: "🧹" },
      { id: "b3", title: "Sacar basura", done: false, icon: "🗑️" },
    ],
  },
};

function ActivityRow({
  indexLabel,
  title,
  icon,
  done,
}: {
  indexLabel: string;
  title: string;
  icon: string;
  done: boolean;
}) {
  return (
    <View
      style={[
        styles.activityRow,
        done ? styles.activityDone : styles.activityPending,
      ]}
    >
      <Text allowFontScaling style={styles.activityIndex}>{indexLabel}</Text>
      <Text allowFontScaling style={styles.activityTitle}>{title}</Text>
      <View style={styles.activityIcon}>
        <Text allowFontScaling style={{ fontSize: 18 }}>{icon}</Text>
      </View>
    </View>
  );
}

export default function RoutineDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const routine = id ? ROUTINE_DETAILS[id] : undefined;

  if (!routine) {
    return (
      <View
        style={[
          styles.screen,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text allowFontScaling>Rutina no encontrada.</Text>
        <Pressable accessibilityRole="button"
          accessibilityLabel="Volver" onPress={() => router.back()} style={{ marginTop: 12 }}>
          <Text allowFontScaling style={{ fontWeight: "700" }}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button"
  accessibilityLabel="Volver" onPress={() => router.back()} style={styles.backBtn}>
          <Text allowFontScaling style={styles.backText}>←</Text>
        </Pressable>
        <Text allowFontScaling style={styles.headerTitle}>{routine.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Card resumen */}
      <View style={styles.summaryCard}>
        <View style={styles.avatar}>
          <Text allowFontScaling style={{ fontSize: 22 }}>{routine.avatarEmoji}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text allowFontScaling style={styles.summaryTitle}>{routine.title}</Text>
          <Text allowFontScaling style={styles.summaryDate}>{routine.date}</Text>
          <Text allowFontScaling style={styles.summarySteps}>
            {routine.stepsDone}/{routine.stepsTotal} steps
          </Text>
        </View>

        <View
          style={[
            styles.statusPill,
            routine.status === "ok" ? styles.ok : styles.pending,
          ]}
        >
          <Text allowFontScaling style={styles.statusText}>
            {routine.status === "ok" ? "✓" : "✕"}
          </Text>
        </View>
      </View>

      {/* Actividades */}
      <View style={styles.listPanel}>
        <FlatList
          data={routine.activities}
          keyExtractor={(a) => a.id}
          contentContainerStyle={{ padding: 14 }}
          renderItem={({ item, index }) => (
            <Pressable
            accessibilityRole="button"
  accessibilityLabel="Continuar"
              onPress={() =>
                router.push(`/routines/${id}/activities/${item.id}`)
              }
              android_ripple={{ color: "#00000010" }}
              style={{ borderRadius: 14 }}
            >
              <ActivityRow
                indexLabel={`${index + 1}/${routine.stepsTotal}`}
                title={item.title}
                icon={item.icon}
                done={item.done}
              />
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f6f2ef", paddingTop: 40 },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  backBtn: {
    width: 40,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c7c7c7",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  backText: { fontSize: 18, fontWeight: "700" },
  headerTitle: {
    flex: 1,
    textAlign: "left",
    marginLeft: 12,
    fontSize: 24,
    fontWeight: "900",
    color: "#1e2a21",
  },

  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dff0d8",
    borderRadius: 14,
    marginHorizontal: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
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
  summaryTitle: { fontSize: 18, fontWeight: "800", color: "#1d2a1f" },
  summaryDate: { fontSize: 12, color: "#506055", marginTop: 2 },
  summarySteps: { fontSize: 14, color: "#1d2a1f", marginTop: 4 },

  statusPill: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  ok: { backgroundColor: "#2fb34a" },
  pending: { backgroundColor: "#f0c645" },
  statusText: { color: "white", fontWeight: "900" },

  listPanel: {
    flex: 1,
    marginHorizontal: 14,
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  activityDone: { backgroundColor: "#eef7ea" },
  activityPending: { backgroundColor: "#f4f6f4" },
  activityIndex: {
    width: 50,
    fontSize: 18,
    fontWeight: "900",
    color: "#1d2a1f",
  },
  activityTitle: { flex: 1, fontSize: 14, color: "#1d2a1f" },
  activityIcon: { width: 42, alignItems: "flex-end", justifyContent: "center" },
});
