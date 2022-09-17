import Tag from "components/Tag";
import React from "react";
import { View, Image, Text, Colors, Assets } from "react-native-ui-lib";
import SwipeableItem from "components/SwipeableItem/SwipeableItem";
import SwipeableExer from "components/SwipeableExer/SwipeableExer";
const ItemWorkOutPlan = ({ejercicio, dia, getExercices}) => {
  return (
    ejercicio ?
    <SwipeableExer dataExercise={ejercicio} dia={dia} getExercices={getExercices}>
      <View padding-16>
        <View row style={{ alignItems: "center" }}>
          <Tag size={8} color={Colors.color58} />
          <Text R14 color6D marginL-8>
          {ejercicio.tipoEjercicio.charAt(0).toUpperCase() + ejercicio.tipoEjercicio.slice(1)}
          </Text>
        </View>
        <Text M24 color28 marginB-4>
        {ejercicio.nombre.charAt(0).toUpperCase() + ejercicio.nombre.slice(1)}
        </Text>
        <View row>
          <View row style={{ alignItems: "center" }}>
            <Image source={Assets.icons.ic_time_16} />
            <Text R14 color6D marginL-4>
              {ejercicio.minutos.charAt(0).toUpperCase() + ejercicio.minutos.slice(1)} min
            </Text>
          </View>
          <View row style={{ alignItems: "center" }} marginL-24>
            <Image source={Assets.icons.ic_calories_burn} />
            <Text R14 color6D marginL-4>
              {ejercicio.descripcion.charAt(0).toUpperCase() + ejercicio.descripcion.slice(1)}
            </Text>
          </View>
        </View>
      </View>
    </SwipeableExer>:null
  );
};

export default ItemWorkOutPlan;
