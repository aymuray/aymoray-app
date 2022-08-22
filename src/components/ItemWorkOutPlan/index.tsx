import Tag from "components/Tag";
import React from "react";
import { View, Image, Text, Colors, Assets } from "react-native-ui-lib";
import SwipeableItem from "components/SwipeableItem/SwipeableItem";
const ItemWorkOutPlan = () => {
  return (
    <SwipeableItem>
      <View padding-16>
        <View row style={{ alignItems: "center" }}>
          <Tag size={8} color={Colors.color58} />
          <Text R14 color6D marginL-8>
            Today, 17:30 PM
          </Text>
        </View>
        <Text M24 color28 marginB-4>
          Chest, Trap, Tricep, Abs
        </Text>
        <View row>
          <View row style={{ alignItems: "center" }}>
            <Image source={Assets.icons.ic_time_16} />
            <Text R14 color6D marginL-4>
              60 mins
            </Text>
          </View>
          <View row style={{ alignItems: "center" }} marginL-24>
            <Image source={Assets.icons.ic_time_16} />
            <Text R14 color6D marginL-4>
              On
            </Text>
          </View>
        </View>
      </View>
    </SwipeableItem>
  );
};

export default ItemWorkOutPlan;
