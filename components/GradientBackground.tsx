import { LinearGradient } from "expo-linear-gradient";
import React from "react";

export default function GradientBackground() {
  return (
    <LinearGradient
      colors={["#f97316bf", "#fdc83080"]}
      className="absolute top-0 left-0 right-0 h-full"
    />
  );
}
