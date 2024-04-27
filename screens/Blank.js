import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import BottomNavBar from "../components/BottomNavBar";

export default function Blank() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={{ ...StyleSheet.absoluteFillObject, elevation: 0 }}
        colors={["blue", "purple"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.3, y: 0 }}
      >
        <BottomNavBar/>
      </LinearGradient>
    </View>
  );
}
