import SwipeableItem from "components/SwipeableItem/SwipeableItem";
import Tag from "components/Tag";
import React from "react";
import { StyleSheet } from "react-native";
import { Assets, Colors, View, Text, Image } from "react-native-ui-lib";

const ItemFood = () => {
  return (
    <SwipeableItem>
      <View padding-16 row>
        <View style={{ alignItems: "center" }}>
          <Tag size={24} color={Colors.color58} label={"A"} />
          <Image source={Assets.icons.ic_food_checked} marginT-8 />
        </View>
        <View marginL-16>
          <Text M18 color28>
            Chicken sandwich
          </Text>
          <View row marginT-8>
            <View row>
              <Image source={Assets.icons.ic_calories_burn} />
              <Text R14 color6D marginL-4>
                632 cal
              </Text>
            </View>
            <View row marginL-24>
              <Image source={Assets.icons.ic_serving} />
              <Text R14 color6D marginL-4>
                1 whole sandwich
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SwipeableItem>
  );
};

export default ItemFood;

const styles = StyleSheet.create({});
