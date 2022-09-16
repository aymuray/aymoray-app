import BarChart from "components/BarChart";
import Box from "components/Box";
import ButtonLinear from "components/ButtonLinear";
import Header from "components/Header";
import ItemFoodDetail from "components/ItemFoodDetail";
import { FONTS } from "config/FoundationConfig";
import React, {useEffect, useState} from "react";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Assets, Text, View, Image, Button, Colors } from "react-native-ui-lib";
import {width} from "config/scaleAccordingToDevice";
import {VictoryAxis, VictoryBar, VictoryChart} from "victory-native";
import {useIsFocused} from "@react-navigation/native";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";
import {collection, getDocs, query, where} from "firebase/firestore";

const BreakfastDetail = () => {
  const isFocused = useIsFocused();
  const [recipes, setRecipes] = useState([]);
  const [uid, setUid] = useState('');
  const [sumaCal, setSumaCal] = useState(0);
  const [sumaDesayunoCal, setSumaDesayunoCal] = useState(0);
  const [sumaAlmuerzoCal, setSumaAlmuerzoCal] = useState(0);
  const [sumaCenaCal, setSumaCenaCal] = useState(0);
  const [sumaSnackCal, setSumaSnackCal] = useState(0);
  const [estadistica, setEstadistica] = useState([
    { quarter: 1, earnings: 168 },
    { quarter: 2, earnings: 210 },
    { quarter: 3, earnings: 303 },
    { quarter: 4, earnings: 161 },
  ]);
  const data = [
    { quarter: 1, earnings: 168 },
    { quarter: 2, earnings: 210 },
    { quarter: 3, earnings: 303 },
    { quarter: 4, earnings: 161 },
  ];
  const colors = [
    Colors.color5A,
    Colors.color58,
    Colors.colorFF,
    Colors.color44,
  ];
  const DATA = [
    {
      colorTag: Colors.color5A,
      title: "Almuerzo",
      value: "10.3 g",
      items: ["Saturated fat", "Unsaturated fat"],
    },
    {
      colorTag: Colors.color58,
      title: "Desayno",
      value: "0.8 g",
      items: ["Fiber", "Sugars"],
    },
    {
      colorTag: Colors.buttonLink,
      title: "cena",
      value: "52.9 g",
      items: [],
    },
    {
      colorTag: Colors.color44,
      title: "snack",
      value: "10.3 g",
      items: ["Cholesterol", "Sodium", "Potassium"],
    },
  ];

  useEffect(() => {
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
        let sumaAlmuerzoCalTemp= temp[0].data.Recetas.almuerzo.primerElemento.Cals + temp[0].data.Recetas.almuerzo.segundoElemento.Cals + temp[0].data.Recetas.almuerzo.tercerElemento.Cals + temp[0].data.Recetas.almuerzo.cuartoElemento.Cals;
        let sumaSnackCalTemp= temp[0].data.Recetas.snack.primerElemento.Cals + temp[0].data.Recetas.snack.segundoElemeto.Cals;
        setSumaDesayunoCal(sumaCalTemp);
        setSumaAlmuerzoCal(sumaAlmuerzoCalTemp);
        setSumaCenaCal(sumaAlmuerzoCalTemp);
        setSumaSnackCal(sumaSnackCalTemp)
        let tempEstadistica = [
          { quarter: 1, earnings: sumaCalTemp },
          { quarter: 2, earnings: sumaAlmuerzoCalTemp },
          { quarter: 3, earnings: sumaAlmuerzoCalTemp },
          { quarter: 4, earnings: sumaSnackCalTemp },
        ];
        setEstadistica(tempEstadistica);
        setRecipes(temp);
        setSumaCal(sumaCalTemp +  sumaSnackCalTemp + sumaAlmuerzoCalTemp+ sumaAlmuerzoCalTemp);
      }
    }catch (e){
      console.log(e);
    }
  };

  return (
    <View flex>
      <Header
        title="Detalle alimentacion"
        back
        iconSource={Assets.icons.ic_close_24}
      />
      <ScrollView>
        <View style={{ height: 16 }} />
        <Box>
          <View
              style={{
                width: width - 64,
                height: 300,
                marginHorizontal: 16,
                marginTop: 24,
              }}
          >
            <VictoryChart
                domainPadding={50}
                height={300}
                width={width - 64}
                padding={{ top: -40, bottom: 40, left: 40, right: 20 }}
            >
              <VictoryAxis
                  tickFormat={["Desayuno", "Almuerzo", "Cena", "Snack"]}
                  style={{
                    axis: { stroke: "#E9E9E9" },
                    axisLabel: { fontSize: 20, padding: 20 },
                    ticks: { stroke: "#E9E9E9", size: 5 },
                    tickLabels: {
                      fontSize: 12,
                      padding: 5,
                      fill: "#282C37",
                      fontFamily: FONTS.black,
                    },
                  }}
              />
              <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => `${x}`}
                  maxDomain={1000}
                  tickValues={[0, 200, 400, 600, 800, 1000]}
                  style={{
                    axis: { stroke: "transparent" },
                    axisLabel: { fontSize: 20, padding: 30 },
                    grid: { stroke: "#E9E9E9" },
                    tickLabels: {
                      fontSize: 10,
                      padding: 16,
                      fill: "#6D819C",
                      fontFamily: FONTS.medium,
                    },
                  }}
              />
              <VictoryBar
                  data={estadistica}
                  x="quarter"
                  y="earnings"
                  barWidth={44}
                  style={{
                    data: {
                      fill: ({ datum }) => {
                        return colors[datum._x - 1];
                      },
                    },
                  }}
              />
            </VictoryChart>
          </View>
          <LinearGradient
            colors={["#C644FC", "#5856D6"]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{ x: 1, y: 0 }}
            style={{
              marginHorizontal: 16,
              borderRadius: 6,
              marginBottom: 24,
            }}
          >
            <Text marginL-16 marginT-8 H36 white>
              {sumaCal} Cal
            </Text>
            <Text marginL-16 marginB-16 M14 white>
              Recommended 615 - 820 cal
            </Text>
            <Image
              source={Assets.icons.img_star}
              style={{
                position: "absolute",
                right: 8,
                bottom: 0,
              }}
            />
          </LinearGradient>
        </Box>
        <Box>
          <View
            row
            paddingH-16
            paddingT-13
            paddingB-11
            centerV
            style={{
              justifyContent: "space-between",
            }}
          >
            <Text H14 color28>
              Nutrition Detail
            </Text>
            <Button
              label="More Nutrition Facts"
              link
              color={Colors.buttonLink}
            />
          </View>
          <View height={1} backgroundColor={Colors.line} />
          {DATA.map((item, index) => {
            return <ItemFoodDetail item={item} key={index} />;
          })}
        </Box>
        <Box>
          <Text margin-16 M16 buttonLink>
            What's the ideal macronutrient ratio for Gain weight?
          </Text>
          <View height={1} backgroundColor={Colors.line} />
          <View row paddingH-16 paddingV-24>
            <ButtonLinear
              title="Pro"
              onPress={() => {}}
              style={{ height: 21, width: 37, marginHorizontal: 0 }}
              styleLinear={{
                paddingHorizontal: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
              styleText={{ fontSize: 10, fontFamily: FONTS.heavy }}
            />
            <View marginL-16>
              <Text R14 color28>
                More nutrition detail need Pro account.{"\n"}
                <Text buttonLink onPress={() => {}}>
                  Upgrade Now.
                </Text>
              </Text>
            </View>
          </View>
        </Box>
      </ScrollView>
    </View>
  );
};

export default BreakfastDetail;
