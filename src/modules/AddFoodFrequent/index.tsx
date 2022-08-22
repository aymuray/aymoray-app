import Header from "components/Header";
import ItemFood from "components/ItemFood";
import React from "react";
import { FlatList } from "react-native";
import { View, Text, Colors, Image, Assets } from "react-native-ui-lib";
const AddFoodFrequent = () => {
  const DATA: readonly any[] | null | undefined = [1, 2, 3];
  return (
    <View flex backgroundColor={Colors.background}>
      <Header title="Frequent" back />
      <FlatList
        data={DATA}
        renderItem={({}) => (
          <View backgroundColor={Colors.white} marginH-16 marginB-16>
            <ItemFood />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingTop: 16,
        }}
      />
    </View>
  );
};

export default AddFoodFrequent;
