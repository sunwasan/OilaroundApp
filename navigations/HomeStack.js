import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Homepage from "../screens/Homepage";
// import Profile from "../screens/Profile";
import History from "../screens/History";
import Map from "../screens/Map";
import YourProfile from "../screens/YourProfile";
import CreateCar from "../screens/CreateCar";
import YourHistory from "../screens/YourHistory";

const Stack = createStackNavigator();

export default function HomeStack(){
    return(
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name ='Home' component={Homepage} options={{ headerShown: false ,animationEnabled: false}}/>
        <Stack.Screen name ='Profile' component={YourProfile}options={{ headerShown: false ,animationEnabled: false}}/>
        <Stack.Screen name ='History' component={YourHistory} options={{ headerShown: false ,animationEnabled: false}}/>
        <Stack.Screen name = 'Map' component={Map} options={{ headerShown: false ,animationEnabled: false}}/>
        <Stack.Screen name = 'CreateCar' component={CreateCar} options={{ headerShown: false ,animationEnabled: false}}/>
    </Stack.Navigator>
    );
}