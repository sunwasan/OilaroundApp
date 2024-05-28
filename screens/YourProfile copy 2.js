import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Oilcard from "../components/Oilcard";
import React, { useEffect, useState } from "react";
import GenerateTable from "../components/GenerateTable";
import { SelectCountry } from "react-native-element-dropdown";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart, BarChart } from "react-native-chart-kit";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import CarSelect from "../components/CarSelect";
import CarStorage from "../storages/CarStorage";
import { Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Profile() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModal] = useState(false);
  const [removeModalVisible, setRemoveModal] = useState(false);

  const [carDataId, setCarDataId] = useState("");
  const [carData, setCarData] = useState([]); // [carId, carName, carModel, carYear, carImage
  const [localCarData, setLocalCarData] = useState([]); // [carId, carName, carModel, carYear, carImage
  const [carId, setCarId] = useState("");
  const [selectedCar, setSelectedCar] = useState("Please Select Your Car."); // [carId, carName, carModel, carYear, carImage

  const [carImage, setCarImage] = useState(
    "https://www.freeiconspng.com/img/45326"
  );
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carPlateNumber, setCarPlateNumber] = useState("");
  const [carDescription, setCarDescription] = useState("");

  const [historyData, setHistoryData] = useState([]); // [carId, carName, carModel, carYear, carImage

  const [selectedCarData, setSelectedCarData] = useState([]); // [carId, carName, carModel, carYear, carImage

  const styles = StyleSheet.create({
    dropdown: {
      // margin: 20,
      height: 50,
      width: 250,
      backgroundColor: "#EEEEEE",
      borderRadius: 22,
      borderWidth: 1,
      // paddingHorizontal: 8,
      // marginTop: "-30%",
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

  const getCarData = async (carDataId) => {
    await fetch(`http://192.168.137.1:8000/api/cardata/${carDataId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setCarData(responseJson);
        setCarImage(responseJson.carImage);
        const FilteredselectedCarData = localCarData.find(
          (car) => car.carDataId === carDataId
        );
        setCarBrand(FilteredselectedCarData.carBrand);
        setCarModel(FilteredselectedCarData.carModel);
        setCarPlateNumber(FilteredselectedCarData.carPlateNumber);
        setCarDescription(FilteredselectedCarData.carDescription);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getHistoryData = async () => {
    console.log("Getting data of ", carId);
    await fetch(`http://192.168.137.1:8000/api/carhistory/${carId}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.json().then((data) => {
        setHistoryData(data);
      })
    );
  };

  const onLoad = async () => {
    const localData = await CarStorage.readItems();
    const firstCarDataId = await localData[0].carDataId;
    const firstCarId = await localData[0].carId;
    setCarDataId(firstCarDataId);
    setLocalCarData(localData);
    setCarId(firstCarId);
    getCarData(firstCarDataId);

    const FilteredselectedCarData = localData.find(
      (car) => car.carDataId === firstCarDataId
    );
    setCarBrand(FilteredselectedCarData.carBrand);
    setCarModel(FilteredselectedCarData.carModel);
    setCarPlateNumber(FilteredselectedCarData.carPlateNumber);
    setCarDescription(FilteredselectedCarData.carDescription);
    setIsLoading(false);
  };

  useEffect(() => {
    getHistoryData();
  }, [carId]);

  useFocusEffect(
    React.useCallback(() => {
      onLoad();
      getCarData();
    }, [])
  );

  const handleAddButton = () => {
    setModal(!isModalVisible);
  };

  const handleCreateButton = () => {
    navigation.navigate("CreateCar");
  };

  const handleRemoveButton = () => {
    setRemoveModal(!removeModalVisible);
  };

  const removeModalContent = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex: 100,
        }}
      >
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
              marginVertical: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Are you sure you want to remove this car?
            </Text>
          </View>

          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ marginRight: 10 }}>
              <Button title="Yes" onPress={removeData} />
            </View>
            <View>
              <Button color="grey" title="No" onPress={handleRemoveButton} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const removeData = async () => {
    const allLocalCarData = localCarData;
    const filteredLocalCarData = allLocalCarData.filter(
      (car) => car.carId !== carId
    );
    // console.log(filteredLocalCarData);

    await CarStorage.writeItems(filteredLocalCarData);

    setLocalCarData(filteredLocalCarData);
    if (filteredLocalCarData.length === 0) {
      setCarId("");
      setCarBrand("");
      setCarModel("");
      setCarPlateNumber("");
      setCarDescription("");
      setCarImage("https://www.freeiconspng.com/img/45326");
    } else {
      const firstCarDataId = await filteredLocalCarData[0].carDataId;
      const firstCarId = await filteredLocalCarData[0].carId;

      setCarId(firstCarId);
      getCarData(firstCarDataId);
    }

    setRemoveModal(!removeModalVisible);

    // Check if it remove from CarStorage
  };

  const AddModalContent = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex: 100,
        }}
      >
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
              marginVertical: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Liters (L)</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                width: "50%",
                marginLeft: 20,
                paddingHorizontal: 20,
              }}
              type="char"
              placeholder="Car ID"
              onChangeText={(text) => {
                setCarId(text);
              }}
            />
          </View>

          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ marginRight: 10 }}>
              <Button title="Submit" onPress={handleAddButton} />
            </View>
            <View>
              <Button color="grey" title="Cancel" onPress={handleAddButton} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const GenerateLineChart = () => {
    const data = {
      labels: historyData.map((item) => item.date),
      datasets: [
        {
          data: historyData.map((item) => item.amount),
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
    // data that have the same date will be sum up
    // label will be unique date and data will be sum of amount of that date
    // save it to sumData

    const groupedData = historyData.reduce((acc, item) => {
      acc[item.date] = (acc[item.date] || 0) + item.amount;
      return acc;
    }, {});

    const sumData = {
      labels: Object.keys(groupedData),
      datasets: [
        {
          data: Object.values(groupedData),
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };

    if (historyData.length === 0) {
      return <Text>No Data for {carId}</Text>;
    }
    {
      return (
        <LineChart
          data={sumData}
          width={Dimensions.get("window").width - 120}
          height={170}
          yAxisLabel="THB "
          chartConfig={{
            // backgroundGradientFrom: "rgb(245,245,245)",
            // backgroundGradientTo: "rgb(245,245,245)",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
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
            marginLeft: 10,
            paddingBottom: 20,
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      );
    }
  };

  const ChooseCar = () => {
    // using select picker for car selection show car brand and model (car plate number) in the dropdown list when select set the car id to the state
    // if array is empty show "Please Select Your Car."
    if (!isLoading) {
      return (
        <View>
          <Picker
            style={styles.dropdown}
            selectedValue={selectedCar}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedCar(itemValue);
              const carDataId = localCarData[itemIndex].carDataId;
              getCarData(carDataId);
              setCarId(itemValue);
              getHistoryData();
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
    } else {
      return (
        <View>
          <Picker
            style={styles.dropdown}
            selectedValue={selectedCar}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedCar(itemValue);
              const carDataId = localCarData[itemIndex].carDataId;
              getCarData(carDataId);
              setCarId(itemValue);
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
    }
  };

  if (!isLoading) {
    try {
      return (
        <View style={{ flex: 1, elevation: 0 }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
          >
            <AddModalContent />
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={removeModalVisible}
          >
            {removeModalContent()}
          </Modal>

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
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                    paddingBottom: 10,
                    alignSelf: "center",
                    flexDirection: "row",
                  }}
                >
                  My Profile
                </Text>
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      marginHorizontal: 50,
                    }}
                  >
                    <ChooseCar />
                  </View>
                  {/* Button */}
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: 10,
                      marginLeft: "20%",
                    }}
                  >
                    <View style={{ flexDirection: "column", marginLeft: 20 }}>
                      <TouchableOpacity onPress={handleRemoveButton}>
                        <View
                          style={{
                            flexDirection: "column",
                            alignContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FontAwesome name="trash" size={24} color="red" />

                          <Text style={{ color: "grey", marginHorizontal: 10 }}>
                            Remove
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <TouchableOpacity onPress={handleAddButton}>
                        <View
                          style={{
                            flexDirection: "column",
                            alignContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FontAwesome name="plus" size={24} color="green" />

                          <Text style={{ color: "grey", marginHorizontal: 10 }}>
                            Add
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <TouchableOpacity onPress={handleCreateButton}>
                        <View
                          style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FontAwesome name="pencil" size={24} color="green" />

                          <Text style={{ color: "grey", marginHorizontal: 10 }}>
                            Create
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                          <Text style={{ color: "black" , fontSize:15, fontWeight:'bold', margin:10, }}>Spending History (THB)</Text>
                  <GenerateLineChart />
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
                source={{ uri: carImage }}
              />

              {/* Car Detail */}
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -90,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {carBrand} {carModel}
                </Text>
                <Text style={{ color: "grey" }}>{carPlateNumber}</Text>
                <Text style={{ color: "grey" }}>{carDescription}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      );
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={{ flex: 1, elevation: 0 }}>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <AddModalContent />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={removeModalVisible}
      >
        {removeModalContent()}
      </Modal>

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
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 20,
                paddingBottom: 10,
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              My Profile
            </Text>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  marginLeft: "30%",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <TouchableOpacity onPress={handleAddButton}>
                    <View
                      style={{
                        flexDirection: "column",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome name="plus" size={24} color="green" />

                      <Text style={{ color: "grey", marginHorizontal: 10 }}>
                        Add
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <TouchableOpacity onPress={handleCreateButton}>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome name="pencil" size={24} color="green" />

                      <Text style={{ color: "grey", marginHorizontal: 10 }}>
                        Create
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
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
        ></View>
      </LinearGradient>
    </View>
  );
}
