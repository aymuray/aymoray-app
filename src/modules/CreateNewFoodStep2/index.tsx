import {useNavigation} from '@react-navigation/core';
import Box from 'components/Box';
import ButtonLinear from 'components/ButtonLinear';
import Header from 'components/Header';
import Input from 'components/Input';
import Routes from 'config/Routes';
import {bottom, width} from 'config/scaleAccordingToDevice';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, Text, Colors, KeyboardAwareScrollView} from 'react-native-ui-lib';
const CreateNewFoodStep2 = () => {
  const {navigate} = useNavigation();

  const {control} = useForm({
    defaultValues: {
      calories: '',
      carbohydrates: '',
      protein: '',
      totalFat: '',
      sFat: '',
      pFat: '',
      mFat: '',
      tFat: '',
      cholesterol: '',
    },
  });

  return (
    <View flex backgroundColor={Colors.background}>
      <Header title="Create a Food - Step 2/2" back />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
        <View height={16} />
        <Box>
          <View
            row
            paddingH-16
            paddingV-12
            style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Text H14 color28 uppercase>
              nutrition facts
            </Text>
          </View>
          <View height={1} backgroundColor={Colors.line} marginB-16 />
          <Controller
            control={control}
            name="calories"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Calories (cal)'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
              />
            )}
          />
          <Controller
            control={control}
            name="carbohydrates"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Total Carbohydrates (g)'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
              />
            )}
          />
          <Controller
            control={control}
            name="protein"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Protein (g)'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
                optional
              />
            )}
          />
          <Controller
            control={control}
            name="totalFat"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Total Fat (g)'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
                optional
              />
            )}
          />
          <Controller
            control={control}
            name="sFat"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Saturated Fat (g)'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
                optional
              />
            )}
          />
          <Controller
            control={control}
            name="pFat"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Polyunsaturated Fat (g)'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
                optional
              />
            )}
          />
          <Controller
            control={control}
            name="mFat"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Monounsaturated Fat (g)'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
                optional
              />
            )}
          />
          <Controller
            control={control}
            name="tFat"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Trans Fat (g)'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
                optional
              />
            )}
          />
          <Controller
            control={control}
            name="cholesterol"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Cholesterol (g)'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
                optional
              />
            )}
          />
        </Box>
      </KeyboardAwareScrollView>
      <ButtonLinear
        title="create"
        onPress={() => {
          navigate(Routes.MyFoodDetail);
        }}
        style={{
          position: 'absolute',
          bottom: bottom,
        }}
      />
    </View>
  );
};

export default CreateNewFoodStep2;
