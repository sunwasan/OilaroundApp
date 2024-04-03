// Remove unused imports
import { Dimensions } from "react-native";
import MapView from "react-native-maps";
import StationMarkers from "./StationMarker";

export default function MyMapView(props) {
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;

    const station_locs = [
        {'station':'pt', 'latitude': 14.089878983355591,  'longitude': 100.5700664798011},
        {'station':'ptt', 'latitude': 14.068029710410112,  'longitude':  100.6054760448889},
        {'station':'ptt', 'latitude':14.075206254929475, 'longitude':100.61771211861937},
        {'station':'esso', 'latitude':14.057986520785947, 'longitude':100.6188498293498},
        {'station':'esso', 'latitude':14.058548448892815, 'longitude':100.61323080780245},
        {'station':'pt','latitude':14.04922315157947, 'longitude':100.6188956328171},
        {'station':'bangchak','latitude':14.042395460932392, 'longitude':100.6207839080934},
        {'station':'ptt','latitude':14.033569119917034, 'longitude':100.61752234221453},
        {'station':'pt','latitude':14.027782734323617,'longitude': 100.62408078727302},
        {'station':'esso','latitude':14.065646353428617, 'longitude':100.6234921122699},
        {'station':'ptt','latitude':14.06583340200924, 'longitude':100.62587619352979},
        {'station':'pt','latitude':14.064762121703737, 'longitude':100.62631444376139},
        {'station':'ptt','latitude':14.073732253833874, 'longitude':100.61727443272616}
    ];

    if (props.location && props.location.coords.latitude !== undefined && props.location.coords.longitude !== undefined) {
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
