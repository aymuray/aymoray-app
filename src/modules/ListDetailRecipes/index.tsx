import {useFocusEffect, useNavigation} from "@react-navigation/native";
import HeaderWithSearch from "components/HeaderWithSearch";
import Routes from "config/Routes";
import { width } from "config/scaleAccordingToDevice";
import React, {useCallback, useEffect, useState} from "react";
import {LogBox, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import { View, Assets, Colors, Image, Text } from "react-native-ui-lib";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";
import {doc, getDocs, query, collection, where} from "firebase/firestore";
import ItemRecipe from "components/ItemRecipe";
import { useIsFocused } from '@react-navigation/native';
import ItemIngredient from "components/ItemIngredient";
const widthItem = (width - 48) / 2;
const ListDetailRecipes = (props) => {
  const [recipe, setRecipe] = useState(props.route.params.dataRecipe.data);

  const [IsRefreshing, setIsRefreshing] = useState(true);

    const { navigate } = useNavigation();

    useEffect(()=>{
        console.log(props.route.params.dataRecipe.data.Recetas.desayuno);
        // console.log(recipe.desayuno.primerElemento);
    })


  return (
    <View flex>
      <ScrollView>
        <View
            row
            paddingT-16
            style={{
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
        >
        </View>
          {props.route.params.dataRecipe.data.dias <= 1 ?
              <View
                  marginH-16
                  marginB-16
                  style={{
                      borderRadius: 6,
                      shadowColor: "#000",
                      shadowOffset: {
                          width: 0,
                          height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      elevation: 3,
                  }}
                  backgroundColor={Colors.white}
              >
                  <View
                      row
                      paddingH-16
                      paddingV-12
                      style={{ justifyContent: "space-between", alignItems: "center" }}
                  >
                      <Text H14 color28 uppercase>
                          dia 1
                      </Text>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 color28 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Desayuno
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno.segundoElemento}/>
                  </View>

              </View>
              : null }
      </ScrollView>
    </View>
  );
};

export default ListDetailRecipes;

const styles = StyleSheet.create({});
