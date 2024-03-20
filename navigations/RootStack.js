import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="BottomTab">
      <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
