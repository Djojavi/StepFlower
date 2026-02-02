import React from "react";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/components/CustomDrawerContent";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: { width: 280, backgroundColor: "white" },
        sceneContainerStyle: { backgroundColor: "transparent" },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          title: "Ajustes",
        }}
      />
    </Drawer>
  );
}
