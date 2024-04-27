import { Image, Text, View } from "react-native";

export default function Oilcard(props) {
  return (
    <View
      style={{
        // flex:1,
        backgroundColor: "white",
        // height: 100,
        // width: 250,
        height:props.height,
        width:props.width,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 2,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        alignContent:"center",
        marginHorizontal:5,
        zIndex:1
      }}
    >
      <Image
        source={props.img_path} // Assuming props.img_path is a valid URI or local resource number
        resizeMode="cover"
        style={{  height: 70, width:70 , justifyContent:'flex-start', marginHorizontal:20}}
      />
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {props.name_en}
        </Text>
        <Text style={{ fontSize: 15 }}>{props.name_th}</Text>
      </View>
    </View>
  );
}
