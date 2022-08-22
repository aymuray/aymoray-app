import {useNavigation} from '@react-navigation/native';
import FooterLinear from 'components/FooterLinear';
import Input from 'components/Input';
import Routes from 'config/Routes';
import SegmentControl from 'libs/react-native-segment';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {LogBox, StyleSheet} from 'react-native';
import {View, Text, Colors, KeyboardAwareScrollView} from 'react-native-ui-lib';
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";
import {doc, getDoc, setDoc} from "firebase/firestore";

const StepFive = () => {
  const [uid, setUid] = useState('');
  const [index, setIndex] = useState('PIES/PULGADAS');
  const [user, setUser] = useState(null);
  const [docSnap, setDocSnap] = useState(null);
  const {navigate} = useNavigation();

  useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid);
                const docRef = doc(db, "usuarios", user.uid)
                setDocSnap(docRef);
                const docSnap = await getDoc(docRef);
                setUser(docSnap.data());
            }
        })
        LogBox.ignoreLogs(["timer"]);
  }, []);

  const onNext = useCallback(async (data) => {
      user.estatura = data.tall
      user.unidadDeMedidaEstatura = index
      console.log(user);
      let estatura = null
      let peso = null
      if (index === 'PIES') {
          estatura = parseInt(data.tall) / 3.28084;
      } else {
          estatura = parseInt(data.tall) / 100;
      }

      if (user.UnidadMedidaPeso === 'KILOGRAMOS') {
          peso = user.peso
      }
      if (user.UnidadMedidaPeso === 'LIBRAS') {
          peso = user.peso / 2.2046
      }
      if (user.UnidadMedidaPeso === 'STONES') {
          peso = user.peso * 6.35029
      }

      user.IMC = peso / (estatura * estatura)

      if (user.sexo === 'Hombre') {
          user.GC = (1.2 * user.IMC) + (0.23 * user.edad) - (10.8 * 1) - 5.4
      } else {
          user.GC = (1.2 * user.IMC) + (0.23 * user.edad) - (10.8 * 0) - 5.4
      }


      if (user.sexo === 'Hombre') {
          user.TMB = 66 + (13.7 * peso) + (5 * estatura) - (6.8 * user.edad)
      } else {
          user.TMB = 655 + (9.6 * peso) + (1.8 * estatura) - (4.7 * user.edad)
      }

      if (user.nivelEntrenamiento === 1) {
          user.GET = user.TMB * 1.2
      }if (user.nivelEntrenamiento === 2) {
          user.GET = user.TMB * 1.375
      }if (user.nivelEntrenamiento === 3) {
          user.GET = user.TMB * 1.55
      }if (user.nivelEntrenamiento === 4) {
          user.GET = user.TMB * 1.725
      }if (user.nivelEntrenamiento === 5) {
          user.GET = user.TMB * 1.9
      }


      await setDoc(docSnap, user).then(() => {
          console.log('Se acutailizo')
          navigate(Routes.StepSix);
      })

      // navigate(Routes.StepSix);
  }, [user,uid, index, docSnap]);

  const {control, handleSubmit} = useForm({
    defaultValues: {
      tall: '',
      weight: '',
    },
  });
  return (
    <View flex backgroundColor={Colors.contentW}>
      <Text H36 marginL-24>
        Paso 5/5
      </Text>
      <Text R18 marginL-24>
          Sobre tu cuerpo.
      </Text>
      <KeyboardAwareScrollView>
          <View flex paddingT-73>
              <Controller
                  control={control}
                  name="tall"
                  render={({field: {value, onChange}}) => (
                      <Input
                          value={value}
                          onChangeText={onChange}
                          label={'¿Que tan alto eres?'}
                          keyboardType={'phone-pad'}
                      />
                  )}
              />
              {/*<Controller*/}
              {/*    control={control}*/}
              {/*    name="weight"*/}
              {/*    render={({field: {value, onChange}}) => (*/}
              {/*        <Input*/}
              {/*            value={value}*/}
              {/*            onChangeText={onChange}*/}
              {/*            label={'¿Cuánto pesas actualmente?'}*/}
              {/*            keyboardType={'phone-pad'}*/}
              {/*        />*/}
              {/*    )}*/}
              {/*/>*/}
              <Text R14 color6D marginH-24 marginB-40>
                  Usamos esta información para calcular un objetivo de calorías preciso para usted.
              </Text>
              <SegmentControl
                  values={['CENTÍMETROS', 'PIES']}
                  onChange={(currentIndex) => {
                      if (currentIndex === 1) {
                          setIndex('PIES');
                      }if (currentIndex === 0) {
                          setIndex('CENTÍMETROS');
                      }
                  }}
                  disable={false}
                  selectedIndex={1}
                  style={{marginTop: 24}}
              />
          </View>
      </KeyboardAwareScrollView>
      <FooterLinear title={'Siguiente'} onPress={handleSubmit(onNext)} />
    </View>
  );
};

export default StepFive;

const styles = StyleSheet.create({});
