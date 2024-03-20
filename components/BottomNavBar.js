import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

export default function BottomNavBar() {
  const navigation = useNavigation();
  const [ClickedButton, setClicked] = useState("");
  const handlePress = (button) => {
    setClicked(button);
    navigation.navigate(button);
  };
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    // <View style={{ justifyContent: "flex-end" }}>
      <View
        style={{
          backgroundColor: "white",
          width: windowWidth * 0.9,
          margin: windowWidth * 0.05,
          height: windowHeight * 0.08,
          borderRadius: 10,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.48,
          shadowRadius: 11.95,

          elevation: 18,
          justifyContent: "center",
          //   flex:1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            // margin: 10,
          }}
        >
          <IconNav
            title={"Maps"}
            name={"map"}
            onPress={handlePress}
            ClickedButton={ClickedButton}
          />
          <IconNav
            title={"History"}
            name={"book"}
            onPress={handlePress}
            ClickedButton={ClickedButton}
          />

          <TouchableOpacity>
            <View style={styles.circle}>
              <FontAwesome name="home" color="white" size={30} />
            </View>
          </TouchableOpacity>

          <IconNav
            title={"Setting"}
            name={"gear"}
            onPress={handlePress}
            ClickedButton={ClickedButton}
          />
          <IconNav
            title={"Profile"}
            name={"user-circle"}
            onPress={handlePress}
            ClickedButton={ClickedButton}
          />
        </View>
      </View>
  );
}
const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25, // Make it half of width and height for a perfect circle
    backgroundColor: "#4066E0",
    marginBottom: 60, // This might need adjustment based on your layout
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 100,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 10,
  },
  icon: {},
});

function IconNav(props) {
  return (
    <View style={{ alignItems: "center", marginVertical: 10 }}>
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={() => props.onPress(props.title)}
      >
        <FontAwesome
          name={props.name}
          color={(props.title === props.ClickedButton) & (props.title != 'Profile') ? "#4066E0" : "grey"}
          size={30}
        />
        <Text>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}
