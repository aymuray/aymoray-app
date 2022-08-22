import Header from "components/Header";
import React, { createContext } from "react";
import { StyleSheet } from "react-native";
import { View, Button, Assets, Colors } from "react-native-ui-lib";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Routes from "config/Routes";
import { FONTS } from "config/FoundationConfig";
import MyPlanIntroduction from "./MyPlanIntroduction";
import PlanDetail from "./PlanDetail";
import useBoolean from "hooks/useBoolean";
const Tab = createMaterialTopTabNavigator();
interface MyPlanDetailProps {
  showActionSheet: boolean;
  openActionSeet: () => void;
  closeActionSheet: () => void;
}
export const MyPlanDetailContext = createContext<MyPlanDetailProps>({
  showActionSheet: false,
  openActionSeet: () => {},
  closeActionSheet: () => {},
});
const MyPlanDetail = () => {
  const [showActionSheet, openActionSeet, closeActionSheet] = useBoolean(false);
  return (
    <MyPlanDetailContext.Provider
      value={{
        showActionSheet,
        openActionSeet,
        closeActionSheet,
      }}
    >
      <View flex>
        <Header
          title={"My Plan"}
          back
          noShadow
          btnRight={
            <Button
              iconSource={Assets.icons.ic_option}
              link
              color={Colors.color28}
              onPress={() => openActionSeet()}
            />
          }
        />
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
            name={Routes.MyPlanIntroduction}
            component={MyPlanIntroduction}
            options={{
              title: "introduction",
            }}
          />
          <Tab.Screen
            name={Routes.PlanDetail}
            component={PlanDetail}
            options={{
              title: "plan detail",
            }}
          />
        </Tab.Navigator>
      </View>
    </MyPlanDetailContext.Provider>
  );
};

export default MyPlanDetail;

const styles = StyleSheet.create({});
