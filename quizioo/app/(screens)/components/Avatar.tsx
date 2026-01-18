import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";

type Props = {
  avatarUri?: string;
  size: number;
};

export function Avatar({ avatarUri, size }: Props) {
  if (!avatarUri) {
    return <Ionicons name="person-circle-outline" size={size} color="#fff" />;
  }

  if (avatarUri.startsWith("icon:")) {
    return (
      <Ionicons
        name={avatarUri.replace("icon:", "") as any}
        size={size}
        color="#fff"
      />
    );
  }

  return (
    <Image
      source={{ uri: avatarUri }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      contentFit="cover"
    />
  );
}

