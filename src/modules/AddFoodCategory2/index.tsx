import { useNavigation } from "@react-navigation/core";
import Header from "components/Header";
import ItemFoodCategory from "components/ItemFoodCategory";
import Routes from "config/Routes";
import { bottom } from "config/scaleAccordingToDevice";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { View, Text, Colors, Button, Assets } from "react-native-ui-lib";
const AddFoodCategory2 = () => {
  const { navigate } = useNavigation();
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
        title="Bread & Bakery"
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
            style={{
              marginHorizontal: 16,
            }}
          >
            <ItemFoodCategory
              item={item}
              onPress={() => {
                navigate(Routes.AddFoodCategory3);
              }}
            />
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

export default AddFoodCategory2;
