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
import ItemExercise from "components/ItemExercise";

const BoxTraining = ({ title, onPress }) => {
  const isFocused = useIsFocused();
  const [recipes, setRecipes] = useState([]);
  const [uid, setUid] = useState('');
  const [sumaCal, setSumaCal] = useState(0);
  const [dia, setDia] = useState(0);
  const [lunes, setLunes] = useState([]);
  const [martes, setMartes] = useState([]);
  const [miercoles, setMiercoles] = useState([]);
  const [jueves, setJueves] = useState([]);
  const [viernes, setViernes] = useState([]);
  const [sabado, setSabado] = useState([]);
  const [domingo, setDomingo] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [totalMinLunes, setTotalMinLunes] = useState(0);
  const [totalMinMartes, setTotalMinMartes] = useState(0);
  const [totalMinMiercoles, setTotalMinMiercoles] = useState(0);
  const [totalMinJueves, setTotalMinJueves] = useState(0);
  const [totalMinViernes, setTotalMinViernes] = useState(0);
  const [totalMinSabado, setTotalMinSabado] = useState(0);
  const [totalMinDomingo, setTotalMinDomingo] = useState(0);



  const { navigate } = useNavigation();
  useEffect(() => {
    console.log(recipes)
    if (isFocused) {
      let fecha = new Date();
      setDia(fecha.getDay());
      getExercices();
    }
  }, [ isFocused ,uid, recipes, sumaCal, dia, lunes, martes, miercoles, jueves, viernes, sabado, domingo, exercise, totalMinDomingo, totalMinLunes, totalMinMartes, totalMinMiercoles, totalMinJueves, totalMinViernes, totalMinSabado]);

  const getExercices = async () => {
    console.log('++++++++++++++++entre');
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid);
        }
      })

      const q = query(collection(db, "Ejercicios"), where("idUser", "==", uid));

      let temp = []
      let tempLunes = []
      let tempMartes = []
      let tempMiercoles = []
      let tempJueves = []
      let tempViernes = []
      let tempSabado = []
      let tempDomingo = []

      let tempMinutosLunes = 0;
      let tempMinutosMartes = 0;
      let tempMinutosMiercoles = 0;
      let tempMinutosJueves = 0;
      let tempMinutosViernes = 0;
      let tempMinutosSabado = 0;
      let tempMinutosDomingo = 0;


      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        temp.push(doc.data());
        doc.data().dias.forEach( (item) => {
          if (item === "lunes"){
            tempLunes.push(
                {
                  id: doc.id,
                  data: doc.data(),
                }
            )
            tempMinutosLunes = tempMinutosLunes + parseInt(doc.data().minutos);
          }
          if (item === "martes"){
            tempMartes.push(
                {
                  id: doc.id,
                  data: doc.data(),
                }
            )
            tempMinutosMartes = tempMinutosMartes + parseInt(doc.data().minutos);
          }
          if (item === "miercoles"){
            tempMiercoles.push(
                {
                  id: doc.id,
                  data: doc.data(),
                }
            )
            tempMinutosMiercoles = tempMinutosMiercoles + parseInt(doc.data().minutos);
          }
          if (item === "jueves"){
            tempJueves.push(
                {
                  id: doc.id,
                  data: doc.data(),
                }
            )
            tempMinutosJueves = tempMinutosJueves + parseInt(doc.data().minutos);
          }
          if (item === "viernes"){
            tempViernes.push(
                {
                  id: doc.id,
                  data: doc.data(),
                }
            )
            tempMinutosViernes = tempMinutosViernes + parseInt(doc.data().minutos);
          }
          if (item === "sabado"){
            tempSabado.push(
                {
                  id: doc.id,
                  data: doc.data(),
                }
            )
            tempMinutosSabado = tempMinutosSabado + parseInt(doc.data().minutos);
          }
          if (item === "domingo"){
            tempDomingo.push(
                {
                  id: doc.id,
                  data: doc.data(),
                }
            )
            tempMinutosDomingo = tempMinutosDomingo + parseInt(doc.data().minutos);
          }
        })
      });
      if (exercise.length != temp.length) {
        setExercise(temp);
        setLunes(tempLunes);
        setMartes(tempMartes);
        setMiercoles(tempMiercoles);
        setJueves(tempJueves);
        setViernes(tempViernes);
        setSabado(tempSabado);
        setDomingo(tempDomingo);
        setTotalMinLunes(tempMinutosLunes);
        setTotalMinMartes(tempMinutosMartes);
        setTotalMinMiercoles(tempMinutosMiercoles);
        setTotalMinJueves(tempMinutosJueves);
        setTotalMinViernes(tempMinutosViernes);
        setTotalMinSabado(tempMinutosSabado);
        console.log('----------------------', tempMinutosDomingo);
        setTotalMinDomingo(tempMinutosDomingo);
      }

    } catch (e) {
      console.log(e);
    }
  }


  return (
      <View
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
          {dia == 1 ?
              <View>
                {lunes.map((item, index) => {
                  return (
                      <View key={index}>
                        <View height={1} backgroundColor={Colors.color28} />
                        <ItemExercise data={item} dia={"lunes"} />
                      </View>
                  )}
                )}
                <View height={1} backgroundColor={Colors.line} />
                {exercise.length != 0 ? <View
                    paddingT-16
                    paddingB-12
                    paddingH-16
                    row
                    style={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <View row style={{ alignItems: "center" }}>
                    <Text M24 color28 marginR-8>
                      Total Minutos: {totalMinLunes}
                    </Text>
                    <Image source={Assets.icons.ic_nutrition_info} />
                  </View>
                </View>:<View
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
                    Vemos que tienes un día libre 👀
                  </Text>
                </View>}
              </View>
              : null }
          {dia == 2 ?
              <View>
                {martes.map((item, index) => {
                  return (
                      <View key={index}>
                        <View height={1} backgroundColor={Colors.line} />
                        <ItemExercise data={item} dia={"lunes"} />
                      </View>
                  )}
                )}
                <View height={1} backgroundColor={Colors.line} />
                {exercise.length != 0 ? <View
                    paddingT-16
                    paddingB-12
                    paddingH-16
                    row
                    style={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <View row style={{ alignItems: "center" }}>
                    <Text M24 color28 marginR-8>
                      Total Minutos: {totalMinMartes}
                    </Text>
                    <Image source={Assets.icons.ic_nutrition_info} />
                  </View>
                </View>:<View
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
                    Vemos que tienes un día libre 👀
                  </Text>
                </View>}
              </View>
              : null }
          {dia == 3 ?
              <View>
                {miercoles.map((item, index) => {
                  return (
                      <View key={index}>
                        <View height={1} backgroundColor={Colors.line} />
                        <ItemExercise data={item} dia={"lunes"} />
                      </View>
                  )}
                )}
                <View height={1} backgroundColor={Colors.line} />
                {exercise.length != 0 ? <View
                    paddingT-16
                    paddingB-12
                    paddingH-16
                    row
                    style={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <View row style={{ alignItems: "center" }}>
                    <Text M24 color28 marginR-8>
                      Total Minutos: {totalMinMiercoles}
                    </Text>
                    <Image source={Assets.icons.ic_nutrition_info} />
                  </View>
                </View>:<View
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
                    Vemos que tienes un día libre 👀
                  </Text>
                </View>}
              </View>
              : null }
          {dia == 4 ?
              <View>
                {jueves.map((item, index) => {
                  return (
                      <View key={index}>
                        <View height={1} backgroundColor={Colors.line} />
                        <ItemExercise data={item} dia={"lunes"} />
                      </View>
                  )}
                )}
                <View height={1} backgroundColor={Colors.line} />
                {exercise.length != 0 ? <View
                    paddingT-16
                    paddingB-12
                    paddingH-16
                    row
                    style={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <View row style={{ alignItems: "center" }}>
                    <Text M24 color28 marginR-8>
                      Total Minutos: {totalMinJueves}
                    </Text>
                    <Image source={Assets.icons.ic_nutrition_info} />
                  </View>
                </View>:<View
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
                    Vemos que tienes un día libre 👀
                  </Text>
                </View>}
              </View>
              : null }
          {dia == 5 ?
              <View>
                {viernes.map((item, index) => {
                  return (
                      <View key={index}>
                        <View height={1} backgroundColor={Colors.line} />
                        <ItemExercise data={item} dia={"lunes"} />
                      </View>
                  )}
                )}
                <View height={1} backgroundColor={Colors.line} />
                {exercise.length != 0 ? <View
                    paddingT-16
                    paddingB-12
                    paddingH-16
                    row
                    style={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <View row style={{ alignItems: "center" }}>
                    <Text M24 color28 marginR-8>
                      Total Minutos: {totalMinViernes}
                    </Text>
                    <Image source={Assets.icons.ic_nutrition_info} />
                  </View>
                </View>:<View
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
                    Vemos que tienes un día libre 👀
                  </Text>
                </View>}
              </View>
              : null }
          {dia == 6 ?
              <View>
                {sabado.map((item, index) => {
                  return (
                      <View key={index}>
                        <View height={1} backgroundColor={Colors.line} />
                        <ItemExercise data={item} dia={"lunes"} />
                      </View>
                  )}
                )}
                <View height={1} backgroundColor={Colors.line} />
                {exercise.length != 0 ? <View
                    paddingT-16
                    paddingB-12
                    paddingH-16
                    row
                    style={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <View row style={{ alignItems: "center" }}>
                    <Text M24 color28 marginR-8>
                      Total Minutos: {totalMinSabado}
                    </Text>
                    <Image source={Assets.icons.ic_nutrition_info} />
                  </View>
                </View>:<View
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
                    Vemos que tienes un día libre 👀
                  </Text>
                </View>}
              </View>
              : null }
          {dia == 0 ?
              <View>
                {domingo.map((item, index) => {
                  return (
                      <View key={index}>
                        <View height={1} backgroundColor={Colors.line} />
                        <ItemExercise data={item} dia={"lunes"} />
                      </View>
                  )}
                )}
                <View height={1} backgroundColor={Colors.line} />
                {exercise.length != 0 ? <View
                    paddingT-16
                    paddingB-12
                    paddingH-16
                    row
                    style={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <View row style={{ alignItems: "center" }}>
                    <Text M24 color28 marginR-8>
                      Total Minutos: {totalMinDomingo}
                    </Text>
                    <Image source={Assets.icons.ic_nutrition_info} />
                  </View>
                </View>:<View
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
                    Vemos que tienes un día libre 👀
                  </Text>
                </View>}
              </View>
              : null }
        </View>
      </View>
  );
};

export default BoxTraining;

const styles = StyleSheet.create({});
