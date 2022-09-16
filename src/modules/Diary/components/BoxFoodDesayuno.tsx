import { useNavigation } from "@react-navigation/core";
import ItemFood from "components/ItemFood";
import { FONTS } from "config/FoundationConfig";
import Routes from "config/Routes";
import React, {useEffect, useState} from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { View, Text, Button, Assets, Colors, Image } from "react-native-ui-lib";
import {useIsFocused} from "@react-navigation/native";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";
import {collection, getDocs, query, where} from "firebase/firestore";
import ItemIngredient from "components/ItemIngredient";

const BoxFoodDesayuno = ({ title, onPress }) => {
  const isFocused = useIsFocused();
  const [recipes, setRecipes] = useState([]);
  const [uid, setUid] = useState('');
  const [sumaCal, setSumaCal] = useState(0);
  const { navigate } = useNavigation();
  useEffect(() => {
    console.log(recipes)
    if (isFocused) {
      getRecipe();
    }
  }, [ isFocused ,uid, recipes, sumaCal]);

  const getRecipe = async () => {
    console.log('entre')
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid);
        }
      })
      const q = query(collection(db, "Menus"), where("idUser", "==", uid));

      let temp = []
      let FechaHoy = new Date()
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if(doc.data().FechaCreacion.toDate().toLocaleDateString('es-ES')===FechaHoy.toLocaleDateString('es-ES')){
          temp.push(
              {
                id: doc.id,
                data: doc.data(),
              }
          )
        }
      });
      console.log('cantidad local', recipes.length);
      console.log('cantidad firebase', temp.length);
      if (recipes.length != temp.length) {
        let sumaCalTemp= temp[0].data.Recetas.desayuno.primerElemento.Cals + temp[0].data.Recetas.desayuno.segundoElemento.Cals;
        setRecipes(temp);
        setSumaCal(sumaCalTemp);
      }
    }catch (e){
      console.log(e);
    }
  };


  return (
    <TouchableHighlight
      underlayColor={"rgb(0,0,0)"}
      onPress={() => {
        navigate(Routes.BreakfastDetail);
      }}
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
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: Colors.white,
        overflow: "hidden",
      }}
    >
      <View backgroundColor={Colors.white}>
        <View
          row
          paddingH-16
          paddingV-12
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Text H14 color28 uppercase>
            {title}
          </Text>

        </View>
        <View height={1} backgroundColor={Colors.line} />
        {recipes.length == 1 ?
            <View>
              <View height={1} backgroundColor={Colors.line} />
              <ItemIngredient dataRecipe={recipes[0].data.Recetas.desayuno.primerElemento}/>
              <View height={1} backgroundColor={Colors.line} />
              <ItemIngredient dataRecipe={recipes[0].data.Recetas.desayuno.segundoElemento}/>
              <View height={1} backgroundColor={Colors.line} />
              <View
          paddingT-16
          paddingB-12
          paddingH-16
          row
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <View row style={{ alignItems: "center" }}>
            <Text M24 color28 marginR-8>
              {sumaCal} Cal
            </Text>
            <Image source={Assets.icons.ic_nutrition_info} />
          </View>
          <Text R14 color6D>
            Solo los alimentos cocidos
          </Text>
        </View>
            </View>
            :<View
            paddingT-16
            paddingB-12
            paddingH-16
            row
            style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <View row style={{ alignItems: "center" }}>
            {/* <Image source={Assets.icons.ic_nutrition_info} /> */}
          </View>
          <Text R14 color6D>
              Vaya, esto es lamentable 😒
            </Text>
        </View>}
      </View>
    </TouchableHighlight>
  );
};

export default BoxFoodDesayuno;

const styles = StyleSheet.create({});
