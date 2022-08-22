import { useNavigation } from "@react-navigation/native";
import HeaderWithSearch from "components/HeaderWithSearch";
import Routes from "config/Routes";
import { width } from "config/scaleAccordingToDevice";
import React, { useCallback } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View, Assets, Colors, Image, Text } from "react-native-ui-lib";
import BoxExercire from "./components/BoxExercire";
const widthItem = (width - 48) / 2;
const Exercires = () => {
  const { navigate } = useNavigation();
  const DATA = [
    {
      icon: Assets.icons.ic_watch,
      title: "Auto Tracking",
      onPress: () => navigate(Routes.AutoTracking),
    },
    {
      icon: Assets.icons.ic_exercise_list,
      title: "List of Exercises",
      onPress: () => navigate(Routes.MuscleGroup),
    },
    {
      icon: Assets.icons.ic_user_exercises,
      title: "User’s Exercises",
      onPress: () => navigate(Routes.AddExercire),
    },
    {
      icon: Assets.icons.ic_user_plan,
      title: "User’s Workout Plan",
      onPress: () => {},
    },
  ];
  const goSearchExercires = useCallback(() => {
    navigate(Routes.SearchExercires);
  }, []);
  return (
    <View flex>
      <HeaderWithSearch title="Exercises Guide" onPress={goSearchExercires} />
      <ScrollView>
        <View
          row
          paddingT-16
          style={{
            flexWrap: "wrap",
          }}
        >
          {DATA.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: widthItem,
                  height: (widthItem / 164) * 146,
                  borderRadius: 6,
                  marginLeft: 16,
                  marginBottom: 16,
                  backgroundColor: Colors.white,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={item.onPress}
              >
                <Image source={item.icon} />
                <Text M14 color28 marginT-16>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <BoxExercire title={"YOUR recent added"} />
      </ScrollView>
    </View>
  );
};

export default Exercires;

const styles = StyleSheet.create({});
