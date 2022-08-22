import {useNavigation} from '@react-navigation/native';
import FooterLinear from 'components/FooterLinear';
import Input from 'components/Input';
import Routes from 'config/Routes';
import SegmentControl from 'libs/react-native-segment';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, LogBox, StyleSheet} from 'react-native';
import {View, Text, Colors} from 'react-native-ui-lib';
import {doc, getDoc, setDoc} from "firebase/firestore";
import {auth, db} from "config/fb";
import {onAuthStateChanged} from "firebase/auth";

const StepThree = () => {
  const {navigate} = useNavigation();
  const [uid, setUid] = useState('');
  const [index, setIndex] = useState('1');

  useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            if (user) {
                setUid(user.uid);
            }

        })
        LogBox.ignoreLogs(["timer"]);
        }, []);

  const onNext = useCallback(async (data) => {
      const docRef = doc(db, "usuarios", uid)
      const docSnap = await getDoc(docRef);
      let user = docSnap.data()
      user.peso = parseInt(data.age)
      user.UnidadMedidaPeso = index
      user.UltimaAltulizacionPeso = new Date()
      await setDoc(docRef, user).then(()=>{
          console.log('Se acutailizo')
          navigate(Routes.StepFour);
      })

  }, [uid, index]);
  const {control, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      age: '',
    },
  });
  return (
    <View
      flex
      backgroundColor={Colors.contentW}
      onTouchStart={() => {
        Keyboard.dismiss();
      }}>
      <Text H36 marginL-24>
          Paso 3/5
      </Text>
      <Text R18 marginL-24>
         ¿Cual es tu peso actual?
      </Text>
      <View flex paddingT-70>
        <Controller
          control={control}
          name="age"
          render={({field: {value, onChange}}) => (
            <Input
              value={value}
              onChangeText={onChange}
              label={'Tu peso'}
              keyboardType={'phone-pad'}
            />
          )}
        />
        <SegmentControl
          values={['KILOGRAMOS', 'LIBRAS', 'STONES']}
          onChange={ (currentIndex) => {
              console.log(currentIndex);
              if (currentIndex === 2) {
                  setIndex('STONES');
              }
              if (currentIndex === 1) {
                  setIndex('LIBRAS');
              }if (currentIndex === 0) {
                  setIndex('KILOGRAMOS');
              }
          }}
          disable={false}
          selectedIndex={1}
          style={{marginTop: 24}}
        />
      </View>
      <FooterLinear title={'Siguiente'} onPress={handleSubmit(onNext)} />
    </View>
  );
};

export default StepThree;

const styles = StyleSheet.create({});
