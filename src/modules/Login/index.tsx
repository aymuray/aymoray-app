import ButtonLinear from 'components/ButtonLinear';
import Input from 'components/Input';
import {scaleH, width} from 'config/scaleAccordingToDevice';
import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Image, Assets, Colors, Button} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import Routes from 'config/Routes';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Controller, useForm} from 'react-hook-form';
import { auth } from '../../config/fb';
import {  signInWithEmailAndPassword  } from "firebase/auth";
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import ForgotPassword from "modules/ForgotPassword";


const Login = () => {
  const [LoginFirebase, setLoginFirebase] = useState('');
  const {navigate} = useNavigation();
  const onLogin = React.useCallback(async (data) => {
      setLoginFirebase('')
      await signInWithEmailAndPassword (auth, data.email.replace(" ",""), data.password).then( ()=>{
          setValue('email', '');
          setValue('password', '');
          navigate(Routes.MainTab);
      }).catch( error =>{
          console.log(error.message)
          if (error.message==='Firebase: Error (auth/invalid-email).'){
              setLoginFirebase('email')
          }
          if (error.message==='Firebase: Error (auth/wrong-password).'){
              setLoginFirebase('contraseña')
          }
          if (error.message==='Firebase: Error (auth/user-not-found).'){
              setLoginFirebase('noSeEncontro')
          }
      });
  }, []);
  const onSignUp = React.useCallback(() => {
      navigate(Routes.SignUp);
  }, []);

  const onForgotPassword = React.useCallback(() => {
      navigate(Routes.ForgotPassword);
  }, []);


  const {control, getValues, setValue,  handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
        <View
            flex
            backgroundColor={Colors.contentW}
            centerH
            style={{
                paddingTop: scaleH(40),
                paddingBottom: 24 + getBottomSpace(),
            }}>
            <Image
                source={Assets.icons.logoSignUp}
                style={{marginBottom: scaleH(30)}}
            />
            <Controller
                control={control}
                name="email"
                render={({field: {value, onChange}}) => (
                    <Input value={value} onChangeText={onChange} label={'Email'} />
                )}
                rules={{ required: true }}
            />
            {errors.email && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000"}}>Este campo debe ser completado</Text>}
            <Controller
                control={control}
                name="password"
                render={({field: {value, onChange}}) => (
                    <Input
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={true}
                        label={'Contraseña'}
                    />
                )}
                rules={{ required: true }}
            />
            {errors.password && <Text R14 color28 style={{ color: "#ff0000"}}>Este campo debe ser completado</Text>}
            {LoginFirebase==='email' && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000"}}>Correo inexistente</Text>}
            {LoginFirebase==='contraseña' && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000"}}>Contraseña incorrecta</Text>}
            {LoginFirebase==='noSeEncontro' && <Text R14 color28 style={{paddingBottom: 12, color: "#ff0000"}}>No Exite usuario con ese correo</Text>}
            <View
                style={{
                    width: '100%',
                    paddingLeft: 24,
                    flexDirection: 'row',
                }}>
                <Button
                    link
                    label={'¿Olvidaste tu contraseña?'}
                    labelStyle={{color: Colors.buttonLink, fontSize: 14}}
                    onPress={onForgotPassword}
                />
            </View>

            <ButtonLinear
                title={'Iniciar sesion'}
                style={styles.btnSignUp}
                onPress={handleSubmit(onLogin)}
            />
            {/*<Image*/}
            {/*    source={Assets.icons.or}*/}
            {/*    marginV-24*/}
            {/*    style={{marginVertical: scaleH(24)}}*/}
            {/*/>*/}
            {/*<Button*/}
            {/*    label="Inicia sesion con facebook"*/}
            {/*    iconSource={Assets.icons.ic_facebook}*/}
            {/*    backgroundColor={Colors.facebook}*/}
            {/*    style={{width: width - 48, height: 50, marginBottom: 25}}*/}
            {/*/>*/}
            <Text R14 color28 center style={{ marginTop: 25}}>
                ¿No tienes una cuenta?
                <Text R14 buttonLink onPress={onSignUp}>
                    {' '}
                    Registrate
                </Text>
            </Text>
        </View>
    </KeyboardAwareScrollView>

  );
};

export default Login;

const styles = StyleSheet.create({
  btnSignUp: {
    marginTop: scaleH(24),
  },
  container: {
    backgroundColor: Colors.contentW,
  },
});
