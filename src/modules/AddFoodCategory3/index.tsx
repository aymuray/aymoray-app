import Header from "components/Header";
import ItemFood from "components/ItemFood";
import { bottom, shadow } from "config/scaleAccordingToDevice";
import React from "react";
import { FlatList } from "react-native";
import { View, Colors, Button, Assets } from "react-native-ui-lib";
const AddFoodCategory3 = () => {
  const DATA = [
    {
      img: Assets.icons.bread1,
      num: 867,
      title: "Baguettes & Bagels",
      unit: "food",
    },
    {
      img: Assets.icons.bread2,
      num: 793,
      title: "Crackers",
      unit: "food",
    },
    {
      img: Assets.icons.bread3,
      num: 587,
      title: "Croissants & Pastries",
      unit: "food",
    },
    {
      img: Assets.icons.bread4,
      num: 360,
      title: "Dark Bread",
      unit: "food",
    },
    {
      img: Assets.icons.bread5,
      num: 365,
      title: "Other Bread",
      unit: "food",
    },
    {
      img: Assets.icons.bread6,
      num: 404,
      title: "White Bread",
      unit: "food",
    },
    {
      img: Assets.icons.bread7,
      num: 243,
      title: "Soda bread",
      unit: "food",
    },
    {
      img: Assets.icons.bread8,
      num: 649,
      title: "Biscuits",
      unit: "food",
    },
  ];
  return (
    <View flex backgroundColor={Colors.background}>
      <Header
        title="Crackers"
        back
        btnRight={
          <Button
            iconSource={Assets.icons.ic_search}
            link
            color={Colors.color28}
          />
        }
      />
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View
            marginH-16
            marginB-16
            backgroundColor={Colors.white}
            style={shadow}
          >
            <ItemFood item={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: bottom,
        }}
      />
    </View>
  );
};

export default AddFoodCategory3;
