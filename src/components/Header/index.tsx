import { useNavigation } from "@react-navigation/native";
import { width } from "config/scaleAccordingToDevice";
import React, { ReactElement, ReactNode, useCallback } from "react";
import { Platform, StyleSheet, ViewStyle } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { View, Colors, Text, Button, Assets } from "react-native-ui-lib";

interface Props {
  btnLeft?: ReactNode;
  btnRight?: ReactNode;
  title: string;
  back?: boolean;
  style?: ViewStyle;
  color?: string;
  iconSource?: any;
  noShadow?: boolean;
  customRight?: ReactElement;
}
const Header = ({
  btnLeft,
  btnRight,
  title,
  back,
  style,
  color,
  iconSource,
  noShadow,
  customRight,
}: Props) => {
  const { goBack } = useNavigation();
  const left = useCallback(() => {
    return back ? (
      <Button
        iconSource={iconSource || Assets.icons.ic_back}
        link
        color={color || Colors.color28}
        onPress={goBack}
        style={{
          justifyContent: "flex-start",
        }}
      />
    ) : (
      btnLeft
    );
  }, [btnLeft]);

  return (
    <View
      paddingH-16
      // paddingR-56
      style={[
        styles.container,
        style,
        {
          shadowColor: noShadow ? "transparent" : "#000",
          elevation: noShadow ? 0 : 2,
        },
      ]}
    >
      <View width={24} height={24}>
        {left()}
      </View>
      <View flex centerH centerV>
        <Text H16 color={color || Colors.color28}>
          {title}
        </Text>
      </View>
      {customRight ? (
        customRight
      ) : (
        <View width={24} height={24}>
          {btnRight}
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    shadowColor: "rgba(0,0,0,0.02)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 2,
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? 0 : getStatusBarHeight(true),
    height: Platform.OS === "android" ? 50 : getStatusBarHeight(true) + 44,
    backgroundColor: Colors.white,
    flexDirection: "row",
    zIndex: 100,
    alignItems: "center",
    width: width,
  },
});
