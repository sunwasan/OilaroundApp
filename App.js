import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Homepage from "./screens/Homepage";
import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./navigations/BottomTab";
import Blank from "./screens/Blank";
import BottomNavBar from "./components/BottomNavBar";
import RootStack from "./navigations/RootStack";
import HomeStack from "./navigations/HomeStack";

export default function App() {
  return (
    // <NavigationContainer>
    //   <Profile />
    // </NavigationContainer>

    // <Homepage/>
    <NavigationContainer>
      <HomeStack/>
    </NavigationContainer>
    // <Blank/>
  );
}
