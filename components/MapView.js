// Remove unused imports
import { Dimensions } from "react-native";
import MapView from "react-native-maps";
import StationMarkers from "./StationMarker";
import { useEffect, useState } from "react";

export default function MyMapView(props) {
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;

  const [station_locs, setStationLocs] = useState([]); // [

  function onLoad() {
    fetch("http://192.168.137.1:8000/api/stationlocation/",
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }
        )
        .then((response) => response.json())
        .then((data) => {
            setStationLocs(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }
    useEffect(() => {
        onLoad();
    }, []);

  if (
    props.location &&
    props.location.coords.latitude !== undefined &&
    props.location.coords.longitude !== undefined
  ) {
    //DISPLAY MAP ON YOUR LOCATION
    return (
      <MapView
        style={{ width: width, height: height }}
        initialRegion={{
          latitude: props.location.coords.latitude,
          longitude: props.location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
      >
        <StationMarkers data={station_locs} station={props.selected_station} />
      </MapView>
    );
  }

  //DISPLAY DEFAULT MAP on 0,0
  return <MapView style={{ width: width, height: height }}></MapView>;
}
