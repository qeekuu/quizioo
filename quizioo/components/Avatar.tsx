import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

interface AvatarProps {
	avatarUri?: string;
	size: number;
	color?: string;
}

const ICON_PREFIX = "icon:" as const;

const Avatar = ({ avatarUri, size, color = "#FFF"}: AvatarProps) => {
	if(!avatarUri) {
		return <Ionicons name="person-circle-outline" size={size} color={color} />;
	}	

	if(avatarUri.startsWith(ICON_PREFIX)) {
		return (
			<Ionicons name={avatarUri.slice(ICON_PREFIX.length) as any} size={size} color={color} />
		);
	}

	return (
		<Image
			source={{ uri: avatarUri}}	
			style={{ width: size, height: size, borderRadius: size / 2 }}
			contentFit="cover"
		/>
	);
};

export default Avatar;

