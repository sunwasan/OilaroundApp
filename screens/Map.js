import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MyMapView from "../components/MapView";
import GPS from "../helper/GPS";
import { Picker } from "@react-native-picker/picker";
import BottomNavBar from "../components/BottomNavBar";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [selected_station, setSelected_station] = useState("all");
  //ACTION WHEN ENTER SCREENS
  const onLoad = async () => {
    let loc = await GPS.getLocation();
    if (loc) {
      //console.log("Location : ", loc);
      setLocation(loc);
    }
  };
  useEffect(() => {
    console.log("ENTER SCREEN");
    onLoad();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>Map</Text>
      <Picker
        selectedValue={selected_station}
        onValueChange={(itemValue, itemIndex) => setSelected_station(itemValue)}
        value={selected_station}
      >
        <Picker.Item label="All Station" value="all" color="grey" />
        <Picker.Item label="Bangchak" value="bangchak" />
        <Picker.Item label="PT" value="pt" />
        <Picker.Item label="PTT" value="ptt" />
        <Picker.Item label="Esso" value="esso" />
      </Picker>
      <MyMapView location={location} selected_station={selected_station} />
      <BottomNavBar current_page="Map" />
    </View>
  );
}
