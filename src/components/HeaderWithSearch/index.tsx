import { useNavigation } from "@react-navigation/native";
import { FONTS } from "config/FoundationConfig";
import React, { ReactNode, useCallback } from "react";
import { width } from "config/scaleAccordingToDevice";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { View, Colors, Text, Assets, Image, Button } from "react-native-ui-lib";

interface Props {
  btnLeft?: ReactNode;
  btnRight?: ReactNode;
  title: string;
  color?: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (value: string) => void;
  onClearText?: () => void;
  back?: boolean;
  placeholder?: string;
}
const HeaderWithSearch = ({
  btnLeft,
  btnRight,
  title,
  onPress,
  value,
  onChangeText,
  onClearText,
  back,
  color,
  placeholder,
}: Props) => {
  const { goBack } = useNavigation();
  const left = useCallback(() => {
    return back ? (
      <Button
        iconSource={Assets.icons.ic_back}
        link
        color={color || Colors.color28}
        onPress={goBack}
      />
    ) : (
      btnLeft
    );
  }, [btnLeft]);
  return (
    <View>
            <Image
        source={Assets.icons.bg_tab}
        style={{ position: "absolute", width: width, height: 300, top: -50}}
      />
      <View style={styles.container}>
      <View
        row
        paddingH-16
        paddingT-12
        paddingB-7
        style={{
          justifyContent: "space-between",
        }}
      >
        <View width={24} height={24}>
          {left()}
        </View>
        <View flex centerH centerV>
          <Text H16 line>
            {title}
          </Text>
        </View>
        <View width={24} height={24}>
          {btnRight}
        </View>
      </View>
    </View>
    </View>
    
  );
};

export default HeaderWithSearch;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 30 : 0,
    paddingTop: Platform.OS === "ios" ? getStatusBarHeight(true) : 0,
    zIndex: 100,
  },
});
