import Box from 'components/Box';
import ButtonLinear from 'components/ButtonLinear';
import Header from 'components/Header';
import Input from 'components/Input';
import {width} from 'config/scaleAccordingToDevice';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {View, Assets, Colors, Text, Image, Button} from 'react-native-ui-lib';
const AddFoodSimpleCalorie = () => {
  const {control} = useForm({
    defaultValues: {
      name: '',
      calories: '',
      serving: '',
      unit: '',
    },
  });
  return (
    <View flex backgroundColor={Colors.background}>
      <Header title="Simple Calories" back />
      <View height={16} />
      <Box>
        <View
          row
          paddingH-16
          paddingV-12
          style={{justifyContent: 'space-between', alignItems: 'center'}}>
          <Text H14 color28 uppercase>
            Basic Infomation
          </Text>
        </View>
        <View height={1} backgroundColor={Colors.line} marginB-16 />
        <Controller
          control={control}
          name="name"
          render={({field: {value, onChange}}) => (
            <Input
              value={value}
              onChangeText={onChange}
              label={'Food Name'}
              parentStyle={{marginHorizontal: 16, width: width - 64}}
            />
          )}
        />
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
        <View row paddingH-16 style={{justifyContent: 'space-between'}}>
          <Controller
            control={control}
            name="serving"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'1 Serving (g)'}
                parentStyle={{marginHorizontal: 0, width: '65%'}}
              />
            )}
          />
          <Controller
            control={control}
            name="unit"
            render={({field: {value, onChange}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label={'Unit'}
                parentStyle={{marginHorizontal: 0, width: '30%'}}
              />
            )}
          />
        </View>
      </Box>
      <ButtonLinear title="create a food" onPress={() => {}} />
    </View>
  );
};

export default AddFoodSimpleCalorie;

const styles = StyleSheet.create({});
