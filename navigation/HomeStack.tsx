import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';



// Define the params for the HomeStack
export type HomeStackParamList = {
  HomeMain: undefined;
  Profile: undefined;
  Expense: { groupId: string; groupName: string; groupType: string; groupIcon: string };
  AddExpense: { groupId: string }; // Params for AddExpenseScreen
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      
    </Stack.Navigator>
  );
};

export default HomeStack;