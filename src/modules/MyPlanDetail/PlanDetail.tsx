import ButtonLinear from "components/ButtonLinear";
import ItemExercire from "components/ItemExercire";
import Tag from "components/Tag";
import { bottom } from "config/scaleAccordingToDevice";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Pagination } from "react-native-snap-carousel";
import { View, Assets, Colors, Text, Image } from "react-native-ui-lib";
const PlanDetail = () => {
  return (
    <View flex backgroundColor={Colors.background}>
      <View backgroundColor={Colors.color58} padding-16>
        <Text R14 white marginB-8>
          Workout Plan Duration
        </Text>
        <View row centerH>
          <View flex>
            <Text H16 white>
              Jan 23, 2018
            </Text>
          </View>
          <Image source={Assets.icons.ic_arr_right} />
          <View flex>
            <Text H16 white marginL-24>
              Apr 16, 2018
            </Text>
          </View>
        </View>
      </View>
      <Pagination
        dotsLength={6}
        activeDotIndex={0}
        containerStyle={styles.containerStyle}
        dotContainerStyle={styles.dotContainerStyle}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotScale={1}
      />
      <ScrollView>
        <View
          marginH-16
          marginB-16
          style={{
            borderRadius: 6,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}
          backgroundColor={Colors.white}
        >
          <Text H14 color28 marginT-13 marginB-11 marginH-16 uppercase>
            workout DAY 1
          </Text>
          <View height={1} backgroundColor={Colors.line} />
          <Text R14 color6D marginT-16 marginH-16 marginB-8>
            Workout Day Name
          </Text>
          <Text M24 color28 marginH-16 marginB-16>
            Day 1: Chest and Abs
          </Text>
          <View row marginH-16 marginB-24 centerV>
            <Tag size={24} color={Colors.color44} />
            <Text R14 color6D marginH-8>
              Workout Day:
            </Text>
            <Text H14 color28>
              Daily Monday
            </Text>
          </View>
          <View height={1} backgroundColor={Colors.line} />
          <Text H14 color28 marginT-13 marginB-11 marginH-16 uppercase>
            Exercise list
          </Text>
          <View height={1} backgroundColor={Colors.line} />
          <ItemExercire rating={9.2} />
          <View height={1} backgroundColor={Colors.line} />
          <ItemExercire rating={9.2} />
          <View height={1} backgroundColor={Colors.line} />
          <ItemExercire rating={9.2} />
          <View height={1} backgroundColor={Colors.line} />
          <ItemExercire rating={9.2} />
          <View height={1} backgroundColor={Colors.line} />
          <ItemExercire rating={9.2} />
          <View height={1} backgroundColor={Colors.line} />
          <ItemExercire rating={9.2} />
        </View>
      </ScrollView>
      <ButtonLinear
        title={"invite friend to join workout"}
        onPress={() => {}}
        style={{
          position: "absolute",
          bottom: bottom,
        }}
      />
    </View>
  );
};

export default PlanDetail;

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: "center",
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  dotContainerStyle: {
    marginRight: 0,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.buttonLink,
  },
  inactiveDotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.color6D,
    backgroundColor: "transparent",
  },
});
