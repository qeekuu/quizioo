import React, { useEffect, useState } from "react";
import { Alert, Linking, SectionList, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./SettingsScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/types";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useCameraPermissions } from "expo-camera";

type Nav = NativeStackNavigationProp<RootStackParamList, "Settings">;

const NOTIF_KEY = "settings_notifications_enabled";

export default function SettingsScreen() {
  const navigation = useNavigation<Nav>();

  const [camPermission, requestCamPermission] = useCameraPermissions();
  const camGranted = !!camPermission?.granted;

  const [notifEnabled, setNotifEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const raw = await SecureStore.getItemAsync(NOTIF_KEY);
      setNotifEnabled(raw === "1");
    })();
  }, []);

  const handleSignOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };


  const toggleCamera = async (next: boolean) => {
    if (next) {
      const res = await requestCamPermission();
      if (!res.granted) {
        Alert.alert(
          "Kamera",
          "Access to cameras denied. Can be enabled in phone settings..",
          [
            { text: "Settings", onPress: () => Linking.openSettings() },
            { text: "OK" },
          ]
        );
      }
      return;
    }

    Alert.alert(
      "Camera",
      "You can only disable camera permission in your phone settings.",
      [{ text: "Settings", onPress: () => Linking.openSettings() }, { text: "OK" }]
    );
  };

  const toggleNotifications = async (next: boolean) => {
    if (next) {
      try {
        const Notifications = await import("expo-notifications");

        let perm = await Notifications.getPermissionsAsync();
        let status = perm.status;

        if (status !== "granted") {
          const req = await Notifications.requestPermissionsAsync();
          status = req.status;
        }

        if (status !== "granted") {
          Alert.alert(
            "Notifications",
            "Notifications were not allowed. You can enable them in your phone's settings..",
            [
              { text: "Ustawienia", onPress: () => Linking.openSettings() },
              { text: "OK" },
            ]
          );
          return;
        }

        setNotifEnabled(true);
        await SecureStore.setItemAsync(NOTIF_KEY, "1");
        return;
      } catch (e) {
        Alert.alert(
          "Notifications",
          "Expo Go (SDK 53) problem woth push notifications"
        );
        return;
      }
    }

    setNotifEnabled(false);
    await SecureStore.setItemAsync(NOTIF_KEY, "0");
  };

  const SETTINGS = [
    {
      title: "General Settings",
      data: [{ key: "Notifications", label: "Yes or No" }],
    },
    {
      title: "Privacy and Security",
      data: [{ key: "Permissions", label: "Camera" }],
    },
    {
      title: "Account",
      data: [{ key: "Sign Out", label: "See you soon!" }],
    },
    {
      title: "Support",
      data: [{ key: "Contact", label: "test@addres.com" }],
    },
  ] as const;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Settings</Text>
      </View>

      <SectionList
        sections={SETTINGS as any}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.settingsSection}>
            <View>
              <Text style={styles.settingsSectionText}>{item.key}</Text>
              <Text style={styles.settingsSubSectionText}>{item.label}</Text>
            </View>

            {item.key === "Notifications" && (
              <Switch value={notifEnabled} onValueChange={toggleNotifications} />
            )}

            {item.key === "Permissions" && (
              <Switch value={camGranted} onValueChange={toggleCamera} />
            )}

            {item.key === "Sign Out" && (
              <TouchableOpacity onPress={handleSignOut}>
                <Text style={styles.settingsSubSectionText}>Sign Out</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <Text style={styles.settingsSectionHeader}>{section.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

