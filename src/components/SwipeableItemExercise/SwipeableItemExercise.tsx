import React, {useCallback, useRef} from "react";
import { Animated, StyleSheet } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, Assets } from "react-native-ui-lib";
import Routes from "config/Routes";
import {useNavigation} from "@react-navigation/native";
import ListRecipes from "modules/ListRecipes";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db} from "config/fb";
import Diary from "modules/Diary";
import ListDetailRecipes from "modules/ListDetailRecipes";
const SwipeableItemExercise = ({ children, dataExercise, dia}) => {
  const nvg = useNavigation();
  const { navigate } = useNavigation();
  const swipeableRef = useRef(null);

  const deleteRecipe = React.useCallback(async () => {
    dataExercise.data.dias = dataExercise.data.dias.filter((item) => item !== dia);
    if (dataExercise.data.dias.length === 0) { 
      await deleteDoc(doc(db, "Ejercicios", dataExercise.id)).then( ()=>{
        swipeableRef.current.close();
        navigate(Routes.Exercires);
      });
    } else {
      await setDoc(doc(db, "Ejercicios", dataExercise.id), dataExercise.data).then( ()=>{
        swipeableRef.current.close();
        navigate(Routes.Exercires);
      }
      );
    }

  }, []);



  const renderRightActions = useCallback((progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-400, -160, 0],
      outputRange: [0, 0, 160],
    });
    return (
      <Animated.View
        style={{
          transform: [{ translateX: trans }],
        }}
      >
        <LinearGradient
          colors={["#FF5E3A", "#FF2A68"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linear}
        >
          <RectButton style={styles.btn} onPress={deleteRecipe}>
            <Image source={Assets.icons.ic_delete_wo_plan} marginB-8 />
            <Text R12 white>
              Eliminar
            </Text>
          </RectButton>

        </LinearGradient>
      </Animated.View>
    );
  }, []);
  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>{children}</Swipeable>
  );
};

export default SwipeableItemExercise;

const styles = StyleSheet.create({
  linear: {
    flexDirection: "row",
    width: 160,
    height: "100%",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    flex: 1,
  },
});
