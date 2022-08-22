import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Assets, Button, Colors, Image } from "react-native-ui-lib";

interface Props {
  close: () => void;
}
const BoxSelectFood = ({ close }: Props) => {
  const DATA_MEAL = [
    {
      img: Assets.icons.ic_breakfast,
      title: "Breakfast",
    },
    {
      img: Assets.icons.ic_lunch,
      title: "Lunch",
    },
    {
      img: Assets.icons.ic_dinner,
      title: "Dinner",
    },
    {
      img: Assets.icons.ic_snack,
      title: "Snack",
    },
  ];
  const [indexSelectMeal, setIndexSelectMeal] = useState(-1);
  return (
    <>
      <View
        row
        paddingH-16
        paddingT-13
        paddingB-11
        style={{
          justifyContent: "space-between",
        }}
      >
        <Text H14 color28 uppercase>
          Select a meal
        </Text>
        <Button
          iconSource={Assets.icons.ic_delete_day}
          link
          color={Colors.buttonLink}
          onPress={close}
        />
      </View>
      <View height={1} backgroundColor={Colors.line} />
      <View
        paddingT-24
        paddingB-32
        paddingH-24
        row
        style={{ justifyContent: "space-between" }}
      >
        {DATA_MEAL.map((item, index) => {
          let active = indexSelectMeal === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setIndexSelectMeal(index)}
            >
              <View centerH>
                <View
                  width={56}
                  height={56}
                  marginB-8
                  style={{
                    borderRadius: 28,
                    borderWidth: 1,
                    borderColor: Colors.line,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image source={item.img} />
                </View>
                <Text R14 color={active ? Colors.buttonLink : Colors.color6D}>
                  {item.title}
                </Text>
                {active && (
                  <Image
                    source={Assets.icons.selected_mask}
                    style={{
                      position: "absolute",
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default BoxSelectFood;
