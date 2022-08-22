import BarChart from "components/BarChart";
import Box from "components/Box";
import ButtonLinear from "components/ButtonLinear";
import Header from "components/Header";
import ItemFoodDetail from "components/ItemFoodDetail";
import { FONTS } from "config/FoundationConfig";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Assets, Text, View, Image, Button, Colors } from "react-native-ui-lib";

const BreakfastDetail = () => {
  const DATA = [
    {
      colorTag: Colors.color5A,
      title: "Fat",
      value: "10.3 g",
      items: ["Saturated fat", "Unsaturated fat"],
    },
    {
      colorTag: Colors.color58,
      title: "Carbs",
      value: "0.8 g",
      items: ["Fiber", "Sugars"],
    },
    {
      colorTag: Colors.buttonLink,
      title: "Protein",
      value: "52.9 g",
      items: [],
    },
    {
      colorTag: Colors.color44,
      title: "Others",
      value: "10.3 g",
      items: ["Cholesterol", "Sodium", "Potassium"],
    },
  ];
  return (
    <View flex>
      <Header
        title="Breakfast Detail"
        back
        iconSource={Assets.icons.ic_close_24}
      />
      <ScrollView>
        <View style={{ height: 16 }} />
        <Box>
          <BarChart />
          <LinearGradient
            colors={["#C644FC", "#5856D6"]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{ x: 1, y: 0 }}
            style={{
              marginHorizontal: 16,
              borderRadius: 6,
              marginBottom: 24,
            }}
          >
            <Text marginL-16 marginT-8 H36 white>
              842 Cal
            </Text>
            <Text marginL-16 marginB-16 M14 white>
              Recommended 615 - 820 cal
            </Text>
            <Image
              source={Assets.icons.img_star}
              style={{
                position: "absolute",
                right: 8,
                bottom: 0,
              }}
            />
          </LinearGradient>
        </Box>
        <Box>
          <View
            row
            paddingH-16
            paddingT-13
            paddingB-11
            centerV
            style={{
              justifyContent: "space-between",
            }}
          >
            <Text H14 color28>
              Nutrition Detail
            </Text>
            <Button
              label="More Nutrition Facts"
              link
              color={Colors.buttonLink}
            />
          </View>
          <View height={1} backgroundColor={Colors.line} />
          {DATA.map((item, index) => {
            return <ItemFoodDetail item={item} key={index} />;
          })}
        </Box>
        <Box>
          <Text margin-16 M16 buttonLink>
            What's the ideal macronutrient ratio for Gain weight?
          </Text>
          <View height={1} backgroundColor={Colors.line} />
          <View row paddingH-16 paddingV-24>
            <ButtonLinear
              title="Pro"
              onPress={() => {}}
              style={{ height: 21, width: 37, marginHorizontal: 0 }}
              styleLinear={{
                paddingHorizontal: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
              styleText={{ fontSize: 10, fontFamily: FONTS.heavy }}
            />
            <View marginL-16>
              <Text R14 color28>
                More nutrition detail need Pro account.{"\n"}
                <Text buttonLink onPress={() => {}}>
                  Upgrade Now.
                </Text>
              </Text>
            </View>
          </View>
        </Box>
      </ScrollView>
    </View>
  );
};

export default BreakfastDetail;
