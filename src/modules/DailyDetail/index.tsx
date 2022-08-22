import Header from "components/Header";
import { FONTS } from "config/FoundationConfig";
import { shadow, width } from "config/scaleAccordingToDevice";
import React from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { View, Assets, Colors } from "react-native-ui-lib";
import Goal from "./Goal";
import Intake from "./Intake";

const DailyDetail = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Intake", title: "Intake" },
    { key: "Goal", title: "Goal" },
  ]);
  const renderScene = SceneMap({
    Intake: Intake,
    Goal: Goal,
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
    <View flex>
      <Header
        title="Daily Detail"
        back
        iconSource={Assets.icons.ic_close_24}
        noShadow
      />
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

export default DailyDetail;
