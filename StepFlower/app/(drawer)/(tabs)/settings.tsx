import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useNavigation, DrawerActions } from "@react-navigation/native";

type RowProps = {
  icon: string; // emoji para simplificar (luego lo cambias a icon library)
  title: string;
  subtitle?: string;
  rightText?: string;
  onPress?: () => void;
};

function Row({ icon, title, subtitle, rightText, onPress }: RowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.9 }]}
    >
      <View style={styles.rowLeft}>
        <Text style={styles.rowIcon}>{icon}</Text>
      </View>

      <View style={styles.rowMid}>
        <Text style={styles.rowTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.rowSub}>{subtitle}</Text>}
      </View>

      <View style={styles.rowRight}>
        {!!rightText && <Text style={styles.rowRightText}>{rightText}</Text>}
        <Text style={styles.chev}>›</Text>
      </View>
    </Pressable>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

export default function SettingsScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 22 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con imagen de fondo */}
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=60",
          }}
          style={styles.headerBg}
          imageStyle={{ opacity: 0.9 }}
        >
          {/* overlay */}
          <View style={styles.headerOverlay} />

          {/* top bar */}
          <View style={styles.headerTop}>
            <Pressable
              style={styles.menuButton}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Text style={styles.menuIcon}>☰</Text>
            </Pressable>
          </View>

          {/* avatar + nombre */}
          <View style={styles.headerCenter}>
            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: "https://i.pravatar.cc/200?img=12" }}
                style={styles.avatar}
                contentFit="cover"
              />
              <View style={styles.editDot}>
                <Text
                  style={{ color: "white", fontWeight: "900", fontSize: 10 }}
                >
                  ✎
                </Text>
              </View>
            </View>

            <Text style={styles.name}>Juan Posso</Text>
            <Text style={styles.handle}>@stepflower</Text>

            {/* stats */}
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>210</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.stat}>
                <Text style={styles.statValue}>359k</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Card Personal Info */}
        <View style={styles.card}>
          <SectionTitle title="Personal Info" />

          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Date of Birth</Text>
              <Text style={styles.gridValue}>21 Sep 2001</Text>
            </View>

            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Gender</Text>
              <Text style={styles.gridValue}>Male</Text>
            </View>

            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Marital Status</Text>
              <Text style={styles.gridValue}>Single</Text>
            </View>

            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Profession</Text>
              <Text style={styles.gridValue}>Product Designer</Text>
            </View>
          </View>

          <View style={styles.hr} />

          <Row
            icon="✉️"
            title="Email Address"
            subtitle="info@mail.com"
            onPress={() => {}}
          />
          <Row
            icon="📞"
            title="Phone Number"
            subtitle="+593 999 999 999"
            onPress={() => {}}
          />
        </View>

        {/* Sections */}
        <View style={styles.card}>
          <SectionTitle title="Languages" />
          <Row
            icon="🌐"
            title="Languages"
            subtitle="English, Spanish"
            onPress={() => {}}
          />
        </View>

        <View style={styles.card}>
          <SectionTitle title="Places" />
          <Row
            icon="📍"
            title="Location"
            subtitle="Quito, Ecuador"
            onPress={() => {}}
          />
        </View>

        <View style={styles.card}>
          <SectionTitle title="Interests" />
          <Row
            icon="⭐"
            title="Interests"
            subtitle="Training, Adventure, Friends"
            onPress={() => {}}
          />
        </View>

        <View style={styles.card}>
          <SectionTitle title="Settings" />
          <Row icon="🔒" title="Privacy" onPress={() => {}} />
          <Row icon="ℹ️" title="Information" onPress={() => {}} />
        </View>

        {/* Logout */}
        <Pressable style={styles.logout} onPress={() => {}}>
          <Text style={styles.logoutIcon}>⎋</Text>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f6f2ef" },

  headerBg: {
    height: 230,
    width: "100%",
    position: "relative",
    justifyContent: "flex-end",
    paddingBottom: 12,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    opacity: 0.12,
  },
  headerTop: {
    position: "absolute",
    top: 30,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    width: 38,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { fontSize: 18, fontWeight: "900" },

  headerCenter: { alignItems: "center" },

  avatarWrap: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 3,
    borderColor: "#4a9a83",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  editDot: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },

  name: { marginTop: 8, fontSize: 18, fontWeight: "900", color: "#122017" },
  handle: { marginTop: 2, fontSize: 12, color: "#3c4a41" },

  statsRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.82)",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  stat: { alignItems: "center" },
  statValue: { fontSize: 14, fontWeight: "900", color: "#122017" },
  statLabel: { fontSize: 11, color: "#4e5b52", marginTop: 2 },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "#d5ddd7",
    marginHorizontal: 16,
  },

  card: {
    marginTop: 12,
    marginHorizontal: 14,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#3b4a40",
    marginBottom: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: "#3c8f73",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    padding: 10,
  },
  gridLabel: { fontSize: 10, color: "#68756c" },
  gridValue: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "800",
    color: "#1e2a21",
  },

  hr: { height: 1, backgroundColor: "#eee", marginVertical: 10 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  rowLeft: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e6f2e3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowIcon: { fontSize: 16 },
  rowMid: { flex: 1 },
  rowTitle: { fontSize: 13, fontWeight: "900", color: "#1e2a21" },
  rowSub: { fontSize: 11, color: "#6e7a72", marginTop: 2 },
  rowRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  rowRightText: { fontSize: 11, color: "#6e7a72" },
  chev: { fontSize: 18, color: "#98a39b", marginLeft: 2 },

  logout: {
    marginTop: 14,
    marginHorizontal: 14,
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutIcon: { fontSize: 16, marginRight: 10, color: "#c0392b" },
  logoutText: { fontSize: 13, fontWeight: "900", color: "#c0392b" },
});
