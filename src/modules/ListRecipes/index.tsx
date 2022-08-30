import {useFocusEffect, useNavigation} from "@react-navigation/native";
import HeaderWithSearch from "components/HeaderWithSearch";
import Routes from "config/Routes";
import { width } from "config/scaleAccordingToDevice";
import React, {useCallback, useEffect, useState} from "react";
import {LogBox, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import { View, Assets, Colors, Image, Text } from "react-native-ui-lib";
import BoxExercire from "./components/BoxExercire";
import Box from "components/Box";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";
import {doc, getDocs, query, collection, where} from "firebase/firestore";
import ItemRecipe from "components/ItemRecipe";
const widthItem = (width - 48) / 2;
const ListRecipes = () => {
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [calorias, setCalorias] = useState('');
  const [uid, setUid] = useState('');
  const { navigate } = useNavigation();

    useFocusEffect(
        () => {
            getRecipe().then(r => setRecipes(r));
        }
    );

  const getRecipe = async () => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
              setName(user.displayName);
              setUid(user.uid);
          }
      })
      const q = query(collection(db, "Menus"), where("idUser", "==", uid));

      let temp = []
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          temp.push(
              {
                  id: doc.id,
                  data:doc.data(),
              }
          )
      });
      return temp
  };


  const goSearchExercires = useCallback(() => {
    navigate(Routes.SearchExercires);
  }, []);
  return (
    <View flex>
      <HeaderWithSearch title="Lista de recetas" onPress={goSearchExercires} />
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
                      Tus recetas
                  </Text>
              </View>
              {recipes.map((item, index) => {
                  return (
                      <View>
                          <View height={1} backgroundColor={Colors.line} />
                          <ItemRecipe dataRecipe={item}/>
                      </View>
                  )}
              )}

          </View>
      </ScrollView>
    </View>
  );
};

export default ListRecipes;

const styles = StyleSheet.create({});
