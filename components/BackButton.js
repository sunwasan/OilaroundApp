// chevron-circle-left
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <View style={{ zIndex: 50, margin: 5 , marginTop:20}}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome
          name="chevron-left"
          size={60}
          style={{ opacity: 0.5 }}
        />
      </TouchableOpacity>
    </View>
  );
}
