import React from "react";
import { View, Text } from "react-native";

type Props = {
  week: boolean[];   // 7 dni: true = streak, false = brak
  currentStreak: number;
  bestStreak: number;
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayStreak = (n: number) => (n === 1 ? "Day" : "Days");

export default function WeeklyStreak({
  week,
  currentStreak,
  bestStreak,
}: Props) {
  return (
    <View>
      {/* dni tygodnia */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {days.map((d) => (
          <Text
            key={d}
            style={{
              width: 30,
              textAlign: "center",
              fontSize: 12,
              color: "#999",
            }}
          >
            {d}
          </Text>
        ))}
      </View>

      {/* kropki */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        {week.map((active, i) => (
          <View
            key={i}
            style={{
              width: 30,
              height: 12,
              borderRadius: 6,
              backgroundColor: active ? "#4ade80" : "#2a2a2a",
            }}
          />
        ))}
      </View>

      {/* statystyki */}
      <View style={{ marginTop: 12 }}>
        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 'bold' }}>
          {dayStreak(currentStreak)} in a row: {currentStreak}
        </Text>
        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>
          Best streak: {bestStreak}
        </Text>
      </View>
    </View>
  );
}

