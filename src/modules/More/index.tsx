import { useNavigation } from "@react-navigation/native";
import Header from "components/Header";
import Routes from "config/Routes";
import { width } from "config/scaleAccordingToDevice";
import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { View, Colors, Assets, Image, Text } from "react-native-ui-lib";
import {auth} from "config/fb";
import {signOut} from "firebase/auth";

const widthItem = (width - 48) / 2;
const More = () => {
  const { navigate } = useNavigation();
  const DATA = [
    {
      icon: Assets.icons.ic_upgrade_pro,
      title: "Actualizar Pro",
    },
    {
      icon: Assets.icons.ic_my_profile,
      title: "Mi perfil",
      onPress: () => navigate(Routes.MyProfile),
    },
    {
      icon: Assets.icons.ic_my_food,
      title: "Mis comidas y recetas",
      onPress: () => navigate(Routes.MyFoodAndRecipe),
    },
    {
      icon: Assets.icons.ic_graph,
      title: "Graficos",
      onPress: () => navigate(Routes.Graph),
    },
    {
      icon: Assets.icons.ic_watch,
      title: "Aplicaciones y dispositivos",
      onPress: () => navigate(Routes.AppsAndDevices),
    },
    {
      icon: Assets.icons.ic_blog,
      title: "Blog",
      onPress: () => navigate(Routes.Blog),
    },
    {
      icon: Assets.icons.ic_help,
      title: "Cerrar sesión",
      onPress: () => {
        Alert.alert(
            '',
            '¿ Estas seguro que quieres cerrar tu sesion en este dispositivo',
            [
              {text: 'Cancelar', onPress: () => console.log('OK Pressed'), style: 'cancel'},
              {text: 'Si', onPress: () => {
                  signOut(auth).then(() => {
                    navigate(Routes.Login)
                    console.log('OK Pressed')
                  }).catch((error) => {
                    console.log(error);
                  });
                }},
            ],
            { cancelable: false }
        )
      },
    },
    {
      icon: Assets.icons.ic_settings,
      title: "Ajustes",
    },
  ];
  return (
    <View flex backgroundColor={Colors.background}>
      <Header title={"More"} />
      <ScrollView>
        <View flex row style={{ flexWrap: "wrap", paddingTop: 16 }}>
          {DATA.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: widthItem,
                  height: (widthItem / 164) * 146,
                  borderRadius: 6,
                  marginLeft: 16,
                  marginBottom: 16,
                  backgroundColor: Colors.white,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={item.onPress}
              >
                <Image source={item.icon} />
                <Text M14 color28 marginT-16>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({});
