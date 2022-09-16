import { useNavigation } from "@react-navigation/core";
import ButtonIconBadge from "components/ButtonIconBadge";
import ItemWorkOutPlan from "components/ItemWorkOutPlan";
import SegmentedRoundDisplay from "components/SegmentedRoundDisplay";
import { FONTS } from "config/FoundationConfig";
import Routes from "config/Routes";
import { width } from "config/scaleAccordingToDevice";
import React, { useEffect, useState } from "react";
import { LogBox, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import {
  Text,
  View,
  Image,
  Assets,
  Button,
  Colors,
  Avatar,
} from "react-native-ui-lib";
import BoxFood from "./components/BoxFood";
import BoxWater from "./components/BoxWater";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";

import BoxFoodAlmuerzo from "modules/Diary/components/BoxFoodAlmuerzo";
import BoxFoodDesayuno from "modules/Diary/components/BoxFoodDesayuno";
import BoxFoodSnack from "modules/Diary/components/BoxFoodSnack";
import BoxTraining from "modules/Diary/components/BoxTraining";
import {doc, getDoc, getDocs, query, collection, where} from "firebase/firestore";
import ListDetailRecipes from "modules/ListDetailRecipes";
import ListDashboardRecipes from "modules/ListDashboardRecipes";
import { useIsFocused } from '@react-navigation/native';


const Diary = () => {
  const { navigate } = useNavigation();
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [peso, setPeso] = useState('');
  const [uid, setUid] = useState('');
  const [grasaCoporal, setGrasaCoporal] = useState('');
  const [fechaPeso, setFechaPeso] = useState('');

  interface RoundDisplayData {
    nutrientTitle: string;
    nutrientEaten: number;
    nutrientTotal: number;
    description: string;
  }
  const [roundDisplayData, setRoundDisplayData] = useState<RoundDisplayData[]>([
    {
      nutrientTitle: 'Calorías',
      nutrientEaten: 180,
      nutrientTotal: 300,
      description: '',
    },
    {
      nutrientTitle: 'Proteínas',
      nutrientEaten: 250,
      nutrientTotal: 500,
      description: '',
    },
    {
      nutrientTitle: 'Grasas',
      nutrientEaten: 50,
      nutrientTotal: 150,
      description: '',
    },
  ]);

  const [nutrientRef, setNutrienRef] = useState<number>(0);

  const nextNutrient = () => {
    if (nutrientRef === 0) {
      setNutrienRef(nutrientRef + 1);
    } else if (nutrientRef === 1) {
      setNutrienRef(nutrientRef + 1);
    } else {
      setNutrienRef(0);
    }
  }

  const previusNutrient = () => {
    if (nutrientRef === 2) {
      setNutrienRef(nutrientRef - 1);
    } else if (nutrientRef === 1) {
      setNutrienRef(nutrientRef - 1);
    } else {
      setNutrienRef(2);
    }
  }
  
  // Agregado
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();
  const [IsRefreshing, setIsRefreshing] = useState(true);

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

  useEffect(async () => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
              setName(user.displayName);
              setUid(user.uid);
          }
      })

  useEffect(async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        setUid(user.uid);
      }
    })
      const docRef = doc(db, "usuarios", uid);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
      setFechaPeso(docSnap.data().UltimaAltulizacionPeso.toDate().toLocaleDateString('es-ES'))
      setGrasaCoporal(parseInt(docSnap.data().GC))
      setPeso(docSnap.data().peso);
      LogBox.ignoreLogs(["timer"]);
  }, [uid]);

  return (
    <View flex style={{ paddingTop: getStatusBarHeight(true) }}>
      <Image
        source={Assets.icons.bg_tab}
        style={{ position: "absolute", width: width }}
      />
      <ScrollView>
        <ButtonIconBadge source={Assets.icons.ic_notification} label={"2"} />
        <View row paddingL-16>
          <Avatar source={Assets.icons.avatar} size={48} />
          <Text R14 contentW style={{ paddingLeft: 16 }}>
            Hola <Text B14>{name}</Text>,{"\n"}Las cosas se ven bien.
          </Text>
        </View>
        <View
          marginH-16
          marginT-24
          marginB-16
          row
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
          <View paddingV-16 paddingL-16 flex>
            <Text R16 color6D>
              Tu meta
            </Text>
            <Text M24 color28 marginT-8>
              Peder peso
            </Text>
          </View>
          <View width={1} backgroundColor={Colors.line} />
          <View paddingV-16 paddingL-16 flex>
            <Text R16 color6D>
              ultima actualizacion de peso, {fechaPeso}
            </Text>
            <View row centerV>
              <Text M36 color28 marginR-16>
                {peso} {" "}
                <Text R18 color28>
                  kg
                </Text>
              </Text>

              <Image source={Assets.icons.graph} />
            </View>
          </View>
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
            padding-16
            row
            style={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button onPress={() => previusNutrient()} iconSource={Assets.icons.btn_back_day} />
            <Text R14 color28>
              {roundDisplayData[nutrientRef].nutrientTitle}
            </Text>
            <Button onPress={() => nextNutrient()} iconSource={Assets.icons.btn_next_day} />
          </View>
          <View
            row
            paddingB-24
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text M24 color28>
                {roundDisplayData[nutrientRef].nutrientEaten}
              </Text>
              <Text R14 color6D>
                Grasa
              </Text>
                <Text R14 color6D>
                    Coporal
                </Text>
            </View>
            <View height={133} width={133}>
              <SegmentedRoundDisplay
                data={roundDisplayData[nutrientRef].nutrientEaten}
                maxValue={roundDisplayData[nutrientRef].nutrientTotal}
                width={133}
                size={130}
                strokeWidth={6}
                numberOfSection={4}
                startAngle={-55}
                endAngle={235}
                dataTitleFaltante={roundDisplayData[nutrientRef].nutrientTitle + ' restante'} />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  borderWidth: 1,
                  borderRadius: 100,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderColor: Colors.line,
                  bottom: 0,
                  alignSelf: "center",
                }}
                onPress={() => {
                  navigate(Routes.DailyDetail);
                }}
              >
                <Text H10 color6D>
                  Detalle
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text M24 color28>
                  18 %
              </Text>
              <Text R14 color6D>
                requisito
              </Text>
                <Text R14 color6D>
                    minimo
                </Text>
            </View>
          </View>
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
              Plan de entrenamiento
            </Text>
            <Button
              iconSource={Assets.icons.ic_add_16}
              label={"Añadir plan"}
              link
              color={Colors.buttonLink}
              labelStyle={{ fontSize: 14, fontFamily: FONTS.medium }}
              onPress={() => navigate(Routes.WorkoutSchedule)}
            />
          </View>
          <View height={1} backgroundColor={Colors.line} />
          <ItemWorkOutPlan />
        </View>
        <BoxFood
        <BoxTraining
          title={"Plan de entrenamiento"}
          onPress={() => {
              navigate(Routes.AddFood);
          }}/>
        <BoxFoodDesayuno

          title={"DESAYUNO"}
          onPress={() => {
            navigate(Routes.AddFood);
          }}
        />
        <BoxFoodAlmuerzo
          title={"ALMUERZO"}
          onPress={() => {
            navigate(Routes.AddFood);
          }}
        />
        <BoxFoodAlmuerzo
          title={"CENA"}
          onPress={() => {
            navigate(Routes.AddFood);
          }}
        />
        <BoxFoodSnack
          title={"Snack"}
          onPress={() => {
            navigate(Routes.AddFood);
          }}
        />
        <BoxWater title={"Agua"} />
 
        {/* <ListDashboardRecipes dataRecipe={} /> */}
        
      </ScrollView>
    </View>
  );
};

export default Diary;

const styles = StyleSheet.create({});
