import { height, width, bottom } from "config/scaleAccordingToDevice";
import React from "react";
import { ImageBackground, StyleSheet, Platform } from "react-native";
import { View, Text, Assets, Image, Button, Colors } from "react-native-ui-lib";
import Carousel from "react-native-snap-carousel";
import PaginationBottom from "./components/PaginationBottom";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useNavigation } from "@react-navigation/native";
import Routes from "config/Routes";
const SLIDER_WIDTH = width;
const ITEM_WIDTH = SLIDER_WIDTH;
const ITEM_HEIGHT = height;
const DATA = [
  {
    bg: require("images/BG_1.png"),
    title: "Consejos simples para equilibrar su mente, cuerpo y alma",
  },
  {
    bg: require("images/BG_2.png"),
    title: `Pequeña
los cambios pueden hacer una gran diferencia`,
  },
  {
    bg: require("images/BG_3.png"),
    title: "Comparte tu plan de entrenamiento con tus amigos",
  },
  {
    bg: require("images/BG_4.png"),
    title: "Realice un seguimiento de sus datos de nutrición, estado físico y salud",
  },
  {
    bg: require("images/BG_5.png"),
    title: "",
  },
];

const Walkthoughs = () => {
  const [index, setIndex] = React.useState(0);
  const refCarousel = React.useRef("");
  const { navigate } = useNavigation();
  const onSkip = React.useCallback(() => {
    refCarousel?.current?.snapToItem(4, false);
  }, []);

  const onNext = React.useCallback(() => {
    if (index === DATA.length - 1) {
      navigate(Routes.Login);
    } else {
      setIndex((prev) => prev + 1);
      refCarousel?.current?.snapToNext();
    }
  }, [index]);

  const _renderItem = React.useCallback(({ item, index }) => {
    if (index === DATA.length - 1) {
      return (
        <ImageBackground source={item.bg} style={styles.container}>
          <View flex centerH centerV>
            <Image source={Assets.icons.logoIntro} />
            <Text B24 contentW marginV-24>
              Amuray
            </Text>
            <Text center contentW R18 marginH-24>
              Proyecto de tesis de alumnos de la carrera de ingenieria de software de la Universidad Peruana de Ciencias Aplicadas.{" "}
            </Text>
          </View>
          {/*<Button*/}
          {/*  label="Registrate con Facebook"*/}
          {/*  iconSource={Assets.icons.ic_facebook}*/}
          {/*  backgroundColor={Colors.facebook}*/}
          {/*  style={{ width: width - 48 }}*/}
          {/*/>*/}
          <Button
            label="Registrate con Email"
            iconSource={Assets.icons.ic_email_16}
            backgroundColor={Colors.contentW}
            style={{ width: width - 48, shadowColor: "rgba(0,0,0,0.15)" }}
            color={Colors.content28}
            marginV-24
            enableShadow
            onPress={() => {
              navigate(Routes.SignUp);
            }}
          />
        </ImageBackground>
      );
    }
    return (
      <ImageBackground
        source={item.bg}
        style={styles.container}
        resizeMode="cover"
      >
        <Text H2B contentW marginH-24 uppercase>
          {item.title}
        </Text>
      </ImageBackground>
    );
  }, []);
  return (
    <View flex backgroundColor={"black"}>
      <Carousel
        data={DATA}
        renderItem={_renderItem}
        sliderWidth={SLIDER_WIDTH}
        sliderHeight={ITEM_HEIGHT}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        onSnapToItem={setIndex}
        inactiveSlideScale={1}
        bounces={false}
          // firstItem={4}
        ref={refCarousel}
      />
      <PaginationBottom
          index={index}
          onSkip={onSkip}
          onNext={onNext}
          dotsLength={DATA.length}
      />
    </View>
  );
};

export default Walkthoughs;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: Platform.OS === "android" ? height + 30 : height,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 80 + getBottomSpace(),
  },
});
