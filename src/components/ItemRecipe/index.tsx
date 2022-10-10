import SwipeableItem from "components/SwipeableItem/SwipeableItem";
import Tag from "components/Tag";
import React, {useEffect} from "react";
import { StyleSheet } from "react-native";
import { Assets, Colors, View, Text, Image } from "react-native-ui-lib";
import SwipeableItemRecipe from "components/SwipeableItemRecipe/SwipeableItemRecipe";
import Routes from "config/Routes";
import {useNavigation} from "@react-navigation/native";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const ItemRecipe = ({dataRecipe}) => {
  const { navigate } = useNavigation();

  const detailRecipe = React.useCallback(async (item) => {
    navigate(Routes.ListDetailRecipes, {dataRecipe: item});
  }, []);

  return (
    <SwipeableItemRecipe dataRecipe={dataRecipe}>
      <TouchableWithoutFeedback onPress={() => detailRecipe(dataRecipe)}>
        <View padding-16>
          <Text M18 color28>
            Fecha creacion : {dataRecipe.data.FechaCreacion.toDate().toLocaleDateString('es-ES')}
          </Text>
          <View row marginT-8>
            <View row centerV>
              <Image source={Assets.icons.ic_calories_burn} />
              <Text R14 color6D marginL-4>
                {dataRecipe.data.caloriaObjetivo} cal
              </Text>
            </View>
            <View row marginL-24 centerV>
              <Image source={Assets.icons.ic_calories_burn} />
              <Text R14 color6D marginL-4>
                {dataRecipe.data.proteinaObjetivo} prot
              </Text>
            </View>
            <View row marginL-24 centerV>
              <Image source={Assets.icons.ic_time_16} />
              <Text R14 color6D marginL-4>
                {dataRecipe.data.dias} dias
              </Text>
            </View>
            {/*{!!rating && (*/}
            {/*  <View row marginL-24 centerV>*/}
            {/*    <Image source={Assets.icons.ic_rating_16} />*/}
            {/*    <Text R14 color6D marginL-4>*/}
            {/*      10*/}
            {/*    </Text>*/}
            {/*  </View>*/}
            {/*)}*/}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SwipeableItemRecipe>
  );
};

export default ItemRecipe;

const styles = StyleSheet.create({});
