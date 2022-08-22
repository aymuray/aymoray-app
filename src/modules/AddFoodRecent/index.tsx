import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "components/Header";
import { FONTS } from "config/FoundationConfig";
import Routes from "config/Routes";
import React from "react";
import { StyleSheet } from "react-native";
import { View, Colors } from "react-native-ui-lib";
import AllDay from "./AllDay";
import RecentLunch from "./RecentLunch";
const Tab = createMaterialTopTabNavigator();
const AddFoodRecent = () => {
  return (
    <View flex>
      <Header title="Recent" back noShadow />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontFamily: FONTS.heavy,
            fontSize: 14,
          },
          activeTintColor: Colors.buttonLink,
          inactiveTintColor: Colors.color6D,
          indicatorStyle: {
            backgroundColor: Colors.buttonLink,
          },
        }}
      >
        <Tab.Screen
          name={Routes.AddFoodRecentLunch}
          component={RecentLunch}
          options={{
            title: "Recent lunch",
          }}
        />
        <Tab.Screen
          name={Routes.AddFoodRecentAllDay}
          component={AllDay}
          options={{
            title: "ALL DAY",
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AddFoodRecent;

const styles = StyleSheet.create({});
