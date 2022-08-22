import Header from "components/Header";
import { width } from "config/scaleAccordingToDevice";
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { View, Colors, Assets, Image, Text } from "react-native-ui-lib";
const ExerciseDetailInstruction = () => {
  return (
    <View flex backgroundColor={Colors.white}>
      <Header title="Instructions" back iconSource={Assets.icons.ic_close_24} />
      <ScrollView>
        <Text M24 color28 center marginT-24 marginB-8>
          Main Muscle: Chest
        </Text>
        <Image
          source={Assets.icons.img_intruction}
          style={{
            width: width,
            height: width,
          }}
          marginB-32
        />
        <Text R16 color28 marginH-16 marginB-16>
          1. Place a preacher bench about 2 feet in front of a pulley machine.
          2. Attach a straight bar to the low pulley. Sit at the preacher bench
          with your elbow and upper arms firmly on top of the bench pad and have
          someone hand you the bar from the low pulley. 3. Grab the bar and
          fully extend your arms on top of the preacher bench pad. This will be
          your starting position. Now start pilling the weight up towards your
          shoulders and squeeze the biceps hard at the top of the movement.
          Exhale as you perform this motion. Also, hold for a second at the top.
          Now slowly lower the weight to the starting position. Repeat for the
          recommended amount of repetitions. Variations: You can also use an e-z
          bar attachment or even a single hand bar so that you can do one arm at
          a time. This exercise can also be performed with barbells, dumbbells,
          E-Z bar, and exercise bands.
        </Text>
      </ScrollView>
    </View>
  );
};

export default ExerciseDetailInstruction;

const styles = StyleSheet.create({});
