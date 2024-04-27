import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Oilcard from "../components/Oilcard";
import { useEffect, useState } from "react";
import GenerateTable from "../components/GenerateTable";
import { SelectCountry } from "react-native-element-dropdown";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart, BarChart } from "react-native-chart-kit";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import CarSelect from "../components/CarSelect";
export default function Profile() {
  const navigation = useNavigation();
  const station_img = {
    ptt: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/ptt.png"),
    bangchak: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/bangchak.png"),
    shell: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/shell.png"),
    caltex: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/caltex.png"),
  };
  const [country, setCountry] = useState("1");
  const styles = StyleSheet.create({
    dropdown: {
      margin: 20,
      height: 50,
      width: 250,
      backgroundColor: "#EEEEEE",
      borderRadius: 22,
      paddingHorizontal: 8,
      marginTop: "-30%",
    },
    imageStyle: {
      width: 24,
      height: 24,
      borderRadius: 12,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      marginLeft: 8,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    detail: {
      marginHorizontal: 25,
      fontWeight: "bold",
    },
  });
  const index = Number(country) - 1;

  const local_data = [
    {
      value: "1",
      lable: "Suzuki Ciaz",
      image: require("C:/Users/User/university/mobile/OilaroundApp/assets/car/car.png"),
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        chart_data: [
          {
            line_data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
            bar_data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      },
      favorite_station: ["bangchak", "ptt"],
    },
    {
      value: "2",
      lable: "Toyota Camry",
      image: require("C:/Users/User/university/mobile/OilaroundApp/assets/car/camry.png"),
      favorite_station: ["shell", "ptt"],
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        chart_data: [
          {
            line_data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
            bar_data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      },
    },
    {
      value: "3",
      lable: "BMW",
      image: require("C:/Users/User/university/mobile/OilaroundApp/assets/car/bmw.png"),
      favorite_station: ["shell", "ptt"],
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        chart_data: [
          {
            line_data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
            bar_data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      },
    },
    {
      value: "4",
      lable: "Mercedes",
      image: require("C:/Users/User/university/mobile/OilaroundApp/assets/car/suzuki.png"),
      favorite_station: ["shell", "ptt"],
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        chart_data: [
          {
            line_data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
            bar_data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      },
    },
  ];
  const [carImage, setCarImage] = useState(local_data[0]["image"]); 

  return (
    <View style={{ flex: 1, elevation: 0 }}>
      <BackButton />
      <LinearGradient
        style={{ ...StyleSheet.absoluteFillObject, elevation: 0 }}
        colors={["blue", "purple"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.3, y: 0 }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 350,
            height: 500,
            borderRadius: 20,
            marginHorizontal: 50,
            marginTop: 50,
          }}
        >
          {/* Detail */}
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingTop: 10,
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 20,
                paddingBottom: 10,
                alignSelf: "center",
              }}
            >
              My Profile
            </Text>
            <Text style={styles.detail}>History Spending</Text>
            <LineChart
              data={{
                labels: local_data[index]["data"]["labels"],
                datasets: [
                  {
                    data: local_data[index]["data"][
                      "chart_data"
                    ][0]["line_data"],
                  },
                ],
              }}
              width={300} // from react-native
              height={100}
              yAxisLabel=""
              yAxisSuffix=" ฿"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundGradientFrom: "rgb(241,243,244)",
                backgroundGradientTo: "rgb(241,243,244)",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(19,38,195, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(19,38,195, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "3",
                  strokeWidth: "0.1",
                  stroke: "white",
                },
              }}
              bezier
              style={{
                marginHorizontal: 20,
                marginVertical: 8,
                borderRadius: 15,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.detail}>Oil Type :</Text>
              <Text style={{ fontWeight: "bold", color: "navy" }}>
                Gasohol E20
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Text style={styles.detail}>Monthly Re-fuel</Text>
            </View>
            <BarChart
              style={{
                marginHorizontal: 20,
                marginVertical: 8,
                borderRadius: 15,
              }}
              chartConfig={{
                backgroundGradientFrom: "rgb(241,243,244)",
                backgroundGradientTo: "rgb(241,243,244)",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(19,38,195, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(19,38,195, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "3",
                  strokeWidth: "0.1",
                  stroke: "blue",
                },
              }}
              data={{
                labels: local_data[index]["data"]["labels"],
                datasets: [
                  {
                    data: local_data[index]["data"]["chart_data"][0][
                      "bar_data"
                    ],
                  },
                ],
              }}
              width={300}
              height={100}
              yAxisLabel=""
              verticalLabelRotation={30}
            />
            <Text style={styles.detail}>Favorite Station</Text>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 25,
                paddingVertical: 10,
              }}
            >
              <Image
                style={{ height: 60, width: 60 }}
                resizeMode="contain"
                source={require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/bangchak.png")}
              />
              <Image
                style={{ height: 60, width: 60 }}
                resizeMode="contain"
                source={require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/ptt.png")}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderTopRightRadius: 100,
            borderTopLeftRadius: 100,
            height: 200,
            marginTop: 20,
            alignItems: "center",
            padding: 10,
          }}
        >
          <Image
            style={{ height: 400, width: 400, marginTop: -200 }}
            resizeMode="contain"
            source={carImage}
          />
          <SelectCountry
            style={[styles.dropdown]}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            imageStyle={styles.imageStyle}
            iconStyle={styles.iconStyle}
            maxHeight={200}
            value={country}
            data={local_data}
            valueField="value"
            labelField="lable"
            imageField="image"
            placeholder="Select Car"
            searchPlaceholder="Search..."
            dropup={true}
            onChange={(e) => {
              setCountry(e.value);
              setCarImage(e.image);
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
