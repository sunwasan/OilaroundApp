import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Oilcard from "../components/Oilcard";
import { useEffect, useState } from "react";
import GenerateTable from "../components/GenerateTable";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomNavBar from "../components/BottomNavBar";

export default function Homepage() {
  const [lastestOil, setOil] = useState([]);
  const [stationShow, setStation] = useState("bcp");
  const [isPressed, setIsPressed] = useState("bcp");
  const [isMaxScroll, setIsMaxScroll] = useState(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const maxScrollX = (contentSize.width - layoutMeasurement.width) / 2;
    const currentScrollX = contentOffset.x;

    setIsMaxScroll(currentScrollX >= maxScrollX);
  };

  const getData = async () => {
    try {
      const response = await fetch("https://api.chnwt.dev/thai-oil-api/latest");
      const data = await response.json();
      const stations = data["response"]["stations"];
      setOil(stations);
      // console.log(Object.keys(stations));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const HandlePressed = (station) => {
    setStation(station);
    setIsPressed(station);
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={{ ...StyleSheet.absoluteFillObject, elevation: 0, zIndex: 0 }}
        colors={["blue", "purple"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.3, y: 0 }}
      >
        {/* OilCard Scroller */}
        <ScrollView
          horizontal={true}
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{
            flexDirection: "row",
            marginTop: 120,
            paddingHorizontal: isMaxScroll ? -10000 : 20,

            zIndex: 10,
            elevation: 10,
            // height:100,
            // maxHeight:2000
          }}
        >
          <TouchableOpacity
            onPress={() => HandlePressed("bcp")}
            style={{
              opacity: isPressed == "bcp" ? 1 : 0.7,
            }}
          >
            <Oilcard
              name_th={"บางจาก"}
              name_en={"Bangchak"}
              img_path={require("../assets/oillogo/bangchak.png")}
              height={isPressed == "bcp" ? 100 : 90}
              width={isPressed == "bcp" ? 250 : 240}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => HandlePressed("ptt")}
            style={{ opacity: isPressed == "ptt" ? 1 : 0.7 }}
          >
            <Oilcard
              name_th={"ปตท."}
              name_en={"PTT"}
              img_path={require("../assets/oillogo/ptt.png")}
              height={isPressed == "ptt" ? 100 : 90}
              width={isPressed == "ptt" ? 250 : 240}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => HandlePressed("shell")}
            style={{ opacity: isPressed == "shell" ? 1 : 0.7 }}
          >
            <Oilcard
              name_th={"เชลล์"}
              name_en={"Shell"}
              img_path={require("../assets/oillogo/shell.png")}
              height={isPressed == "shell" ? 100 : 90}
              width={isPressed == "shell" ? 250 : 240}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => HandlePressed("pt")}
            style={{ opacity: isPressed == "pt" ? 1 : 0.7 }}
          >
            <Oilcard
              name_th={"พีที"}
              name_en={"PT"}
              img_path={require("../assets/oillogo/pt.png")}
              height={isPressed == "pt" ? 100 : 90}
              width={isPressed == "pt" ? 250 : 240}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => HandlePressed("esso")}
            style={{ opacity: isPressed == "esso" ? 1 : 0.7 }}
          >
            <Oilcard
              name_th={"เอสโซ่"}
              name_en={"Esso"}
              img_path={require("../assets/oillogo/esso.png")}
              height={isPressed == "esso" ? 100 : 90}
              width={isPressed == "esso" ? 250 : 240}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => HandlePressed("caltex")}
            style={{ opacity: isPressed == "caltex" ? 1 : 0.7 }}
          >
            <Oilcard
              name_th={"คาลเท็กซ์"}
              name_en={"Caltex"}
              img_path={require("../assets/oillogo/caltex.png")}
              height={isPressed == "caltex" ? 100 : 90}
              width={isPressed == "caltex" ? 250 : 240}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => HandlePressed("susco")}
            style={{ opacity: isPressed == "susco" ? 1 : 0.7 }}
          >
            <Oilcard
              name_th={"ซัสโก"}
              name_en={"Susco"}
              img_path={require("../assets/oillogo/susco.png")}
              height={isPressed == "susco" ? 100 : 90}
              width={isPressed == "susco" ? 250 : 240}
            />
          </TouchableOpacity>
        </ScrollView>

        <View
          style={{
            backgroundColor: "white",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            height: "70%",
            // marginTop: -200,
            zIndex: 1,
            elevation: 0,
          }}
        >
          <View>
            <GenerateTable station_data={lastestOil[stationShow]} />
          </View>
        </View>
      </LinearGradient>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <BottomNavBar current_page="Home" />
      </View>
    </View>
  );
}
