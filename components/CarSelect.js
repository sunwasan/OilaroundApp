import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

export default function CarSelect() {
  const [country, setCountry] = useState(null);
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
  });

  const local_data = [
    {
      value: "1",
      lable: "Suzuki Ciaz",
      image: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/car.png"),
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
      value: "2",
      lable: "Toyota Camry",
      image: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/camry.png"),
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
      image: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/bmw.png"),
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
      image: require("C:/Users/User/university/mobile/OilaroundApp/assets/oillogo/car.png"),
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
  const [carImage, setCarImage] = useState(local_data[0]["image"]); // [1,2,3,4

  return (
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
  );
}
