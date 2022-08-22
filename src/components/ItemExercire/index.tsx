import SwipeableItem from "components/SwipeableItem/SwipeableItem";
import Tag from "components/Tag";
import React from "react";
import { StyleSheet } from "react-native";
import { Assets, Colors, View, Text, Image } from "react-native-ui-lib";

const ItemExercire = ({ rating }) => {
  return (
    <SwipeableItem>
      <View padding-16>
        <Text M18 color28>
          Chicken sandwich
        </Text>
        <View row marginT-8>
          <View row centerV>
            <Image source={Assets.icons.ic_calories_burn} />
            <Text R14 color6D marginL-4>
              632 cal
            </Text>
          </View>
          <View row marginL-24 centerV>
            <Image source={Assets.icons.ic_time_16} />
            <Text R14 color6D marginL-4>
              10 mins
            </Text>
          </View>
          {!!rating && (
            <View row marginL-24 centerV>
              <Image source={Assets.icons.ic_rating_16} />
              <Text R14 color6D marginL-4>
                10
              </Text>
            </View>
          )}
        </View>
      </View>
    </SwipeableItem>
  );
};

export default ItemExercire;

const styles = StyleSheet.create({});
