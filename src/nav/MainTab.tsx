import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Diary from "modules/Diary";
import { getBottomSpace } from "react-native-iphone-x-helper";
import {
  Assets,
  Colors,
  Dialog,
  Image,
  PanningProvider,
  Text,
  View,
  Button,
} from "react-native-ui-lib";
import Ripple from "react-native-material-ripple";
import More from "modules/More";
import Exercires from "modules/Exercires";
import WorkoutPlan from "modules/WorkoutPlan";
import { bottom, height, width } from "config/scaleAccordingToDevice";
import useBoolean from "hooks/useBoolean";
import BoxWater from "modules/Diary/components/BoxWater";
import BoxSelectFood from "components/BoxSelectFood";
import ButtonMainTab from "components/ButtonMainTab";
import Routes from "config/Routes";

const Tab = createBottomTabNavigator();

const MainTab = () => {
  const [modalWater, showModalWater, hideModalWater] = useBoolean(false);
  const [modalFood, showModalFood, hideModalFood] = useBoolean(false);
  return (
    <View flex>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name={Routes.Diary} component={Diary} />
        <Tab.Screen name={Routes.Exercires} component={Exercires} />
        <Tab.Screen name={Routes.WorkoutPlan} component={WorkoutPlan} />
        <Tab.Screen name={Routes.More} component={More} />
      </Tab.Navigator>
      <ButtonMainTab
        onPress={() => {}}
        onShowFood={() => showModalFood()}
        onShowWater={showModalWater}
      />
      <Dialog
        panDirection={PanningProvider.Directions.DOWN}
        visible={modalWater}
        onDismiss={hideModalWater}
        overlayBackgroundColor={"rgba(40,44,55,0.8)"}
        containerStyle={{
          justifyContent: "flex-end",
          backgroundColor: Colors.white,
          width: "100%",
          paddingBottom: bottom,
        }}
        width="100%"
        bottom
      >
        <BoxWater
          title={"Water"}
          style={{
            marginHorizontal: 0,
            marginBottom: 0,
            shadowColor: "transparent",
            elevation: 0,
          }}
          onClose={hideModalWater}
        />
      </Dialog>
      <Dialog
        panDirection={PanningProvider.Directions.DOWN}
        visible={modalFood}
        onDismiss={hideModalFood}
        overlayBackgroundColor={Colors.Black54}
        containerStyle={{
          justifyContent: "flex-end",
          backgroundColor: Colors.white,
          width: "100%",
          paddingBottom: bottom,
        }}
        width="100%"
        bottom
      >
        <BoxSelectFood close={hideModalFood} />
      </Dialog>
    </View>
  );
};
//@ts-ignore
function MyTabBar({ state, navigation }) {
  const IMAGES = [
    {
      inActive: Assets.icons.ic_diary_normal,
      active: Assets.icons.ic_diary_active,
      label: "Diario",
      name: Routes.Diary,
    },
    {
      inActive: Assets.icons.ic_exercire_normal,
      active: Assets.icons.ic_exercire_active,
      label: "Ejercicios",
      name: Routes.Exercires,
    },
    {
      inActive: Assets.icons.ic_add_all,
      active: Assets.icons.ic_add_all,
      label: "",
      name: "",
    },
    {
      active: Assets.icons.ic_workout_active,
      inActive: Assets.icons.ic_workout_normal,
      label: "Rutina",
      name: Routes.WorkoutPlan,
    },
    {
      inActive: Assets.icons.ic_more_normal,
      active: Assets.icons.ic_more_active,
      label: "Ajustes",
      name: Routes.More,
    },
  ];
  const [show, setShow] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: Colors.contentW,
        paddingBottom: getBottomSpace(),
      }}
    >
      {IMAGES.map((route, index) => {
        let { label, inActive, active, name } = route;
        const isFocused =
          state.index >= 2 ? state.index + 1 === index : state.index === index;

        const onPress = () => {
          if (!isFocused && !!name) {
            navigation.navigate(name);
          }
        };
        if (index === 2) {
          return (
            <View
              style={{
                flex: 1,
                height: 50,
              }}
              key={index}
            />
          );
        }
        return (
          <Ripple
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={{
              flex: 1,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={isFocused ? active : inActive} />
            {!!label && (
              <Text
                R10
                style={{
                  color: isFocused ? Colors.buttonLink : Colors.color6D,
                }}
              >
                {label}
              </Text>
            )}
          </Ripple>
        );
      })}
      {/* {show && (
        <View
          style={{
            backgroundColor: 'rgba(40,44,55,0.8)',
            zIndex: 1,
            width: width,
            height: height + 200,
            position: 'absolute',
            top: -height,
          }}
        />
      )} */}
    </View>
  );
}
export default MainTab;
