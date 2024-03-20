import { Image, Text, View } from "react-native";

export default function Addrow(props) {
  const [frst, sec] = [
    parseFloat(props.today_price),
    parseFloat(props.tmr_price),
  ];
  const diff = sec - frst;
  let price_color;
  let out;

  if (diff < 0) {
    price_color = "green";
    const abs_diff = Math.abs(diff);
    out = sec.toFixed(2) + " 🟢 " + abs_diff.toFixed(2);
  } else if (diff > 0) {
    price_color = "red";
    out = sec.toFixed(2) + " 🔴 " + diff.toFixed(2);
  } else {
    price_color = "black";
    out = sec.toFixed(2) + "        ";
  }

  return (
    <View
      style={{
        flex: 1,
        height: 60,
        width: 400,
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        // marginTop:20,
        marginBottom: 30,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        // paddingHorizontal:30
        marginHorizontal:3
      }}
    >
      <Text
        style={{
          paddingHorizontal: 20,
          flex: 1,
          fontSize: 15,
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {props.oil_name}
      </Text>
      <Text
        style={{
          flex: 1,
          fontSize: 15,
          justifyContent: "center",
          paddingLeft: 40,
        }}
      >
        {props.today_price}
      </Text>
      <Text
        style={{
          paddingHorizontal: 20,
          flex: 1,
          fontSize: 15,
          color: price_color,
          justifyContent: "flex-end",
        }}
      >
        {out}
      </Text>
    </View>
  );
}
