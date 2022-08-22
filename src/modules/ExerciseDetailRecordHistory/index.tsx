import { useNavigation } from "@react-navigation/core";
import ButtonLinear from "components/ButtonLinear";
import Header from "components/Header";
import Tag from "components/Tag";
import Routes from "config/Routes";
import { shadow } from "config/scaleAccordingToDevice";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { View, Text, Colors, Image, Assets } from "react-native-ui-lib";
const ExerciseDetailRecordHistory = () => {
  const { navigate } = useNavigation();
  const DATA = [
    {
      time: "Jan 19, 2018",
      records: [
        "28 kg - 12 rep",
        "34 kg - 12 rep",
        "40 kg - 18 rep",
        "45 kg - 5 rep",
      ],
    },
    {
      time: "DEC 15, 2017",
      records: [
        "28 kg - 12 rep",
        "34 kg - 12 rep",
        "40 kg - 18 rep",
        "45 kg - 5 rep",
      ],
    },
    {
      time: "nov 20, 2017",
      records: [
        "28 kg - 12 rep",
        "34 kg - 12 rep",
        "40 kg - 18 rep",
        "45 kg - 5 rep",
      ],
    },
  ];
  return (
    <View flex>
      <Header title={"Records History"} back />
      <ScrollView
        style={{
          backgroundColor: Colors.background,
        }}
        contentContainerStyle={{
          paddingBottom: getBottomSpace() + 16,
        }}
      >
        {DATA.map((item, index) => (
          <View flex row marginH-16 key={index}>
            <View>
              <View
                width={2}
                height={"100%"}
                backgroundColor={Colors.line}
                marginL-5
              />
              <Image
                source={Assets.icons.point}
                style={{
                  position: "absolute",
                  top: 28,
                }}
              />
            </View>
            <View marginL-20 flex marginT-24>
              <Text H14 color6D marginB-16 uppercase>
                {item.time}
              </Text>
              <View
                style={{
                  ...shadow,
                  flex: 1,
                }}
                padding-16
                paddingB-0
                backgroundColor={Colors.white}
              >
                {item.records.map((item, index) => (
                  <View row centerV marginB-16 key={index}>
                    <Tag
                      size={26}
                      label={`${index + 1}`}
                      color={Colors.color58}
                    />
                    <Text R16 color28 marginL-16>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <ButtonLinear
        title={"create new record"}
        onPress={() => {
          navigate(Routes.CreateNewRecords);
        }}
        style={{
          position: "absolute",
          bottom: getBottomSpace() ? getBottomSpace() + 8 : 16,
        }}
      />
    </View>
  );
};

export default ExerciseDetailRecordHistory;

const styles = StyleSheet.create({});
