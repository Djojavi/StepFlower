import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function AppHeader({
  title = "StepFlower",
}: {
  title?: string;
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      {/* espacio para balancear */}
      <View style={styles.rightSpace} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: "#f4f4f4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    fontSize: 24,
    color: "#3c8f73",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3c8f73",
  },
  rightSpace: {
    width: 40,
  },
});
