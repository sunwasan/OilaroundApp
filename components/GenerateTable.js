import { FlatList, ScrollView, Text, View } from "react-native";
import Addrow from "./Row";
import { useEffect, useState } from "react";
import seedrandom from "seedrandom";

export default function GenerateTable(props) {
  let oils = Object.keys(props.station_data || {});

  // Define your seed
  const seed = "42";

  // Seed the random number generator
  seedrandom(seed, { global: true });
  const randomNumbers = [];
  for (let i = 0; i < oils.length; i++) {
    const randomNumber = Math.random() * 2 - 1;
    randomNumbers.push(randomNumber);
  }
  return (
    <View style = {{height:'80%'}}>
      <View
        style={{
          height: 45,
          width: 400,
          backgroundColor: "white",
          elevation: 10,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.55,
          shadowRadius: 3.84,
          marginTop: 100,
          marginHorizontal: 20,
          justifyContent: "space-between",
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 4,
          borderColor: "grey",
          overflow: "hidden",
          maxHeight: 100,
          marginTop: "10%",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>น้ำมัน</Text>
        <Text style={{ fontWeight: "bold" }}>วันนี้</Text>
        <Text style={{ fontWeight: "bold" }}>วันพรุ่งนี้</Text>
      </View>
        <View
          style={{
            paddingTop:10,
            alignItems: "center",
            marginBottom: "1%",
          }}
        >
          <FlatList
            data={oils}
            renderItem={({ item, index }) => {
              let oil_detail = props.station_data[item];
              return (
                <Addrow
                  oil_name={oil_detail["name"]}
                  today_price={Number(oil_detail["price"])}
                  tmr_price={Number(oil_detail["price"]) + randomNumbers[index]}
                />
              );
            }}
          />
        </View>
      </View>
  );
}
