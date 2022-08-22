import Header from "components/Header";
import React from "react";
import { View, Text, Colors, Assets, Image } from "react-native-ui-lib";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import InvitePlan from "./InvitePlan";
import Workout from "./Workout";
import Nutrtion from "./Nutrtion";
import { shadow, width } from "config/scaleAccordingToDevice";
import { FONTS } from "config/FoundationConfig";
const Notification = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "InvitePlan", title: "invite plan" },
    { key: "Workout", title: "workout" },
    { key: "Nutrtion", title: "nutrtion" },
  ]);
  const renderScene = SceneMap({
    InvitePlan: InvitePlan,
    Workout: Workout,
    Nutrtion: Nutrtion,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.buttonLink }}
      style={{ backgroundColor: Colors.white, ...shadow }}
      activeColor={Colors.buttonLink}
      inactiveColor={Colors.color6D}
      labelStyle={{
        fontFamily: FONTS.heavy,
        fontSize: 14,
      }}
      pressColor={"transparent"}
    />
  );
  return (
    <View flex backgroundColor={Colors.background}>
      <Header title="Notifications" back noShadow />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default Notification;
