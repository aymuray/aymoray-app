import { useNavigation } from "@react-navigation/native";
import React from "react";
import Header from "components/Header";
import Routes from "config/Routes";
import { width } from "config/scaleAccordingToDevice";
import { View, Colors, Assets, Image, Text } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native-gesture-handler";

const widthItem = (width - 48) / 2;

export const SettingScreen = () => {
    const { navigate } = useNavigation();

    const DATA = [
        {
          icon: Assets.icons.ic_settings,
          title: "Configuración",
          onPress: () => navigate(Routes.Graph),
        },
        {
            icon: Assets.icons.ic_upgrade_pro,
            title: "Opción 2",
        },
        {
            icon: Assets.icons.ic_upgrade_pro,
            title: "Opción 3",
        },
        {
            icon: Assets.icons.ic_upgrade_pro,
            title: "Opción 4",
        },
    ];
    return (
        <View flex backgroundColor={Colors.background}>
          <Header title={"Ajustes"} back/>
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
        </View>
      );
}