import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "@/app/(navigation)/types";
import { api } from "@/app/(api)/client";

type R = RouteProp<RootStackParamList, "QrShare">;

export default function QrShareScreen() {
  const route = useRoute<R>();
  const { quizId } = route.params;

  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { code } = await api.createQuizShare(quizId);
        if (mounted) setCode(code);
      } catch (e: any) {
        Alert.alert("Error", e?.message ?? "Cannot create share");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [quizId]);

  const value = code ? `quizioo://import?code=${encodeURIComponent(code)}` : "";

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 16, backgroundColor: "#141B2C" }}>
      <Text style={{ color: "#FFFFFF" }}>Share quiz QR</Text>

      {code ? <QRCode value={value} size={240} /> : <Text style={{ color: "#FFFFFF" }}>Loading...</Text>}

      {code ? <Text style={{ color: "#aaa" }}>{code}</Text> : null}
    </View>
  );
}

