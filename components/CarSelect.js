import React, { useEffect, useState } from "react";
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


  const [local_data, setLocal_data] = useState([]); // [1,2,3,4

  const onLoad = () => {
    fetch("http://192.168.137.1:8000/api/userdata/",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    }).then((response) => response.json())
    .then((data) => {
      setLocal_data(data);
    }
    ).catch((error) => {
      console.error("Error:", error);
    });
  }
  useEffect(() => {
    onLoad();
  }, []);

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
