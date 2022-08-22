import { useNavigation } from "@react-navigation/core";
import ButtonLinear from "components/ButtonLinear";
import Routes from "config/Routes";
import { bottom, width } from "config/scaleAccordingToDevice";
import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  View,
  Assets,
  Colors,
  Text,
  Image,
  ActionSheet,
} from "react-native-ui-lib";
import { MyPlanDetailContext } from ".";
const MyPlanIntroduction = () => {
  const { navigate } = useNavigation();
  const { showActionSheet, closeActionSheet } = useContext(MyPlanDetailContext);
  return (
    <View flex backgroundColor={Colors.white}>
      <ScrollView>
        <Text marginH-16 marginV-8 M24 color28>
          Weider (Chest Special)
        </Text>
        <View row paddingH-16 centerV marginB-16>
          <Image
            source={Assets.icons.ic_time_16_w}
            tintColor={Colors.color6D}
          />
          <Text R14 color6D marginL-4>
            8 Weeks
          </Text>
        </View>
        <View width={width} height={(width / 375) * 225} centerV centerH>
          <Image
            source={Assets.icons.GeneralTraining}
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
          />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: Colors.color28,
              opacity: 0.8,
            }}
          />
          <Image source={Assets.icons.ic_play} />
        </View>
        <Text margin-24 color28 R16 style={{ lineHeight: 24 }}>
          Building muscle takes more than physical fortitude. It takes a certain
          mindset and drive to create an elite body. Even if you lift big, you
          won't get big if you don't know how to think big. That's your first
          lesson from Jay Cutler.{"\n\n"}"I always say that the mentality of a
          bodybuilder isn't normal," Jay explains. "Something has to be
          triggered inside you. You always want to push yourself beyond the
          limits. Honestly, you have to be a little crazy. There are some people
          who have the potential to have the best physiques in the world, but
          they don't have the mental capabilities to push themselves."
        </Text>
      </ScrollView>
      <ButtonLinear
        title={"invite friend to join workout"}
        onPress={() => {
          navigate(Routes.MyPlanSelectFriend);
        }}
        style={{
          position: "absolute",
          bottom: bottom,
        }}
      />
      <ActionSheet
        // title="Title"
        // message="Message of action sheet"
        cancelButtonIndex={3}
        destructiveButtonIndex={2}
        useNativeIOS
        options={[
          { label: "Edit Plan", onPress: () => {} },
          { label: "Stop Plan", onPress: () => {} },
          { label: "Delete Plan", onPress: () => {} },
          { label: "Cancel", onPress: () => {} },
        ]}
        visible={showActionSheet}
        onDismiss={() => {
          closeActionSheet();
        }}
      />
    </View>
  );
};

export default MyPlanIntroduction;

const styles = StyleSheet.create({});
