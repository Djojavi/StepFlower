import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
/*
  Luego esto puede venir aqui SQLite con useEffect
*/
const ROUTINE_DETAILS: Record<
  string,
  {
    title: string;
    activities: {
      id: string;
      title: string;
      description?: string;
      icon?: string;
    }[];
  }
> = {
  morning: {
    title: "Mañana",
    activities: [
      {
        id: "a1",
        title: "Tender la Cama",
        description:
          "Sacar las cobijas, agitarlas y estirarlas encima de la cama",
        icon: "🛏️",
      },
      {
        id: "a2",
        title: "Vestirse",
        description: "Elegir ropa y cambiarse",
        icon: "👕",
      },
      {
        id: "a3",
        title: "Ir hacia la Parada",
        description: "Salir y caminar a la parada",
        icon: "🚌",
      },
    ],
  },
};

export default function ActivityDetailScreen() {
  const router = useRouter();
  const { id, activityId } = useLocalSearchParams<{
    id: string;
    activityId: string;
  }>();

  const routine = id ? ROUTINE_DETAILS[id] : undefined;
  const ACTIVITY_IMAGES = {
    a1: require("@/assets/images/raiz.png"),
    a2: require("@/assets/images/petalo.png"),
    a3: require("@/assets/images/flor.png"),
  } as const;

  const { activity, index, total } = useMemo(() => {
    const list = routine?.activities ?? [];
    const idx = list.findIndex((a) => a.id === activityId);
    return {
      activity: idx >= 0 ? list[idx] : undefined,
      index: idx,
      total: list.length,
    };
  }, [routine, activityId]);

  if (!routine || !activity || index < 0) {
    return (
      <View style={styles.center}>
        <Text allowFontScaling>No se encontró la actividad.</Text>
        <Pressable onPress={() => router.back()} accessibilityRole="button"
  accessibilityLabel="Volver">
          <Text allowFontScaling style={{ fontWeight: "700" }}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  const stepLabel = `${index + 1}/${total}`;

  const goPrev = () => {
    if (index <= 0) return;
    const prevId = routine.activities[index - 1].id;
    router.replace(`/routines/${id}/activities/${prevId}`);
  };

  const goNext = () => {
    if (index < total - 1) {
      const nextId = routine.activities[index + 1].id;
      router.replace(`/routines/${id}/activities/${nextId}`);
    } else {
      router.replace(`/routines/${id}/activities/completed`);
    }
  };

  return (
    <View style={styles.screen}>
      {/* Sub header */}
      <View style={styles.subHeader}>
        <Text allowFontScaling style={styles.title}>
          {routine.title} ({stepLabel})
        </Text>
      </View>

      {/* Card actividad */}
      <View style={styles.card}>
        <Text allowFontScaling style={styles.cardTitle}>{activity.title}</Text>
        <Text allowFontScaling style={{ fontSize: 22 }}>{activity.icon ?? "✅"}</Text>
      </View>

      {/* Descripción */}
      <View style={styles.description}>
        <Text allowFontScaling style={styles.descriptionText}>
          {activity.description ?? "Sin descripción"}
        </Text>
      </View>

      {/* Área imagen grande */}
      <View style={styles.bigArea}>
        <Image
          source={ACTIVITY_IMAGES[activity.id as keyof typeof ACTIVITY_IMAGES]}
          style={styles.image}
          contentFit="contain"
        />
      </View>

      {/* Botones */}
      <View style={styles.bottom}>
        <Pressable
        accessibilityRole="button"
  accessibilityLabel="Anterior"
          onPress={goPrev}
          disabled={index === 0}
          style={[styles.btn, styles.outline, index === 0 && styles.disabled]}
        >
          <Text allowFontScaling style={styles.outlineText}>Anterior</Text>
        </Pressable>

        <Pressable onPress={goNext} style={[styles.btn, styles.primary]} accessibilityRole="button"
  accessibilityLabel={index === total - 1 ? "Finalizar" : "Siguiente"}>
          
          <Text allowFontScaling style={styles.primaryText}>
            {index === total - 1 ? "Finalizar" : "Siguiente"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f6f2ef" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  subHeader: { padding: 14 },
  backRow: { flexDirection: "row", alignItems: "center" },
  arrow: { fontSize: 18, marginRight: 8 },
  title: { fontSize: 20, fontWeight: "900" },

  card: {
    backgroundColor: "#dff0d8",
    marginHorizontal: 14,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: { flex: 1, fontWeight: "800", fontSize: 16 },

  description: {
    marginHorizontal: 48,
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#eef7ea",
  },
  descriptionText: { textAlign: "center", fontSize: 17 },

  bigArea: { flex: 1, alignItems: "center", justifyContent: "center" },

  bottom: {
    flexDirection: "row",
    padding: 54,
    gap: 12,
  },

  btn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  outline: {
    borderWidth: 1,
    borderColor: "#3c8f73",
    backgroundColor: "white",
  },

  outlineText: { color: "#3c8f73", fontWeight: "800" },

  primary: {
    backgroundColor: "#3c8f73",
  },

  primaryText: { color: "white", fontWeight: "800" },

  disabled: { opacity: 0.5 },
  image: {
    width: 220,
    height: 220,
  },
});
