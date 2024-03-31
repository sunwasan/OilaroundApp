import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Homepage from "../screens/Homepage";
import Profile from "../screens/Profile";
import History from "../screens/History";


const Stack = createStackNavigator();

export default function HomeStack(){
    return(
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name ='Home' component={Homepage} options={{ headerShown: false ,animationEnabled: false}}/>
        <Stack.Screen name ='Profile' component={Profile}options={{ headerShown: false ,animationEnabled: false}}/>
        <Stack.Screen name ='History' component={History} options={{ headerShown: false ,animationEnabled: false}}/>
    </Stack.Navigator>
    );
}