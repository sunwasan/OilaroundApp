import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BottomNavBar from "../components/BottomNavBar";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import { FlatList } from "react-native-gesture-handler";
import CarStorage from "../storages/CarStorage";
import ConfirmRemove from "../components/ConfirmRemove";
import EditNoteModal from "../components/EditNoteModal";
import HistoryStorage from "../storages/HistoryStorage";

export default function YourHistory() {
  const [selected, setSelected] = useState("");

  const [amount, setAmount] = useState(0);
  const [liters, setLiters] = useState(0);
  const [gasType, setGasType] = useState("");

  const [history, setHistory] = useState([]);

  /* ------------------------------ Modal Status ------------------------------ */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRemoveNoteModal, setRemoveNoteModal] = useState(false);
  const [isEditNoteModal, setEditNoteModal] = useState(false);

  const [selectedCar, setSelectedCar] = useState("");
  const [carId, setCarId] = useState("");

  const [localCarData, setLocalCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [markedDates, setMarkedDates] = useState({});
  const [noteId, setNoteId] = useState("");
  let amounttemp;
  let literstemp;
  let gasTypetemp;

  const styles = StyleSheet.create({
    dropdown: {
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      width: "100%",
      paddingHorizontal: 20,
      marginBottom: 10,
    },
  });

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const load = async () => {
    let carid;
    const carData = await CarStorage.readItems();
    setLocalCarData(carData);

    if (selectedCar == "") {
      setCarId(carData[0].carId);
      carid = await carData[0].carId;
    } else {
      carid = selectedCar;
    }
    await fetch(`http://192.168.137.1:8000/api/carhistory/${carid}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHistory(data);
        const dateList = data.map((item) => item.date);
        setMarkedDates(dateList);


      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await load();
    };

    fetchData();
  }, [selectedCar ]);

  /* ------------------------------ Submit Button ----------------------------- */
  const sumbitHandle = async ( ) => {
    const newHistory = {
      //random create note id text mixed with number
      noteId: Math.random().toString(36).substring(2, 11),
      carId: carId,
      date: selected,
      amount: Number(amount),
      liters: Number(liters),
      gastype: gasType,
    };


    await fetch(`http://192.168.137.1:8000/api/addcarhistory/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHistory),
    });
    setHistory([...history, newHistory]);
    handleModal();

    await load();
  };

  /* ------------------------------ Remove Button ----------------------------- */
  const removeHandle = async () => {
    const updatedHistory =  await history.filter((item) => item.date !== selected);
    await setHistory(updatedHistory);
    await setMarkedDates(
      markedDates.filter((item) => item.date !== selected)
    );
    await fetch(`http://192.168.137.1:8000/api/carhistory/${carId}/${selected}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resposne) => {
      console.log("Note removed", resposne);

    }).finally(() => {
      load();
    }
    );

    setSelected(selected);

  };

  /* ------------------------------- Remove Note ------------------------------ */

  const removeNote = async (noteid) => {
    await fetch(
      `http://192.168.137.1:8000/api/carhistory/${carId}/${selected}/${noteid}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Note removed");
      })
      .catch((error) => {
        console.error("Failed to delete note:", error);
      })
      .finally(() => {
        load();
      });
  };

  /* --------------------------------- Picker --------------------------------- */
  const ChooseCar = () => {
    return (
      <View>
        <Picker
          style={styles.dropdown}
          selectedValue={selectedCar}
          onValueChange={(itemValue, itemIndex) => {
            const changeLoad = async () => {
              setSelectedCar(itemValue);
              setCarId(itemValue);
            };

            changeLoad();
          }}
        >
          {localCarData.map((item, index) => (
            <Picker.Item
              label={`${item.carBrand} ${item.carModel} (${item.carPlateNumber})`}
              value={item.carId}
              key={index}
            />
          ))}
        </Picker>
      </View>
    );
  };

  /* ------------------------------- Edit Modal ------------------------------- */

  /* -------------------------------------------------------------------------- */
  if (!isLoading) {
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
              <ChooseCar />
              <Calendar
                // when click on date color will change
                // color it red when date is selected

                onDayPress={(day) => {
                  setSelected(day.dateString);
                }}
                markedDates={{
                  ...markedDates.reduce(
                    (a, c) => {
                      a[c] = { selected: true, selectedColor: "#4066E0" };
                      return a;
                    },
                    {
                      [selected]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedDotColor: "orange",
                      },
                    }
                  ),
                }}
              />
              {/* ------------------------------- Add Button ------------------------------- */}
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

                {/* /* ---------------------------------- Modal --------------------------------- */}
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
                        type="number"
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
                        type="number"
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
                        onValueChange={(itemValue) => {
                          gasTypetemp = itemValue;
                          setGasType(itemValue);
                        }}
                      >
                        <Picker.Item
                          label="Select Gas Type"
                          value= ""
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
                            sumbitHandle()
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
                {/*  ------------------------------ Remove Button ----------------------------- */}
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
                    removeHandle(selected);
                  }}
                >
                  <Text style={{ color: "white" }}>-</Text>
                </TouchableOpacity>
              </View>
              {/*  ------------------------------ Info Section ------------------------------ */}
              <View style={{ height: "30%" }}>
                <FlatList
                  data={history.filter((item) => item.date == selected)}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        backgroundColor: "#EDF2FA",
                        padding: 10,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        marginTop: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        You :
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{ flexDirection: "column", marginLeft: 10 }}
                        >
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
                            <Text style={{ fontWeight: "bold" }}>
                              Gas Type :{" "}
                            </Text>
                            <Text>{item.gastype}</Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: "column",
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                              onPress={() => {
                                setEditNoteModal(true);
                                setNoteId(item.noteId);
                              }}
                            >
                              <FontAwesome
                                name="edit"
                                size={24}
                                color="grey"
                                marginRight={10}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setRemoveNoteModal(true);
                                setNoteId(item.noteId);
                              }}
                            >
                              <FontAwesome
                                name="trash"
                                size={24}
                                color="grey"
                              />
                            </TouchableOpacity>
                            <ConfirmRemove
                              open={isRemoveNoteModal}
                              onConfirm={() => {
                                removeNote(noteId);
                                setRemoveNoteModal(false);
                              }}
                              onClose={() => setRemoveNoteModal(false)}
                              text={
                                "Are you sure you want to remove this note?"
                              }
                            />

                            <EditNoteModal
                              open={isEditNoteModal}
                              setEditNoteModal={setEditNoteModal}
                              noteId={noteId}
                              carId={carId}
                              selected={selected}
                              load={load}
                            />
                          </View>
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
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}
