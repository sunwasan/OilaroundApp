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
import HistoryStorage from "../storages/HistoryStorage";
import Modal from "react-native-modal";
import { FlatList } from "react-native-gesture-handler";

export default function History() {
  const [selected, setSelected] = useState("");

  const [amount, setAmount] = useState(0);
  const [liters, setLiters] = useState(0);
  const [gasType, setGasType] = useState("");
  const [car, setCar] = useState("Toyota");

  const [history, setHistory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const load = async () => {
    const history = await HistoryStorage.readItems();
    setHistory(history);
  };
  useEffect(() => {
    load();
  }, []);
  const sumbitHandle = (selected, amount, liters, gasType, stationName) => {
    const newHistory = {
      car: car,
      date: selected,
      amount: amount,
      liters: liters,
      gasType: gasType,
      stationName: stationName,
    };
    setHistory([...history, newHistory]);
    HistoryStorage.writeItems([...history, newHistory]);
    handleModal();
  };
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
            justifyContent: "flex-start",
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
                ...history.reduce((acc, item) => {
                  acc[item.date] = { selected: true, selectedColor: "orange" };
                  return acc;
                }, {}),
              }}
            />
            <Picker>
              
            </Picker>
            {/* ------------------------------- Add Button ------------------------------- */ }
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#42BA8C",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 10,
                  alignSelf: "center",
                  marginRight: 10,
                  width: 30,
                }}
                onPress={() => {
                  handleModal();
                }}
              >
                <Text style={{ color: "white" }}>+</Text>
              </TouchableOpacity>
              <Modal isVisible={isModalVisible}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
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
                      Car
                    </Text>
                    <Picker
                      style={{ width: "70%" }}
                      selectedValue={car}
                      onValueChange={(itemValue) => setCar(itemValue)}
                    >
                      <Picker.Item
                        label="Select Car"
                        value={car}
                        color="grey"
                      />
                      <Picker.Item label="Suzuki Ciaz" value="Suzuki Ciaz" />
                      <Picker.Item label="Toyota Camry" value="Toyota Camry" />
                      <Picker.Item label="Honda Civic" value="Honda Civic" />
                      <Picker.Item label="BMW 3 Series" value="BMW 3 Serie" />
                      <Picker.Item
                        label="Mercedes-Benz C-Class"
                        value="Mercedes-Benz C-Class"
                      />
                    </Picker>
                  </View>
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
                        paddingHorizontal: 20,
                      }}
                      placeholder="Enter Amount"
                      type = "number"
                      onChangeText={(text) => {
                        setAmount(text);
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
                        marginLeft: 20,
                        paddingHorizontal: 20,
                      }}
                      type = "number"
                      placeholder="Enter Litters"
                      onChangeText={(text) => {
                        setLiters(text);
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
                      style={{ width: "70%" }}
                      selectedValue={gasType}
                      onValueChange={(itemValue) => setGasType(itemValue)}
                    >
                      <Picker.Item
                        label="Select Gas Type"
                        value=""
                        color="grey"
                      />
                      <Picker.Item label="Gas 1" value="gas1" />
                      <Picker.Item label="Gas 2" value="gas2" />
                      <Picker.Item label="Gas 3" value="gas3" />
                    </Picker>
                  </View>

                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={{ marginRight: 10 }}>
                      <Button
                        title="Submit"
                        onPress={() =>
                          sumbitHandle(
                            selected,
                            amount,
                            liters,
                            gasType,
                            // stationName,
                            car
                          )
                        }
                      />
                    </View>
                    <View>
                      <Button
                        color="grey"
                        title="Cancel"
                        onPress={handleModal}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
              {/*  ------------------------------ Remove Button ----------------------------- */ }
              <TouchableOpacity
                style={{
                  backgroundColor: "#F34747",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 10,
                  alignSelf: "center",
                  width: 30,
                  textAlign: "center",
                  alignContent: "center",
                }}
                onPress={() => {
                  const updatedHistory = history.filter(
                    (item) => item.date !== selected
                  );
                  setHistory(updatedHistory);
                  HistoryStorage.writeItems(history.filter((item) => item.date !== selected));
                }}
              >
                <Text style={{ color: "white" }}>-</Text>
              </TouchableOpacity>
            </View>
            {/*  ------------------------------ Info Section ------------------------------ */ }
            <View style={{ height: "30%" }}>
              <FlatList
                data={history.filter((item) => item.date === selected)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      backgroundColor: "#EDF2FA",
                      padding: 10,
                      paddingHorizontal: 20,
                      borderRadius: 20,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      You :
                    </Text>

                    <View style={{ flexDirection: "column", marginLeft: 10 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold" }}>
                          Amount (THB) :{" "}
                        </Text>

                        <Text>{item.amount.toLocaleString()} THB</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold" }}>
                          Liters (L) :{" "}
                        </Text>
                        <Text>{item.liters.toLocaleString()} L</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold" }}>Gas Type : </Text>
                        <Text>{item.gasType}</Text>
                      </View>

                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold" }}>Car : </Text>
                        <Text>{item.car}</Text>
                      </View>
                    </View>
                  </View>
                )}
              />
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

