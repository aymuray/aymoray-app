import { useNavigation } from "@react-navigation/native";
import Box from "components/Box";
import ButtonLinear from "components/ButtonLinear";
import Header from "components/Header";
import Routes from "config/Routes";
import { bottom } from "config/scaleAccordingToDevice";
import BoxFood from "modules/Diary/components/BoxFood";
import React from "react";
import { ScrollView } from "react-native";
import { View, Text, Colors } from "react-native-ui-lib";
const CreateMyMealStep2 = () => {
  const { navigate } = useNavigation();
  return (
    <View flex backgroundColor={Colors.background}>
      <Header title="Create a Meal - Step 2/2" back />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <View height={16} />
        <BoxFood title={"INGREDIENT RECIPE"} />
        <Box>
          <Text marginT-13 marginB-11 marginL-16 uppercase H14>
            DIRECTIONS
          </Text>
          <View height={1} backgroundColor={Colors.line} />

          <View
            margin-16
            paddingH-16
            paddingV-19
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderColor: Colors.line,
            }}
          >
            <Text R14 color28 style={{ lineHeight: 21 }}>
              1. Preheat oven to 400 F.{"\n"}2. Bring sauce ingredients to a
              boil over stovetop, then simmer 30-45 minutes.{"\n"}3. Remove
              sausage casing and brown meat in skillet over medium heat,
              breaking it up with a turner or spatula as it cooks.{"\n"}4. Spray
              a cookie sheet with cooking spray and bake pita for 10 minutes or
              until slightly stiff, but not crispy.{"\n"}5. Take out pita, and
              turn oven up to 500 F.{"\n"}6. Place pita on a cookie sheet and
              cover with sauce, cheese, sausage, and veggies, in that order.
              {"\n"}7. Put back in the oven at 500 F for 5-7 minutes, watching
              closely. Pizza is done when crust is crispy and cheese is melted.
              {"\n"}8. Top with parmesan and red pepper. Devour the entire
              thing!
            </Text>
          </View>
        </Box>
      </ScrollView>
      <ButtonLinear
        title="create"
        onPress={() => {
          navigate(Routes.MyMealDetail);
        }}
        style={{
          position: "absolute",
          bottom: bottom,
        }}
      />
    </View>
  );
};

export default CreateMyMealStep2;
