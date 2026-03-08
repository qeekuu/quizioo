import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";

interface TabIconProps {
	name: ComponentProps<typeof Ionicons>["name"];
	color: string;
	size: number;
}

const TabIcon = ({ name, color, size }: TabIconProps) => (
  <Ionicons name={name} color={color} size={size} />
);

export default TabIcon;
