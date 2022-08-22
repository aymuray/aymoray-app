import {useNavigation} from '@react-navigation/native';
import FooterLinear from 'components/FooterLinear';
import Routes from 'config/Routes';
import {height, width} from 'config/scaleAccordingToDevice';
import React, {useCallback, useEffect, useState} from 'react';
import {LogBox, StyleSheet} from 'react-native';
import Carousel, {getInputRangeFromIndexes} from 'react-native-snap-carousel';
import {View, Text, Colors, Image, Assets} from 'react-native-ui-lib';
import {auth, db} from "config/fb";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
const DATA = [
  {
    title: "Fútbol",
  },
  {
    title: "Voleibol",
  },
  {
    title: "Surf",
  },
];

const SLIDER_WIDTH = width;
const ITEM_WIDTH = Math.round((SLIDER_WIDTH * 279) / 375);
const ITEM_HEIGHT = Math.round((height / 812) * 450);
const TRANSLATE_VALUE = Math.round((SLIDER_WIDTH * 0.6) / 4);
const TRANSLATE_VALUE_Y = Math.round((ITEM_HEIGHT * 0.1) / 4);

const StepTwo = () => {
  const {navigate} = useNavigation();
  const [uid, setUid] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if (user) {
        setUid(user.uid);
      }

    })
    LogBox.ignoreLogs(["timer"]);
  }, []);


  const onNext = useCallback(async () => {
    if (index===0){
      const docRef = doc(db, "usuarios", uid)
      const docSnap = await getDoc(docRef);
      let data = docSnap.data()
      data.deporte = 'Futbol'
      await setDoc(docRef, data).then(()=>{
        console.log('Se acutailizo')
        navigate(Routes.StepThree);
      })
    }if (index===1){
      const docRef = doc(db, "usuarios", uid)
      const docSnap = await getDoc(docRef);
      let data = docSnap.data()
      data.deporte = 'voley'
      await setDoc(docRef, data).then(()=>{
        console.log('Se acutailizo')
        navigate(Routes.StepThree);
      })
      console.log('voley')
    }if (index===2) {
      const docRef = doc(db, "usuarios", uid)
      const docSnap = await getDoc(docRef);
      let data = docSnap.data()
      data.deporte = 'Suft'
      await setDoc(docRef, data).then(()=>{
        console.log('Se acutailizo')
        navigate(Routes.StepThree);
      })
    }
  }, [index, uid]);
  const _renderItem = useCallback(({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={Assets.icons.img_build_muscle}
          resizeMode={'cover'}
          style={{
            height: ITEM_HEIGHT,
            width: (ITEM_HEIGHT / 450) * 279,
          }}
        />
        <Text H18 content28 style={{fontWeight: '800'}} marginT-16>
          {item.title}
        </Text>
      </View>
    );
  }, []);
  return (
    <View flex backgroundColor={Colors.contentW}>
      <Text H36 marginL-24>
        Paso 2/5
      </Text>
      <Text R18 marginL-24>
        ¿Qué deporte practicas?
      </Text>
      <View flex>
        <Carousel
          data={DATA}
          renderItem={_renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          inactiveSlideScale={350 / 450}
          onSnapToItem={index => setIndex(index)}
        />
      </View>
      <FooterLinear title={'Siguiente'} onPress={onNext} />
    </View>
  );
};

export default StepTwo;
export function scrollInterpolator(index, carouselProps) {
  const range = [1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return {inputRange, outputRange};
}
export function animatedStyles(index, animatedValue, carouselProps) {
  const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';
  let animatedOpacity = {};
  let animatedTransform = {};

  if (carouselProps.inactiveSlideOpacity < 1) {
    animatedOpacity = {
      opacity: animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [
          carouselProps.inactiveSlideOpacity,
          1,
          carouselProps.inactiveSlideOpacity,
        ],
      }),
    };
  }

  if (carouselProps.inactiveSlideScale < 1) {
    animatedTransform = {
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [
              carouselProps.inactiveSlideScale,
              1,
              carouselProps.inactiveSlideScale,
            ],
          }),
          translateX: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [
              TRANSLATE_VALUE * carouselProps.inactiveSlideScale,
              0,
              -TRANSLATE_VALUE * carouselProps.inactiveSlideScale,
            ],
          }),
          translateY: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [
              -TRANSLATE_VALUE_Y * carouselProps.inactiveSlideScale,
              0,
              -TRANSLATE_VALUE_Y * carouselProps.inactiveSlideScale,
            ],
          }),
        },
      ],
    };
  }

  return {
    ...animatedOpacity,
    ...animatedTransform,
  };
}
const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 40,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginLeft: 6,
  },
  itemLabel: {
    color: 'white',
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
