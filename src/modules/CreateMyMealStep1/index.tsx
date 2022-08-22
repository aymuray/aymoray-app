import Box from 'components/Box';
import ButtonLinear from 'components/ButtonLinear';
import Header from 'components/Header';
import Input from 'components/Input';
import {bottom, width} from 'config/scaleAccordingToDevice';
import React, {useState} from 'react';
import {
  View,
  Text,
  Colors,
  Image,
  Assets,
  KeyboardAwareScrollView,
  Switch,
} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Routes from 'config/Routes';
import {Controller, useForm} from 'react-hook-form';
const CreateMyMealStep1 = () => {
  const {navigate} = useNavigation();
  const [active, setActive] = useState<boolean>(true);

  const {control} = useForm({
    defaultValues: {
      name: '',
    },
  });

  return (
    <View flex backgroundColor={Colors.background}>
      <Header title="Create a Meal - Step 1/2" back />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingBottom: bottom,
        }}>
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
                label={'Meal Name'}
                parentStyle={{marginHorizontal: 16, width: width - 64}}
              />
            )}
          />
          <View row marginH-16 centerV marginB-16>
            <Text flex R14 color28>
              Active it on Diary
            </Text>
            <Switch
              height={35}
              width={53}
              onColor={Colors.color44}
              offColor={Colors.color6D}
              value={active}
              onValueChange={setActive}
              thumbSize={30}
            />
          </View>
        </Box>
        <Box>
          <View
            row
            paddingH-16
            paddingV-12
            style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Text H14 color28 uppercase>
              Photo of Meal
            </Text>
          </View>
          <View height={1} backgroundColor={Colors.line} />
          <TouchableOpacity
            onPress={() => {
              navigate(Routes.TakePhoto);
            }}>
            <View
              margin-16
              center
              height={250}
              style={{
                borderWidth: 1,
                borderRadius: 1,
                borderColor: Colors.line,
                borderStyle: 'dashed',
              }}>
              <Image source={Assets.icons.ic_camera} />
            </View>
          </TouchableOpacity>
        </Box>

        <ButtonLinear
          title="next"
          onPress={() => {
            navigate(Routes.CreateMyMealStep2);
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateMyMealStep1;
