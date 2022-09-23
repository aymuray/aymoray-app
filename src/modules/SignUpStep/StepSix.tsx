import {useNavigation} from '@react-navigation/native';
import FooterLinear from 'components/FooterLinear';
import Routes from 'config/Routes';
import {scaleH, width} from 'config/scaleAccordingToDevice';
import React, {useCallback, useEffect, useState} from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {View, Text, Colors} from 'react-native-ui-lib';
import SvgArrow from './components/SvgArrow';
import SvgStepSix from './components/SvgStepSix';
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "config/fb";
import {doc, getDoc} from "firebase/firestore";
const StepSix = () => {
  const [uid, setUid] = useState('');
  const [user, setUser] = useState(null);
  const [docSnap, setDocSnap] = useState(null);
  const [GC, setGC] = useState('');
  const [GET, setGET] = useState('');
  const {navigate} = useNavigation();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid);
                const docRef = doc(db, "usuarios", user.uid)
                setDocSnap(docRef);
                const docSnap = await getDoc(docRef);
                setUser(docSnap.data());
                setGC(parseInt(docSnap.data().GC));
                setGET(parseInt(docSnap.data().GET))
            }
        })
        LogBox.ignoreLogs(["timer"]);
    }, []);

  const onNext = useCallback(() => {
    navigate(Routes.MainTab);
  }, []);
  return (
    <View flex backgroundColor={Colors.contentW}>
      <Text H36 marginL-24>
          Terminado!!!
      </Text>
      <Text R18 marginL-24>
          Tu nuevo plan.
      </Text>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          backgroundColor={'#FFF'}
          marginH-24
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#FF6243',
            paddingTop: scaleH(24),
            paddingBottom: scaleH(20),
          }}>
          <Text R18 color28 center marginB-9>
              Tu porcentaje de grasa corporal es de
          </Text>
          <Text H36 color28 center marginB-9>
              {GC} %
          </Text>
          <Text R18 color28 center marginB-9>
              con una meta calórica diaria de
          </Text>
          <Text H36 color28 center marginB-9>
              {GET} Cal
          </Text>
        </View>
        <View
          backgroundColor={'#FFF'}
          paddingH-24
          paddingV-8
          marginH-24
          row
          style={{
            borderRadius: 100,
            borderWidth: 1,
            borderColor: '#FF6243',
            alignSelf: 'center',
            marginTop: -20,
          }}>
          <Text R18 color28>
            Perder{' '}
          </Text>
          <Text B18 color28>
            0.4kg
          </Text>
          <Text R18 color28>
            /semanas
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SvgArrow />
        </View>
        <View
          style={{
            marginBottom: -((width / 275) * 268) / 2,
          }}>
          <SvgStepSix />
        </View>
      </View>
      <FooterLinear title={'¡COMENCEMOS TU PLAN!'} onPress={onNext} />
    </View>
  );
};

export default StepSix;

const styles = StyleSheet.create({});
