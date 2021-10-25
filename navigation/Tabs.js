import * as React from "react";
import { Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import DeliveryScreen from "../screens/DeliveryScreen";
import { COLORS, icons, SIZES } from "../constants";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: SIZES.height * 0.09,
        },
        tabBarLabelStyle: {
          color: COLORS.black,
          marginBottom: 7,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
            );
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={icons.bag}
                resizeMode="contain"
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
            );
          },
        }}
        name="Delivery"
        component={DeliveryScreen}
      />
    </Tab.Navigator>
  );
}
