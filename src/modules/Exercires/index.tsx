import { useNavigation } from "@react-navigation/native";
import HeaderWithSearch from "components/HeaderWithSearch";
import Routes from "config/Routes";
import { width } from "config/scaleAccordingToDevice";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View, Assets, Colors, Image, Text } from "react-native-ui-lib";
import BoxExercire from "./components/BoxExercire";
import Box from "components/Box";
import PieChart from "components/PieChart";
import ListExercise from "modules/ListExercise";
import DaysExercise from "components/DaysExercise/DaysExercise";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const widthItem = (width - 48) / 2;
const Exercires = () => {
  const [change, setChange] = useState(false)
  const { navigate } = useNavigation();
  const DATA = [
    {
      icon: Assets.icons.ic_exercise_list,
      title: "Lista de ejercicios",
      onPress: () => navigate(Routes.ListExercise),
    },
    {
      icon: Assets.icons.ic_user_plan,
      title: "Agregar ejercicios",
      onPress: () => navigate(Routes.AddExercire),
    },
  ];
  const goSearchExercires = useCallback(() => {
    navigate(Routes.SearchExercires);
  }, []);
  return (
    <View flex>
      <HeaderWithSearch title="Mis Ejercicios"/>
      <ScrollView>
        <DaysExercise setChange={setChange} change={change}/>
        <Box>
          <Text M14 color6D marginH-24 marginT-24 center>
            Tu porcentaje de ejercicioss
          </Text>
          <PieChart change={change}/>
        </Box>
        <View
          row
          style={{
            flexWrap: "wrap",
          }}
        >
          {DATA.map((item, index) => {
            return (
              <TouchableWithoutFeedback
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
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Exercires;

const styles = StyleSheet.create({});
