import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { router } from "expo-router";

type Item = {
  key: string;
  title: string;
  subtitle: string;
  icon: string; // emoji para simplificar
  href: string; // ruta expo-router
};

const ITEMS: Item[] = [
  {
    key: "home",
    title: "Home",
    subtitle: "Mira todas las rutinas",
    icon: "🏠",
    href: "/(drawer)/(tabs)/home", // ajusta si tu home está en otra ruta
  },
  {
    key: "settings",
    title: "Ajustes",
    subtitle: "Personaliza tu experiencia",
    icon: "⚙️",
    href: "/(drawer)/settings",
  },
];

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  // ruta activa (para resaltar)
  const state = props.state;
  const activeRouteName = state.routeNames[state.index]; // "(tabs)" | "about" | "settings"

  return (
    <View style={styles.container}>
      {/* Header verde */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
      >
        {ITEMS.map((item) => {
          const isActive =
            (activeRouteName === "(tabs)" && item.key === "home") ||
            activeRouteName === item.key;

          return (
            <Pressable
              key={item.key}
              onPress={() => {
                props.navigation.closeDrawer();
                router.push(item.href);
              }}
              style={({ pressed }) => [
                styles.item,
                isActive && styles.itemActive,
                pressed && { opacity: 0.92 },
              ]}
            >
              <View style={styles.iconWrap}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              <View style={styles.textWrap}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>
            </Pressable>
          );
        })}
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

  header: {
    height: 78,
    backgroundColor: "#4a9a83",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  scrollContent: {
    paddingTop: 14,
    paddingHorizontal: 12,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  itemActive: {
    backgroundColor: "#e6f2e3", // verde clarito como tu imagen
  },

  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e6f2e3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: { fontSize: 18 },

  textWrap: { flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: "800", color: "#1e2a21" },
  itemSubtitle: { fontSize: 11, color: "#6e7a72", marginTop: 2 },
});
