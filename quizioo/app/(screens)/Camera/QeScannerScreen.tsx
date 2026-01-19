import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/app/(navigation)/types";
import { api } from "@/app/(api)/client";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function QrScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lastValue, setLastValue] = useState<string | null>(null);
  const navigation = useNavigation<Nav>();
  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>Dostęp do aparatu jest wymagany do skanowania QR.</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.btn}>
          <Text style={styles.btnText}>Przyznaj uprawnienia</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function extractCode(raw: string) {
		const m = raw.match(/[?&]code=([^&]+)/i);
		if(m?.[1])
			return decodeURIComponent(m[1]);
		return raw.trim();
  }

  const handleScan = async (result: BarcodeScanningResult) => {
    if (scanned) return;

    setScanned(true);
    setLastValue(result.data);
	
	const code = extractCode(result.data);

	try {
		const created = await api.importQuizByShareCode(code);
		Alert.alert("Imported ✅", `Dodano: ${created.quizName}`, [
        { text: "Open", onPress: () => navigation.replace("QuizDetails", { id: created.id }) },
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
	} catch (e: any) {
		Alert.alert("Import failed", e?.message ?? "Cannot import");
		setScanned(false);
	}

    Alert.alert("Scanned", result.data, [
      { text: "Keep scanning", onPress: () => setScanned(false) },
      { text: "OK" },
    ]);
  };
  
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleScan}
      />

      <View pointerEvents="none" style={styles.frame} />

      <View style={styles.bottomBar}>
        <Text style={styles.hint}>
          {lastValue ? `Ostatni QR: ${lastValue}` : "Point camera to the QR code"}
        </Text>

        {scanned && (
          <TouchableOpacity onPress={() => setScanned(false)} style={styles.btn}>
            <Text style={styles.btnText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },

  info: { color: "white", textAlign: "center", marginBottom: 12, paddingHorizontal: 20 },

  frame: {
    position: "absolute",
    alignSelf: "center",
    top: "30%",
    width: 240,
    height: 240,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 16,
    opacity: 0.9,
  },

  bottomBar: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 12,
  },

  hint: {
    color: "white",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  btn: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  btnText: { color: "white", fontWeight: "bold" },
});

