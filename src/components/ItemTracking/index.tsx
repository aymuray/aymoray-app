import { shadow } from "config/scaleAccordingToDevice";
import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Colors, Image, Assets } from "react-native-ui-lib";

interface Props {
  item: {
    icon: any;
    name: string;
    company: string;
    isConnect: boolean;
  };
}
const ItemTracking = ({ item }: Props) => {
  return (
    <View
      marginH-16
      padding-24
      marginB-16
      backgroundColor={Colors.white}
      row
      style={{
        ...shadow,
        elevation: 1,
      }}
    >
      <View
        height={96}
        width={96}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Image source={item.icon} />
      </View>
      <View marginL-24 centerV>
        <Text M24 color28>
          {item.name}
        </Text>
        <Text R14 color6D>
          {item.company}
        </Text>
        <View row marginT-8 style={{ alignItems: "center" }}>
          <Image source={Assets.icons.ic_connected} />
          <Text M14 buttonLink marginL-4>
            Connected
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemTracking;

const styles = StyleSheet.create({});
