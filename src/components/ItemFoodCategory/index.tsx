import { shadow } from "config/scaleAccordingToDevice";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Assets, Colors, Image, Text } from "react-native-ui-lib";
const ItemFoodCategory = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...shadow,
        marginBottom: 16,
        padding: 16,
        alignItems: "center",
        backgroundColor: Colors.white,
        flexDirection: "row",
      }}
      onPress={onPress}
    >
      <Image source={item.img} />
      <View marginH-16>
        <Text flex M18 color={item.active ? Colors.buttonLink : Colors.color28}>
          {item.title}
        </Text>
        <View row>
          <Image source={Assets.icons.ic_list} />
          <Text marginL-4 color6D R14>
            {item.num} {item.unit || "category"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemFoodCategory;
