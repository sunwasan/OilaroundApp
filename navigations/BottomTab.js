import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Profile from "../screens/Profile";
import { FontAwesome } from "@expo/vector-icons";
import Homepage from "../screens/Homepage";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
