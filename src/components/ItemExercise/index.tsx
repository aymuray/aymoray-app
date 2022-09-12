import SwipeableItem from "components/SwipeableItem/SwipeableItem";
import Tag from "components/Tag";
import React, {useEffect} from "react";
import { StyleSheet } from "react-native";
import { Assets, Colors, View, Text, Image } from "react-native-ui-lib";
import SwipeableItemRecipe from "components/SwipeableItemRecipe/SwipeableItemRecipe";
import SwipeableItemExercise from "components/SwipeableItemExercise/SwipeableItemExercise";
import Routes from "config/Routes";


const ItemExercise = ({data, dia}) => {
  return (
    <SwipeableItemExercise dataExercise={data} dia={dia}>
      <View padding-16>
        <Text M18 color28>
          {data.data.nombre}
        </Text>
        <Text M10 color28>
          Descripción: {data.data.descripcion}
        </Text>
        <View row marginT-8>
          <View row centerV>
            <Image source={Assets.icons.ic_calories_burn} />
            <Text R14 color6D marginL-4>
              {data.data.tipoEjercicio}
            </Text>
          </View>
          <View row marginL-24 centerV>
            <Image source={Assets.icons.ic_time_16} />
            <Text R14 color6D marginL-4>
              {data.data.minutos} min
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
    </SwipeableItemExercise>
  );
};

export default ItemExercise;

const styles = StyleSheet.create({});
