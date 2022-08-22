import { useNavigation, useRoute } from "@react-navigation/core";
import ButtonLinear from "components/ButtonLinear";
import Header from "components/Header";
import { FONTS } from "config/FoundationConfig";
import Routes from "config/Routes";
import { height, width } from "config/scaleAccordingToDevice";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { View, Colors, Assets, Button } from "react-native-ui-lib";
const ExercireDetail = () => {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const addToPlan = params.addToPlan;
  return (
    <View flex>
      <ImageBackground
        source={Assets.icons.img_exercise_detail}
        style={{
          width: width,
          height: height,
        }}
      ></ImageBackground>
      <View
        backgroundColor={Colors.color28}
        style={{
          opacity: 0.8,
          position: "absolute",
          width: width,
          height: height,
        }}
      />
      <View
        backgroundColor={"transparent"}
        style={{
          position: "absolute",
          width: width,
          height: height,
        }}
      >
        <Header
          back
          title={"Incline Dumbbell Press"}
          style={{
            backgroundColor: "transparent",
          }}
          color={Colors.white}
        />
        <View flex centerV centerH>
          <Button
            iconSource={Assets.icons.ic_play}
            link
            color={Colors.white}
            onPress={() => {
              navigate(Routes.PlayVideo);
            }}
          />
        </View>
        <View
          row
          paddingH-16
          style={{
            paddingBottom: getBottomSpace() ? getBottomSpace() + 8 : 16,
          }}
        >
          <ButtonLinear
            title={"INSTRUCTIONS"}
            styleText={{ color: Colors.color28 }}
            onPress={() => {
              navigate(Routes.ExerciseDetailInstruction);
            }}
            style={{
              flex: 1,
              width: (width - 48) / 2,
              marginHorizontal: 0,
              height: 50,
            }}
            colors={[Colors.white, Colors.white]}
          />
          <View width={16} />
          {addToPlan ? (
            <ButtonLinear
              title={"add to plan"}
              onPress={() => {
                navigate(Routes.ChestExercises);
              }}
              style={{
                flex: 1,
                width: (width - 48) / 2,
                marginHorizontal: 0,
                height: 50,
              }}
            />
          ) : (
            <ButtonLinear
              title={"RECORDS"}
              styleText={{ color: Colors.color28 }}
              style={{
                flex: 1,
                width: (width - 48) / 2,
                marginHorizontal: 0,
                height: 50,
              }}
              colors={[Colors.white, Colors.white]}
              onPress={() => {
                navigate(Routes.ExerciseDetailRecordHistory);
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ExercireDetail;

const styles = StyleSheet.create({});
