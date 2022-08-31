import SwipeableItem from "components/SwipeableItem/SwipeableItem";
import Tag from "components/Tag";
import React, {useEffect} from "react";
import { StyleSheet } from "react-native";
import { Assets, Colors, View, Text, Image } from "react-native-ui-lib";
import SwipeableItemRecipe from "components/SwipeableItemRecipe/SwipeableItemRecipe";
import Routes from "config/Routes";


const ItemIngredient = ({dataRecipe}) => {
  return (
    <SwipeableItemRecipe dataRecipe={dataRecipe}>
      <View padding-16>
        <Text M18 color28>
            {dataRecipe.Nombre}
        </Text>
        <View row marginT-8>
          <View row centerV>
            <Image source={Assets.icons.ic_calories_burn} />
            <Text R14 color6D marginL-4>
              {dataRecipe.Cals} cal
            </Text>
          </View>
          <View row marginL-24 centerV>
            <Image source={Assets.icons.ic_calories_burn} />
            <Text R14 color6D marginL-4>
              {dataRecipe.Prot} prot
            </Text>
          </View>
          <View row marginL-24 centerV>
            <Image source={Assets.icons.ic_time_16} />
            <Text R14 color6D marginL-4>
              {dataRecipe.CostoKilo} soles
            </Text>
          </View>
        </View>
      </View>
    </SwipeableItemRecipe>
  );
};

export default ItemIngredient;

const styles = StyleSheet.create({});
