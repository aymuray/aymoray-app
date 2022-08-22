import { FONTS } from "config/FoundationConfig";
import { width } from "config/scaleAccordingToDevice";
import React, { memo } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { Colors } from "react-native-ui-lib";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
} from "victory-native";
export const dataWeek = [
  { x: 0, y: 74 },
  { x: 1, y: 63 },
  { x: 2, y: 58 },
  { x: 3, y: 82 },
  { x: 4, y: 58 },
  { x: 5, y: 74 },
];
export const dataMonth = [
  { x: 0, y: 70 },
  { x: 1, y: 60 },
  { x: 2, y: 50 },
  { x: 3, y: 80 },
  { x: 4, y: 50 },
  { x: 5, y: 70 },
];
export const dataYear = [
  { x: 0, y: 80 },
  { x: 1, y: 70 },
  { x: 2, y: 68 },
  { x: 3, y: 90 },
  { x: 4, y: 60 },
  { x: 5, y: 80 },
];

export enum EnumTypeChart {
  week = 0,
  month = 1,
  year = 2,
  all = 3,
}
interface Props {
  type: EnumTypeChart;
}
const LinearChart = memo(({ type }: Props) => {
  return (
    <View style={styles.container}>
      <VictoryChart
        domainPadding={50}
        height={330}
        width={width}
        padding={{ top: -30, bottom: 30, left: 30, right: 10 }}
      >
        <Defs>
          {(type === EnumTypeChart.week || type === EnumTypeChart.all) && (
            <LinearGradient id="myGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="100%" stopColor="#5856D6" stopOpacity={0.17} />
            </LinearGradient>
          )}
          {(type === EnumTypeChart.month || type === EnumTypeChart.all) && (
            <LinearGradient id="myGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="100%" stopColor="#44DB5E" stopOpacity={0.17} />
            </LinearGradient>
          )}
          {(type === EnumTypeChart.year || type === EnumTypeChart.all) && (
            <LinearGradient id="myGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="100%" stopColor="#FF5E3A" stopOpacity={0.17} />
            </LinearGradient>
          )}
        </Defs>
        <VictoryAxis tickFormat={(x) => `${x}`} style={styleAxisX} />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => `${x}`}
          maxDomain={1000}
          tickValues={[0, 20, 40, 60, 80, 100]}
          style={styleAxisY}
        />
        {(type === EnumTypeChart.week || type === EnumTypeChart.all) && (
          <VictoryArea
            style={{
              data: {
                stroke: "#5856D6",
                strokeWidth: 2,
                fill: "url(#myGradient)",
                zIndex: 1,
              },
            }}
            data={dataWeek}
          />
        )}
        {(type === EnumTypeChart.month || type === EnumTypeChart.all) && (
          <VictoryArea
            style={{
              data: {
                stroke: "#44DB5E",
                strokeWidth: 2,
                fill: "url(#myGradient1)",
                zIndex: 1,
              },
            }}
            data={dataMonth}
          />
        )}
        {(type === EnumTypeChart.year || type === EnumTypeChart.all) && (
          <VictoryArea
            style={{
              data: {
                stroke: "#FF5E3A",
                strokeWidth: 2,
                fill: "url(#myGradient2)",
                zIndex: 0,
              },
            }}
            data={dataYear}
          />
        )}
        {(type === EnumTypeChart.week || type === EnumTypeChart.all) && (
          <VictoryScatter
            style={{
              data: { stroke: "#5856D6", fill: "#FFF", strokeWidth: 2 },
            }}
            size={4}
            data={dataWeek}
          />
        )}
        {(type === EnumTypeChart.month || type === EnumTypeChart.all) && (
          <VictoryScatter
            style={{
              data: { stroke: "#44DB5E", fill: "#FFF", strokeWidth: 2 },
            }}
            size={4}
            data={dataMonth}
          />
        )}
        {(type === EnumTypeChart.year || type === EnumTypeChart.all) && (
          <VictoryScatter
            style={{
              data: { stroke: "#FF5E3A", fill: "#FFF", strokeWidth: 2 },
            }}
            size={4}
            data={dataYear}
          />
        )}
      </VictoryChart>
    </View>
  );
});
export default LinearChart;
const styleAxisX = {
  axis: { stroke: "#E9E9E9" },
  axisLabel: { fontSize: 20, padding: 20 },
  tickLabels: {
    fontSize: 10,
    padding: 8,
    fill: "#6D819C",
    fontFamily: FONTS.medium,
  },
};
const styleAxisY = {
  axis: { stroke: "transparent" },
  axisLabel: { fontSize: 20, padding: 30 },
  grid: { stroke: "#E9E9E9" },
  tickLabels: {
    fontSize: 10,
    padding: 8,
    fill: "#6D819C",
    fontFamily: FONTS.medium,
  },
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: 330,
    width: width,
  },
  chartStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
