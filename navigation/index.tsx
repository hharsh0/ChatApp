import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image, Pressable, Text, useWindowDimensions, View } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import HomeScreen from '../screens/HomeScreen'
import { Feather } from "@expo/vector-icons";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: (props) => <HomeHeader {...props} /> }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{
          headerTitle: (props) => <ChatRoomHeader {...props} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const HomeHeader = (props: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: 'space-between',
        flex: 1,
      }}
    >
      <Image
        style={{ width: 30, height: 30, borderRadius: 30 }}
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg",
        }}
      />
      <Text style={{ fontWeight: "bold", }}>
        Home
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Feather
          style={{ marginHorizontal: 10 }}
          name="camera"
          size={24}
          color="black"
        />
        <Feather
          style={{ marginHorizontal: 10 }}
          name="edit-2"
          size={24}
          color="black"
        />
      </View>
    </View>
  );
}

const ChatRoomHeader = (props: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{ width: 30, height: 30, borderRadius: 30 }}
          source={{
            uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg",
          }}
        />
        <Text style={{ fontWeight: "bold", marginLeft: 20 }}>{props.children}</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Feather
          style={{ marginHorizontal: 10 }}
          name="camera"
          size={24}
          color="black"
        />
        <Feather
          style={{ marginHorizontal: 10 }}
          name="edit-2"
          size={24}
          color="black"
        />
      </View>
    </View>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
