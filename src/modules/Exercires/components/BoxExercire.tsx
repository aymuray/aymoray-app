import ItemExercire from "components/ItemExercire";
import { FONTS } from "config/FoundationConfig";
import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button, Assets, Colors, Image } from "react-native-ui-lib";

const BoxExercire = ({ title }) => {
  return (
    <View
      marginH-16
      marginB-16
      style={{
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}
      backgroundColor={Colors.white}
    >
      <View
        row
        paddingH-16
        paddingV-12
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Text H14 color28 uppercase>
          {title}
        </Text>
      </View>
      <View height={1} backgroundColor={Colors.line} />
      <ItemExercire />
      <View height={1} backgroundColor={Colors.line} />
      <ItemExercire />
      <View height={1} backgroundColor={Colors.line} />
      <ItemExercire />
      <View height={1} backgroundColor={Colors.line} />
      <ItemExercire />
      <View height={1} backgroundColor={Colors.line} />
      <ItemExercire />
      <View height={1} backgroundColor={Colors.line} />
    </View>
  );
};

export default BoxExercire;

const styles = StyleSheet.create({});
