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
            getRecipe().then(r => console.log('---'));
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
          temp.push(doc.data())
      });
      setRecipes(temp);
      return recipes
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
          {recipes.map((item, index) => {
                return (
                    <Box>
                      <View
                          row
                          paddingH-16
                          paddingV-12
                          style={{justifyContent: 'space-between', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
                        <Text M14 color28 marginT-16 style={{ paddingLeft: 16 }}>
                          Dias <Text B14>{item.dias}</Text>,
                          {"\n"}Catidad de calorias por dias: <Text B14>{item.caloriaObjetivo}</Text>,
                          {"\n"}Catidad de proteinas por dias: <Text B14>{item.proteinaObjetivo}</Text>,
                          {"\n"}Fecha de creacion: <Text B14>{item.FechaCreacion.toDate().toLocaleDateString('es-ES')}</Text>,
                        </Text>
                      </View>
                      {/*<View height={1} backgroundColor={Colors.line} marginB-16 />*/}
                    </Box>
                )}
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ListRecipes;

const styles = StyleSheet.create({});
