import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Modal from "react-native-modal";

export default function ConfirmRemove({ open, onConfirm, onClose, text }) {
  return (
    <Modal isVisible={open} onBackdropPress={onClose}>
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
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{text}</Text>
          </View>

          <View style={{ flexDirection: "row", width: "100%" }}>
            <View style={{ marginRight: 10 }}>
              <Button title="Yes" onPress={onConfirm} />
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
