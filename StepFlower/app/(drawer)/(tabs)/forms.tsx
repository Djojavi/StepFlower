import React, { useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";

export default function RoutineFormScreen() {
  // Flor
  const [florNombre, setFlorNombre] = useState("");

  // Imágenes (dinámico)
  const [imagenes, setImagenes] = useState([{ flor_etapa: "", img_url: "" }]);

  // Rutina
  const [rutinaNombre, setRutinaNombre] = useState("");

  // Pasos (dinámico)
  const [pasos, setPasos] = useState([
    { paso_nombre: "", paso_descripcion: "", paso_completado: false },
  ]);

  const rutinaNumPasos = useMemo(() => {
    return pasos.filter(
      (p) => p.paso_nombre.trim() && p.paso_descripcion.trim()
    ).length;
  }, [pasos]);

  // Helpers Imágenes
  const addImagen = () =>
    setImagenes((prev) => [...prev, { flor_etapa: "", img_url: "" }]);

  const removeImagen = (index) =>
    setImagenes((prev) => prev.filter((_, i) => i !== index));

  const updateImagen = (index, key, value) =>
    setImagenes((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [key]: value } : img))
    );

  // Helpers Pasos
  const addPaso = () =>
    setPasos((prev) => [
      ...prev,
      { paso_nombre: "", paso_descripcion: "", paso_completado: false },
    ]);

  const removePaso = (index) =>
    setPasos((prev) => prev.filter((_, i) => i !== index));

  const updatePaso = (index, key, value) =>
    setPasos((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [key]: value } : p))
    );

  const onSubmit = () => {
    // Filtra solo items bien llenos (opcional)
    const imgsValidas = imagenes.filter(
      (i) => i.flor_etapa.trim() && i.img_url.trim()
    );
    const pasosValidos = pasos.filter(
      (p) => p.paso_nombre.trim() && p.paso_descripcion.trim()
    );

    if (!florNombre.trim())
      return Alert.alert("Validación", "Ingresa el nombre de la flor.");
    if (!rutinaNombre.trim())
      return Alert.alert("Validación", "Ingresa el nombre de la rutina.");
    if (pasosValidos.length === 0)
      return Alert.alert("Validación", "Agrega al menos 1 paso completo.");

    const payload = {
      flor: {
        flor_nombre: florNombre.trim(),
      },
      imagenes: imgsValidas.map((i) => ({
        flor_etapa: i.flor_etapa.trim(),
        img_url: i.img_url.trim(),
      })),
      rutina: {
        rutina_nombre: rutinaNombre.trim(),
        rutina_num_pasos: pasosValidos.length,
      },
      pasos: pasosValidos.map((p) => ({
        paso_nombre: p.paso_nombre.trim(),
        paso_descripcion: p.paso_descripcion.trim(),
        paso_completado: p.paso_completado ? 1 : 0, // listo para SQLite si quieres
      })),
    };

    // Aquí luego tú lo conectas a la BD
    console.log("FORM PAYLOAD:", payload);
    Alert.alert("OK", "Datos listos. Revisa consola (payload).");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario: Flor + Rutina</Text>

      {/* FLOR */}
      <Text style={styles.section}>Flor</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la flor (ej: Rosa)"
        value={florNombre}
        onChangeText={setFlorNombre}
      />

      {/* IMÁGENES */}
      <Text style={styles.section}>Imágenes (opcional)</Text>
      {imagenes.map((img, idx) => (
        <View key={`img-${idx}`} style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Etapa (ej: Germinación / Floración)"
            value={img.flor_etapa}
            onChangeText={(v) => updateImagen(idx, "flor_etapa", v)}
          />
          <TextInput
            style={styles.input}
            placeholder="URL de imagen"
            value={img.img_url}
            onChangeText={(v) => updateImagen(idx, "img_url", v)}
            autoCapitalize="none"
          />

          <View style={styles.row}>
            <TouchableOpacity style={styles.btnSmall} onPress={addImagen}>
              <Text style={styles.btnText}>+ Imagen</Text>
            </TouchableOpacity>

            {imagenes.length > 1 && (
              <TouchableOpacity
                style={[styles.btnSmall, styles.btnDanger]}
                onPress={() => removeImagen(idx)}
              >
                <Text style={styles.btnText}>Eliminar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      {/* RUTINA */}
      <Text style={styles.section}>Rutina</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la rutina (ej: Riego semanal)"
        value={rutinaNombre}
        onChangeText={setRutinaNombre}
      />
      <Text style={styles.helper}>N° pasos (calculado): {rutinaNumPasos}</Text>

      {/* PASOS */}
      <Text style={styles.section}>Pasos / Steps</Text>
      {pasos.map((p, idx) => (
        <View key={`paso-${idx}`} style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={`Paso ${idx + 1}: nombre (ej: Regar)`}
            value={p.paso_nombre}
            onChangeText={(v) => updatePaso(idx, "paso_nombre", v)}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción (ej: Riega 200ml por la mañana)"
            value={p.paso_descripcion}
            onChangeText={(v) => updatePaso(idx, "paso_descripcion", v)}
            multiline
          />

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Completado</Text>
            <Switch
              value={p.paso_completado}
              onValueChange={(v) => updatePaso(idx, "paso_completado", v)}
            />
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.btnSmall} onPress={addPaso}>
              <Text style={styles.btnText}>+ Paso</Text>
            </TouchableOpacity>

            {pasos.length > 1 && (
              <TouchableOpacity
                style={[styles.btnSmall, styles.btnDanger]}
                onPress={() => removePaso(idx)}
              >
                <Text style={styles.btnText}>Eliminar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.btnPrimary} onPress={onSubmit}>
        <Text style={styles.btnPrimaryText}>Guardar (solo UI)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },

  section: { marginTop: 18, marginBottom: 8, fontSize: 16, fontWeight: "700" },
  helper: { marginTop: 6, opacity: 0.7 },

  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },

  textArea: { minHeight: 80, textAlignVertical: "top" },

  row: { flexDirection: "row", gap: 10 },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    marginBottom: 8,
  },
  switchLabel: { fontWeight: "600" },

  btnSmall: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  btnDanger: { borderColor: "#ff6b6b" },
  btnText: { fontWeight: "700" },

  btnPrimary: {
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  btnPrimaryText: { fontWeight: "800" },
});
