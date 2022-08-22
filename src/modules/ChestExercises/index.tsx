import { useNavigation } from "@react-navigation/native";
import ButtonLinear from "components/ButtonLinear";
import Header from "components/Header";
import ItemSearchExercire from "components/ItemSearchExercire";
import { FONTS } from "config/FoundationConfig";
import Routes from "config/Routes";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { View, Colors, Assets, Button } from "react-native-ui-lib";
const ChestExercises = () => {
  const DATA = [
    {
      title: "Barbell Bench Press - Medium...",
      calories_burn: 220,
      time: 15,
      rate: 9.2,
      isActive: false,
    },
    {
      title: "Barbell Incline Bench Press...",
      calories_burn: 220,
      time: 15,
      rate: 9,
      isActive: true,
    },
    {
      title: "Butterfly",
      calories_burn: 220,
      time: 15,
      rate: 0,
      isActive: false,
    },
    {
      title: "Cable Crossover",
      calories_burn: 220,
      time: 15,
      rate: 9.5,
      isActive: true,
    },
    {
      title: "Cable Chest Press",
      calories_burn: 220,
      time: 15,
      rate: 9.1,
      isActive: false,
    },
    {
      title: "Decline Dumbbell Bench Press",
      calories_burn: 220,
      time: 15,
      rate: 9.8,
      isActive: true,
    },
  ];
  const { navigate } = useNavigation();
  return (
    <View flex backgroundColor={Colors.background}>
      <Header
        title="Chest Exercises"
        back
        btnRight={
          <Button
            iconSource={Assets.icons.ic_search}
            link
            color={Colors.color28}
          />
        }
      />
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <ItemSearchExercire
            item={item}
            onPress={() => {
              navigate(Routes.ExercireDetail, {
                addToPlan: index % 2 === 1,
              });
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ paddingTop: 16 }}
        ListFooterComponent={<View height={150} />}
      />
      <View
        style={{
          position: "absolute",
          bottom: getBottomSpace() ? getBottomSpace() + 8 : 16,
        }}
      >
        <ButtonLinear
          title={"3 exercises selected"}
          onPress={() => {}}
          style={{
            width: "auto",
            alignSelf: "center",
            marginBottom: 16,
            paddingHorizontal: 0,
            height: 32,
            borderRadius: 100,
            backgroundColor: "red",
          }}
          styleText={{
            fontSize: 12,
            fontFamily: FONTS.heavy,
          }}
          colors={[Colors.color58, Colors.colorC6]}
        />
        <ButtonLinear
          title={"Add to plan"}
          onPress={() => {
            navigate(Routes.AddExercire);
          }}
          style={{}}
        />
      </View>
    </View>
  );
};

export default ChestExercises;

const styles = StyleSheet.create({});
