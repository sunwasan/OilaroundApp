import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

export default function EditNoteModal({
  open,
  setEditNoteModal,
  noteId,
  carId,
  selected,
  load,
}) {
  let new_amount;
  let new_liters;
  let new_gastype;

  const ConfirmChange = async (new_amount, new_liters, new_gastype) => {
    const newHistory = {
      noteId: noteId,
      carId: carId,
      date: selected,
      amount: Number(new_amount),
      liters: Number(new_liters),
      gastype: new_gastype,
    };

    await fetch(
      `http://192.168.137.1:8000/api/carhistory/${carId}/${selected}/${noteId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHistory),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Note updated");
      })
      .catch((error) => {
        console.error("Failed to update note:", error);
      })
      .finally(() => {
        load();
        setEditNoteModal(false);
      });
  };

  const onClose = () => {
    setEditNoteModal(false);
  };

  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => {
        onClose;
      }}
    >
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
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Edit Note</Text>
          </View>
          {/* Input Amount , Liters and Gas Type */}
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
                new_amount = text;
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
              type="number"
              placeholder="Enter Litters"
              onChangeText={(text) => {
                new_liters = text;
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
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Gas Type</Text>
            <Picker
              style={{ width: "70%" }}
              selectedValue={new_gastype}
              onValueChange={(itemValue) => {
                new_gastype = itemValue;
              }}
            >
              <Picker.Item label="Select Gas Type" value="" color="grey" />
              <Picker.Item label="Gas 1" value="gas1" />
              <Picker.Item label="Gas 2" value="gas2" />
              <Picker.Item label="Gas 3" value="gas3" />
            </Picker>
          </View>

          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ marginRight: 10 }}>
              <Button
                title="Yes"
                onPress={() => {
                  ConfirmChange(new_amount, new_liters, new_gastype);
                }}
              />
            </View>
            <View>
              <Button color="grey" title="No" onPress={onClose} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
