import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Assets, Image, Colors } from "react-native-ui-lib";
import Routes from "config/Routes";
import Walkthoughs from "modules/Walkthoughs";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "modules/SignUp";
import { FONTS } from "config/FoundationConfig";
import StepOne from "modules/SignUpStep/StepOne";
import StepTwo from "modules/SignUpStep/StepTwo";
import StepThree from "modules/SignUpStep/StepThree";
import StepFour from "modules/SignUpStep/StepFour";
import StepFive from "modules/SignUpStep/StepFive";
import StepSix from "modules/SignUpStep/StepSix";
import Login from "modules/Login";
import MainTab from "./MainTab";
import SearchExercires from "modules/SearchExercires";
import AddExercire from "modules/AddExercire";
import AutoTracking from "modules/AutoTracking";
import MuscleGroup from "modules/MuscleGroup";
import ChestExercises from "modules/ChestExercises";
import ExercireDetail from "modules/ExercireDetail";
import ExerciseDetailInstruction from "modules/ExerciseDetailInstruction";
import ExerciseDetailRecordHistory from "modules/ExerciseDetailRecordHistory";
import CreateNewRecords from "modules/CreateNewRecords";
import SelectPoint from "modules/SelectPoint";
import WorkoutPlanPlansStockDetail from "modules/WorkoutPlanPlansStockDetail";
import MyPlanDetail from "modules/MyPlanDetail";
import MyPlanSelectFriend from "modules/MyPlanSelectFriend";
import AddNewPlan from "modules/AddNewPlan";
import AddNewPlanStep2 from "modules/AddNewPlanStep2";
import AddFood from "modules/AddFood";
import AddFoodSimpleCalorie from "modules/AddFoodSimpleCalorie";
import AddFoodRecent from "modules/AddFoodRecent";
import AddFoodFrequent from "modules/AddFoodFrequent";
import AddFoodCategory from "modules/AddFoodCategory";
import AddFoodCategory2 from "modules/AddFoodCategory2";
import AddFoodCategory3 from "modules/AddFoodCategory3";
import MyFoodAndRecipe from "modules/MyFoodAndRecipe";
import CreateMyFoodStep1 from "modules/CreateMyFoodStep1";
import CreateMyRecipeStep1 from "modules/CreateMyRecipeStep1";
import CreateMyMealStep1 from "modules/CreateMyMealStep1";
import CreateNewFoodStep2 from "modules/CreateNewFoodStep2";
import MyFoodDetail from "modules/MyFoodDetail";
import CreateMyRecipeStep2 from "modules/CreateMyRecipeStep2";
import MyRecipeDetail from "modules/MyRecipeDetail";
import CreateMyMealStep2 from "modules/CreateMyMealStep2";
import MyMealDetail from "modules/MyMealDetail";
import Blog from "modules/Blog";
import BlogNutritionDetail from "modules/BlogNutritionDetail";
import AppsAndDevices from "modules/AppsAndDevices";
import MyProfile from "modules/MyProfile";
import MyProgressPhoto from "modules/MyProgressPhoto";
import Notification from "modules/Notification";
import PlayVideo from "modules/PlayVideo";
import TakePhoto from "modules/TakePhoto";
import Graph from "modules/Graph";
import WorkoutSchedule from "modules/WorkoutSchedule";
import { Platform } from "react-native";
import DailyDetail from "modules/DailyDetail";
import BreakfastDetail from "modules/BreakfastDetail";
import ForgotPassword from "modules/ForgotPassword";
import GenerateRecipe from "modules/GenerateRecipe";
import ListRecipes from "modules/ListRecipes";
import ListDetailRecipes from "modules/ListDetailRecipes";
import EditSport from "modules/EditPerfil/EditSport";
import EditWeight from "modules/EditPerfil/EditWeight";
import EditTrainingLevel from "modules/EditPerfil/EditTrainingLevel";
import EditSex from "modules/EditPerfil/EditSex";
import EditHeight from "modules/EditPerfil/EditHeight";
import EditName from "modules/EditPerfil/EditName";
const { Navigator, Screen } = createStackNavigator();
const RootStack = () => {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={Routes.Walkthoughs}
        screenOptions={{
          headerBackImage: () => (
            <Image
              source={Assets.icons.ic_back}
              style={{
                width: 24,
                height: 24,
                marginLeft: Platform.OS === "android" ? 8 : 24,
              }}
            />
          ),
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: FONTS.heavy,
            fontSize: 16,
            color: Colors.color28,
            fontWeight: "800",
          },
          headerTitleAlign: "center",
        }}
      >
        <Screen
          name={Routes.Walkthoughs}
          component={Walkthoughs}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.SignUp}
          component={SignUp}
          options={{
            title: "Registro",
            headerStyle: {
              shadowColor: "transparent",
              elevation: 0,
            },
          }}
        />
        <Screen
          name={Routes.Login}
          component={Login}
          options={{
            title: "",
            headerStyle: {
              shadowColor: "transparent",
              elevation: 0,
            },
          }}
        />
        <Screen
          name={Routes.ForgotPassword}
          component={ForgotPassword}
          options={{
              title: "Recuperar contraseña",
              headerStyle: {
                  shadowColor: "transparent",
                  elevation: 0,
              },
          }}
        />
        <Screen
          name={Routes.StepOne}
          component={StepOne}
          options={{
            title: "",
            headerStyle: {
              shadowColor: "transparent",
              elevation: 0,
            },
          }}
        />
        <Screen
          name={Routes.StepTwo}
          component={StepTwo}
          options={{
            title: "",
            headerStyle: {
              shadowColor: "transparent",
              elevation: 0,
            },
          }}
        />
        <Screen
          name={Routes.StepThree}
          component={StepThree}
          options={{
            title: "",
            headerStyle: {
              shadowColor: "transparent",
              elevation: 0,
            },
          }}
        />
        <Screen
          name={Routes.StepFour}
          component={StepFour}
          options={{
            title: "",
            headerStyle: {
              shadowColor: "transparent",
              elevation: 0,
            },
          }}
        />
        <Screen
          name={Routes.StepFive}
          component={StepFive}
          options={{
            title: "",
            headerStyle: {
              shadowColor: "transparent",
              elevation: 0,
            },
          }}
        />
        <Screen
          name={Routes.StepSix}
          component={StepSix}
          options={{
            title: "",
            headerStyle: {
              shadowColor: "transparent",
              elevation: 0,
            },
          }}
        />
        <Screen
          name={Routes.MainTab}
          component={MainTab}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.SearchExercires}
          component={SearchExercires}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AddExercire}
          component={AddExercire}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AutoTracking}
          component={AutoTracking}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.MuscleGroup}
          component={MuscleGroup}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.ChestExercises}
          component={ChestExercises}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.ExercireDetail}
          component={ExercireDetail}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.ExerciseDetailInstruction}
          component={ExerciseDetailInstruction}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.ExerciseDetailRecordHistory}
          component={ExerciseDetailRecordHistory}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.CreateNewRecords}
          component={CreateNewRecords}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.SelectPoint}
          component={SelectPoint}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.WorkoutPlanPlansStockDetail}
          component={WorkoutPlanPlansStockDetail}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.MyPlanDetail}
          component={MyPlanDetail}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.MyPlanSelectFriend}
          component={MyPlanSelectFriend}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AddNewPlan}
          component={AddNewPlan}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AddNewPlanStep2}
          component={AddNewPlanStep2}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AddFood}
          component={AddFood}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AddFoodSimpleCalorie}
          component={AddFoodSimpleCalorie}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AddFoodRecent}
          component={AddFoodRecent}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AddFoodFrequent}
          component={AddFoodFrequent}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AddFoodCategory}
          component={AddFoodCategory}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AddFoodCategory2}
          component={AddFoodCategory2}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AddFoodCategory3}
          component={AddFoodCategory3}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.MyFoodAndRecipe}
          component={MyFoodAndRecipe}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.CreateMyFoodStep1}
          component={CreateMyFoodStep1}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.CreateMyRecipeStep1}
          component={CreateMyRecipeStep1}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.CreateMyMealStep1}
          component={CreateMyMealStep1}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.CreateNewFoodStep2}
          component={CreateNewFoodStep2}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.MyFoodDetail}
          component={MyFoodDetail}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.CreateMyRecipeStep2}
          component={CreateMyRecipeStep2}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.MyRecipeDetail}
          component={MyRecipeDetail}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.CreateMyMealStep2}
          component={CreateMyMealStep2}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.MyMealDetail}
          component={MyMealDetail}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.Blog}
          component={Blog}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.BlogNutritionDetail}
          component={BlogNutritionDetail}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.AppsAndDevices}
          component={AppsAndDevices}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.MyProfile}
          component={MyProfile}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.MyProgressPhoto}
          component={MyProgressPhoto}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.Notification}
          component={Notification}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.PlayVideo}
          component={PlayVideo}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.TakePhoto}
          component={TakePhoto}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.Graph}
          component={Graph}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.WorkoutSchedule}
          component={WorkoutSchedule}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.DailyDetail}
          component={DailyDetail}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.BreakfastDetail}
          component={BreakfastDetail}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name={Routes.GenerateRecipe}
          component={GenerateRecipe}
          options={{
              title: "Generar receta",
              headerStyle: {
                  shadowColor: "transparent",
                  elevation: 0,
              },
          }}
        />
        <Screen
          name={Routes.ListDetailRecipes}
          component={ListDetailRecipes}
          options={{
              title: "detalle receta",
              headerStyle: {
                  shadowColor: "transparent",
                  elevation: 0,
              },
          }}
        />
        <Screen
          name={Routes.EditSport}
          component={EditSport}
          options={{
              title: "",
              headerStyle: {
                  shadowColor: "transparent",
                  elevation: 0,
              },
          }}
        />
        <Screen
          name={Routes.EditWeight}
          component={EditWeight}
          options={{
              title: "",
              headerStyle: {
                  shadowColor: "transparent",
                  elevation: 0,
              },
          }}
        />
        <Screen
          name={Routes.EditTrainingLevel}
          component={EditTrainingLevel}
          options={{
              title: "",
              headerStyle: {
                  shadowColor: "transparent",
                  elevation: 0,
              },
          }}
        />
        <Screen
          name={Routes.EditSex}
          component={EditSex}
          options={{
              title: "",
              headerStyle: {
                  shadowColor: "transparent",
                  elevation: 0,
              },
          }}
        />
        <Screen
          name={Routes.EditHeight}
          component={EditHeight}
          options={{
              title: "",
              headerStyle: {
                  shadowColor: "transparent",
                  elevation: 0,
              },
          }}
        />
        <Screen
          name={Routes.EditName}
          component={EditName}
          options={{
              title: "",
              headerStyle: {
                  shadowColor: "transparent",
                  elevation: 0,
              },
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
