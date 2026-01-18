import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles, colors } from "../Profile/ProfileScreen.styles";
import { useAuth } from "@/app/(context)/AppContext";
import {Avatar} from "../components/Avatar";

const DEFAULT_AVATARS = [
  { id: "default", icon: "person-circle-outline", label: "Default" },
  { id: "nerd", icon: "glasses-outline", label: "Nerd" },
  { id: "cool", icon: "flash-outline", label: "Cool" },
] as const;

export default function ProfilePicture() {
  const { state, setAvatar } = useAuth();
  const userName = state.user?.username ?? "Guest";

  const currentAvatar = state.user?.avatarUri;
  const currentAvatarStr = typeof currentAvatar === "string" ? currentAvatar : "";

  const onPickDefault = async (iconName: string) => {
    try {
      await setAvatar(`icon:${iconName}`);
    } catch (e) {
      console.log("Avatar update error:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Profile: {userName}</Text>
      </View>

	  <View style={{ alignItems: 'center', marginBottom: 16 }}>
		<Avatar 
			avatarUri={currentAvatar}
			size={96}
		/>
	  </View>
      <View style={styles.avatarCard}>
        <View style={styles.avatarCardInside}>
          {DEFAULT_AVATARS.map((avatar) => {
            const isSelected = currentAvatarStr === `icon:${avatar.icon}`;

            return (
              <TouchableOpacity
                key={avatar.id}
                onPress={() => onPickDefault(avatar.icon)}
                style={[
                  styles.avatarTile,
                  isSelected && {
                    borderWidth: 3,
                    borderColor: colors.bordercolor,
                  },
                ]}
              >
                <Ionicons name={avatar.icon as any} size={36} color="#fff" />
                <Text style={styles.avatarLabel}>{avatar.label}</Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={styles.avatarTile}
            onPress={() => console.log("Pick custom avatar")}
          >
            <Ionicons name="image-outline" size={36} color="#fff" />
            <Text style={styles.avatarLabel}>Custom</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

