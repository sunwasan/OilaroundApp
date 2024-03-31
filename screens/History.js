import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Oilcard from "../components/Oilcard";
import { useEffect, useState } from "react";
import GenerateTable from "../components/GenerateTable";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomNavBar from "../components/BottomNavBar";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";

export default function History() {
  const [selected, setSelected] = useState("");
  const [selectedStation, setSelectedStation] = useState("station1");

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={{
          ...StyleSheet.absoluteFillObject,
          elevation: 0,
          zIndex: 0,
          flex: 1,
        }}
        colors={["blue", "purple"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.3, y: 0 }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            height: "100%",
            zIndex: 1,
            elevation: 0,
            justifyContent: "flex-end",
            marginTop: "10%",
          }}
        >
          <View
            style={{
              marginHorizontal: 20,
              justifyContent: "flex-start",
              marginBottom: "35%",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Refuel History
            </Text>
            <Calendar
              onDayPress={(day) => {
                setSelected(day.dateString);
                console.log(selected);
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
                "2024-03-01": {
                  selected: true,
                  selectedColor: "#EF4E8A",
                },
                "2024-03-02": { marked: true },
                "2024-03-03": {
                  selected: true,
                  selectedColor: "#EF4E8A",
                },
              }}
            />

            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Amount (THB)
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 5,
                    width: "50%",
                    marginLeft: 20,
                  }}
                  placeholder="   Enter text"
                  onChangeText={(text) => {
                    // handle text input change
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Liters (L)
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 5,
                    width: "50%",
                    marginHorizontal: 10,
                  }}
                  placeholder="   Enter text"
                  onChangeText={(text) => {
                    // handle text input change
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Gas Type
                </Text>
                <Picker
                  style={{ width: "50%" }}
                  selectedValue={selectedStation}
                  onValueChange={(itemValue) => setSelectedStation(itemValue)}
                >
                  <Picker.Item label="Station 1" value="station1" />
                  <Picker.Item label="Station 2" value="station2" />
                  <Picker.Item label="Station 3" value="station3" />
                </Picker>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Station Name
                </Text>
                <Picker
                  style={{ width: "50%" }}
                  selectedValue={selectedStation}
                  onValueChange={(itemValue) => setSelectedStation(itemValue)}
                >
                  <Picker.Item label="Station 1" value="station1" />
                  <Picker.Item label="Station 2" value="station2" />
                  <Picker.Item label="Station 3" value="station3" />
                </Picker>
              </View>
              <Button title="Submit" />
            </View>
          </View>
        </View>
      </LinearGradient>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <BottomNavBar current_page="History" />
      </View>
    </View>
  );
}
