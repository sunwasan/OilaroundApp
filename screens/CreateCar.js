import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CarStorage from "../storages/CarStorage";
import FormInputStorage from "../storages/FormInputStorage";
import { Button, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Use } from "react-native-svg";

//Create Beautiful page that allows user to input car details and generate car id for them
// 1. Create a form that allows user to input car details such as car brand, car model, car year, car plate number, car color, car description
// 2. Create a button that allows user to submit the form
// 3. When user submit the form, generate a car id for them and store the car details in the aysnc storage and post it to the server
// 4. Navigate user to the YourProfile page

// Data to be stored in the server
// carId = models.CharField(max_length=100)
// carBrand = models.CharField(max_length=100)
// carModel = models.CharField(max_length=100)
// carPlateNumber = models.CharField(max_length=100)
// carDescription = models.CharField(max_length=100)

export default function CreateCar() {
  const navigation = useNavigation();

  const [carData, setCarData] = useState([{}]);
  const [profileData, setProfileData] = useState([{}]);
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carPlateNumber, setCarPlateNumber] = useState("");
  const [carDescription, setCarDescription] = useState("");
  const [localCarData, setLocalCarData] = useState([{}]);

  const loadCarData = async () => {
    fetch("http://192.168.137.1:8000/api/cardata/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch("http://192.168.137.1:8000/api/carprofile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const localdata = CarStorage.readItems();
    setLocalCarData(localdata);
  };

  const loadFormData = async () => {
    const data = await FormInputStorage.readItems();
    const savedCarBrand = data.carBrand;
    const savedCarModel = data.carModel;
    const savedCarPlateNumber = data.carPlateNumber;
    const savedCarDescription = data.carDescription;

    if (savedCarBrand !== null) setCarBrand(savedCarBrand);
    if (savedCarModel !== null) setCarModel(savedCarModel);
    if (savedCarPlateNumber !== null) setCarPlateNumber(savedCarPlateNumber);
    if (savedCarDescription !== null) setCarDescription(savedCarDescription);
  };

  const saveFormData = async () => {
    const data = {
      carBrand: carBrand,
      carModel: carModel,
      carPlateNumber: carPlateNumber,
      carDescription: carDescription,
    };
    FormInputStorage.writeItems(data);
  };

  useEffect(() => {
    loadFormData();
    loadCarData();
  }, []);
  useEffect(() => {
    saveFormData();
  }, [carBrand, carModel, carPlateNumber, carDescription]);

  /* -------------------------------------------------------------------------- */

  const handleCreateCar = async () => {
    // Generate car id
    const carId = Math.random().toString(36).substring(2, 11);
    const carDetails = {
      carId: carId,
      carBrand: carBrand,
      carModel: carModel,
      carPlateNumber: carPlateNumber,
      carDescription: carDescription,
      carDataId: carBrand.toLowerCase() + "_" + carModel.toLowerCase(),
    };

    const allStorageData = await CarStorage.readItems();
    if (allStorageData === null) {
      await CarStorage.writeItems([carDetails]);
    } else {
      const newData = [...allStorageData, carDetails];
      await CarStorage.writeItems(newData);
    }

    console.log("All storage data:", allStorageData);
    // Post car details to the server
    fetch("http://192.168.137.1:8000/api/carprofile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId: carId.toString(),
        carBrand: carBrand.toString(),
        carModel: carModel.toString(),
        carPlateNumber: carPlateNumber.toString(),
        carDescription: carDescription.toString(),
        carDataId:
          carBrand.toString().toLowerCase() +
          "_" +
          carModel.toString().toLowerCase(),
      }),
    });

    // Clear form input
    FormInputStorage.writeItems({
      carBrand: "",
      carModel: "",
      carPlateNumber: "",
      carDescription: "",
    });

    navigation.navigate("Profile");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Create Car</Text>
      <View style={{ width: "80%", flexDirection: "column" }}>
        <Text style={{ color: "grey" }}>Car Brand</Text>
        <Picker
          selectedValue={carBrand}
          onValueChange={(itemValue, itemIndex) => setCarBrand(itemValue)}
        >
          <Picker.Item label="Select Car Brand" value="" />
          {carData.map((item, index) => (
            <Picker.Item
              label={item.carBrand}
              value={item.carBrand}
              key={index}
            />
          ))}
        </Picker>
        <Text style={{ color: "grey" }}>Car Model</Text>
        <Picker
          selectedValue={carModel}
          onValueChange={(itemValue, itemIndex) => setCarModel(itemValue)}
        >
          <Picker.Item label="Select Car Model" value="" />
          {carData
            .filter((item) => item.carBrand === carBrand)
            .map((item, index) => (
              <Picker.Item
                label={item.carModel}
                value={item.carModel}
                key={index}
              />
            ))}
        </Picker>
        <Text style={{ color: "grey" }}>Car Plate Number</Text>
        <TextInput
          value={carPlateNumber}
          onChangeText={(text) => setCarPlateNumber(text)}
        />
        <Text style={{ color: "grey" }}>Car Description</Text>
        <TextInput
          value={carDescription}
          onChangeText={(text) => setCarDescription(text)}
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            title="Back"
            onPress={() => navigation.navigate("Profile")}
            color={"grey"}
          />
          <View style={{ marginLeft: 10 }}>
            <Button title="Submit" onPress={handleCreateCar} color={"green"} />
          </View>
        </View>
      </View>
    </View>
  );
}
