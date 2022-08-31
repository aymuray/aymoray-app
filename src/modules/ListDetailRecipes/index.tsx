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
        console.log(props.route.params.dataRecipe.data.Recetas);
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
          {props.route.params.dataRecipe.data.dias >= 1 ?
              <View
                  marginH-16
                  marginB-16
                  style={{
                      borderRadius: 6,
                      backgroundColor: "rgb(187,238,199)",
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
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Desayuno
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno.segundoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Almuerzo
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo.cuartoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Snack
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack.segundoElemeto}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Cena
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo.cuartoElemento}/>
                  </View>

              </View>
              : null }
          {props.route.params.dataRecipe.data.dias >= 2 ?
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
                          dia 2
                      </Text>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Desayuno
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno2.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno2.segundoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Almuerzo
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo2.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo2.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo2.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo2.cuartoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Snack
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack2.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack2.segundoElemeto}/>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Cena
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo2.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo2.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo2.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo2.cuartoElemento}/>
                  </View>

              </View>
              : null }
          {props.route.params.dataRecipe.data.dias >= 3 ?
              <View
                  marginH-16
                  marginB-16
                  style={{
                      borderRadius: 6,
                      backgroundColor: "rgb(187,238,199)",
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
                          dia 3
                      </Text>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Desayuno
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno3.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno3.segundoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Almuerzo
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo3.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo3.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo3.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo3.cuartoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Snack
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack3.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack3.segundoElemeto}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Cena
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo3.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo3.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo3.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo3.cuartoElemento}/>
                  </View>

              </View>
              : null }
          {props.route.params.dataRecipe.data.dias >= 4 ?
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
                          dia 4
                      </Text>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Desayuno
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno4.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno4.segundoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Almuerzo
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo4.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo4.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo4.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo4.cuartoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Snack
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack4.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack4.segundoElemeto}/>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Cena
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo4.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo4.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo4.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo4.cuartoElemento}/>
                  </View>

              </View>
              : null }
          {props.route.params.dataRecipe.data.dias >= 5 ?
              <View
                  marginH-16
                  marginB-16
                  style={{
                      borderRadius: 6,
                      backgroundColor: "rgb(187,238,199)",
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
                          dia 5
                      </Text>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Desayuno
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno5.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno5.segundoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Almuerzo
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo5.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo5.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo5.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo5.cuartoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Snack
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack5.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack5.segundoElemeto}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Cena
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo5.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo5.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo5.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo5.cuartoElemento}/>
                  </View>

              </View>
              : null }
          {props.route.params.dataRecipe.data.dias >= 6 ?
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
                          dia 6
                      </Text>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Desayuno
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno6.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno6.segundoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Almuerzo
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo6.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo6.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo6.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo6.cuartoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Snack
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack6.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack6.segundoElemeto}/>
                  </View>
                  <View height={1} backgroundColor={Colors.line} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Cena
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo6.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo6.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo6.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.line} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo6.cuartoElemento}/>
                  </View>
              </View>
              : null }
          {props.route.params.dataRecipe.data.dias >= 7 ?
              <View
                  marginH-16
                  marginB-16
                  style={{
                      borderRadius: 6,
                      backgroundColor: "rgb(187,238,199)",
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
                          dia 5
                      </Text>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Desayuno
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno7.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.desayuno7.segundoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Almuerzo
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo7.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo7.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo7.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo7.cuartoElemento}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Snack
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack7.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.snack7.segundoElemeto}/>
                  </View>
                  <View height={1} backgroundColor={Colors.color28} marginB-16 />
                  <Text H14 red30 style={{ paddingLeft: 10, paddingBottom: 15}}>
                      Cena
                  </Text>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo7.primerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo7.segundoElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo7.tercerElemento}/>
                  </View>
                  <View >
                      <View height={1} backgroundColor={Colors.color28} />
                      <ItemIngredient dataRecipe={props.route.params.dataRecipe.data.Recetas.almuerzo7.cuartoElemento}/>
                  </View>

              </View>
              : null }
      </ScrollView>
    </View>
  );
};

export default ListDetailRecipes;

const styles = StyleSheet.create({});
