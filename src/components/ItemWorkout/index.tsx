import { width } from "config/scaleAccordingToDevice";
import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ripple from "react-native-material-ripple";
import { View, Text, Assets, Image } from "react-native-ui-lib";

const ItemWorkout = ({ item, onPress }) => {
  return (
    <Ripple onPress={onPress}>
      <View
        width={width}
        height={(width / 375) * 225}
        style={{ justifyContent: "flex-end" }}
      >
        <Image
          source={item.img}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: width,
            height: (width / 375) * 225,
          }}
        />
        <LinearGradient
          colors={["rgba(0,0,0,.01)", "rgba(0,0,0,.6)", "rgba(0,0,0,1)"]}
          style={{ ...StyleSheet.absoluteFillObject, opacity: 0.5 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <Text M24 white marginH-16 marginB-8>
          {item.title}
        </Text>
        <View row paddingH-16 centerV marginB-16>
          <Image source={Assets.icons.ic_time_16_w} />
          <Text R14 white marginL-4>
            {item.week} Weeks
          </Text>
          {!!item.note && (
            <>
              <Image source={Assets.icons.ic_level} marginL-24 />
              <Text R14 white marginL-4>
                {item.note}
              </Text>
            </>
          )}
        </View>
      </View>
    </Ripple>
  );
};

export default ItemWorkout;

const styles = StyleSheet.create({});
