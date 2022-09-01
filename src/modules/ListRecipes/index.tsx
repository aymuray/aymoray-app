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
const widthItem = (width - 48) / 2;
const ListRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipesTemp, setRecipesTemp] = useState([]);
  const [uid, setUid] = useState('');
  const [IsRefreshing, setIsRefreshing] = useState(true);

    const { navigate } = useNavigation();
    const isFocused = useIsFocused();

    // useFocusEffect( React.useCallback(()=>{
    //     getRecipe();
    // }, [uid, recipes]))


    useEffect(() => {
        if (isFocused) {
            console.log('In inFocused Block', isFocused);
            getRecipe();
        }
    }, [ isFocused ,uid]);

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
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                temp.push(
                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                )
            });
            console.log('cantidad local', recipes.length);
            console.log('cantidad firebase', temp.length);
            if (recipes.length != temp.length) {
                setRecipes(temp);
                console.log('----se actualizo--------')
            }
            setIsRefreshing(false);
        }catch (e){
            console.log(e);
        }
        setIsRefreshing(true);
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
                      <View key={index}>
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
