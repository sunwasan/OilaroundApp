import React from "react";
import * as Location from "expo-location";

const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  // console.log(status);
  if (status !== "granted") {
    // console.log("Permission to access location was denied");
    return false;
  }
  let location = await Location.getCurrentPositionAsync({});
  // console.log(location);
  if (location) {
    return location;
  } else {
    return false;
  }
};

export default { getLocation };


