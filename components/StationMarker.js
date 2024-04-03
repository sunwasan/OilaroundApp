import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { Marker } from "react-native-maps";

const logos = {
  pt: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/pt.png"),
  ptt: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/ptt.png"),
  esso: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/esso.png"),
  bangchak: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/bangchak.png"),
};

export default function StationMarkers(props) {
  const [logo, setLogo] = useState(null);
  let selected_station = props.station;
  if (selected_station === "all") {
    selected_station = null;
  }

  useEffect(() => {
    if (selected_station) {
      setLogo(logos[selected_station]);
    }
  }, [selected_station]);

  return props.data.map((item) => {
    if (selected_station) {
      if (item.station === selected_station) {
        return (
          <Marker
            coordinate={{
              latitude: Number(item.latitude),
              longitude: Number(item.longitude),
            }}
            title={item.station}
          >
            <Image source={logo} style={{ width: 30, height: 30 }} />
          </Marker>
        );
      }
    } else if (selected_station === null) {
      return (
        <Marker
          coordinate={{
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
          }}
          title={item.station}
        >
          <Image
            source={logos[item.station]}
            style={{ width: 30, height: 30 }}
          />
        </Marker>
      );
    }
    return null;
  });
}
