import React, { memo } from "react";
import Svg, { Path, Text } from "react-native-svg";
import { View, StyleSheet } from "react-native";
import { drawArc } from "./helper";
import Animated from "react-native-reanimated";
import { Colors } from "react-native-ui-lib";

const { PI } = Math;
const { multiply } = Animated;
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface RoudDisplayData {
  data: number;
  maxValue: number;
  width: number;
  size: number;
  strokeWidth: number;
  numberOfSection: number;
  startAngle: number;
  endAngle: number;
  dataTitleFaltante: string;
}

const Anemometer = memo(
  ({
    data = 0,
    maxValue = 100,
    width = 133,
    size = 130,
    strokeWidth = 6,
    numberOfSection = 4,
    startAngle = -55,
    endAngle = 235,
    dataTitleFaltante = 'test restante'
  }: RoudDisplayData) => {
    const center = {
      x: size / 2,
      y: size / 2,
    };

    const value = (data != 0) ? data : 0;

    const radius = (size - strokeWidth) / 2;
    const viewBox = `0 0 ${width} ${width}`;
    const d = drawArc(center.x, center.y, radius, startAngle, endAngle);
    const circumference = radius * 2 * PI;
    const strokeAngle = (endAngle - startAngle) / numberOfSection;
    const strokeLength = (strokeAngle * circumference) / 360 - 1;
    const strokeDasharrayBg = `${strokeLength} 1`;
    const strokeDasharray = `${((endAngle - startAngle) / 360) * circumference
      } ${((endAngle - startAngle) / 360) * circumference}`;
    const totalAngle = (3 * PI) / 2;
    const alpha = (value * totalAngle) / maxValue;
    const currentAngle = alpha - totalAngle;

    const strokeDashoffset = multiply(currentAngle, radius);

    return (
      <View style={styles.standard}>
        <Svg width={width} height={width} {...viewBox}>
          <Path
            x={(width - size) / 2}
            y={(width - size) / 2}
            fill="none"
            stroke={Colors.line}
            // strokeDasharray={Colors.line}
            {...{ d, strokeWidth }}
          />
          <AnimatedPath
            x={(width - size) / 2}
            y={(width - size) / 2}
            fill="none"
            stroke={Colors.buttonLink}
            {...{ d, strokeWidth, strokeDasharray, strokeDashoffset }}
          />
          {/* {textAngles()} */}
          {/* <Text
            fill={'blue'}
            fontSize="24"
            x={width / 2}
            y={width / 2 + 64}
            textAnchor="middle"
            >
            {value}1
          </Text> */}
          <Text
            fill={Colors.color28}
            fontSize="36"
            x={width / 2}
            y={width / 2}
            textAnchor="middle"
          >
            {maxValue - data}
          </Text>
          <Text
            fill={Colors.color6D}
            fontSize="12"
            x={width / 2}
            y={width / 2 + 20}
            textAnchor="middle"
          >
            {dataTitleFaltante}
          </Text>
        </Svg>
      </View>
    );
  }
);

export default Anemometer;

const styles = StyleSheet.create({
  standard: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
