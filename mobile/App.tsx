import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  NavigationContainer,
  useNavigationState,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TheaterScreen from './screens/Theater';
import HomeScreen from './screens/Home';
import UserScreen from './screens/User';
import MovieDetailScreen from './screens/MovieDetail';
import FoodScreen from './screens/Food';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import MovieTheaterScreen from './screens/MovieTheater';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Header options for tabs
const optionHeaderFull = (title: string) => (props: any) => ({
  headerTransparent: true,
  headerStyle: {
    backgroundColor: 'transparent',
    height: 50,
  },
  headerTintColor: 'transparent',
  title: title,
  headerLeft: () => (
    <Ionicons
      name="menu"
      size={30}
      color="#ffffff"
      style={{marginLeft: 15}}
      onPress={() => props.navigation.openDrawer()}
    />
  ),
  headerRight: () => (
    <Ionicons
      name="notifications-outline"
      size={25}
      color="#ffffff"
      style={{marginRight: 15}}
      onPress={() => props.navigation.openDrawer()}
    />
  ),
});

const optionHeaderBack = (title: string) => (props: any) => ({
  headerTransparent: true,
  headerStyle: {
    backgroundColor: 'transparent',
    height: 75,
  },
  headerTintColor: 'transparent',
  title: title,
  headerLeft: () => (
    <Ionicons
      name="chevron-back-circle"
      size={35}
      color="white"
      style={{marginLeft: 15, marginTop: 0}}
      onPress={() => props.navigation.goBack()}
    />
  ),
});

// Tab Navigator
const TabNavigatorWrapper = () => {
  const hideTabBarScreens = ['MovieDetail',"MovieTheater", 'Food', 'User'];
  const navigationState = useNavigationState(state => state);

  const getNestedRouteName = (state: any): string | null => {
    if (!state) return null;
    const route = state.routes[state.index];
    if (route.state) {
      return getNestedRouteName(route.state);
    }
    return route.name;
  };

  const currentRouteName = getNestedRouteName(navigationState) || '';
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'User') {
            iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Theater') {
            iconName = focused ? 'theater' : 'theater';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Food') {
            iconName = focused ? 'food' : 'food-outline';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }
        },
        tabBarStyle: {
          display: hideTabBarScreens.includes(currentRouteName)
            ? 'none'
            : 'flex',
          backgroundColor: '#222',
          height: 70,
          paddingTop: 5,
        },
        tabBarActiveTintColor: 'green',
        tabBarLabelStyle: {
          fontSize: 14,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={optionHeaderFull('Trang chủ')}
      />
      <Tab.Screen
        name="Theater"
        component={TheaterScreen}
        options={optionHeaderFull('Rạp chiếu')}
      />
      <Tab.Screen
        name="Food"
        component={FoodScreen}
        options={optionHeaderBack('Thực phẩm')}
        
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={optionHeaderBack('Cá nhân')}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator
const StackNavigatorWrapper = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Tabs"
      component={TabNavigatorWrapper}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetailScreen}
      options={optionHeaderBack("")}
    />
      <Stack.Screen
      name="MovieTheater"
      component={MovieTheaterScreen}
      options={optionHeaderBack("")}
    />
  </Stack.Navigator>
);

// Custom Drawer Content
const DrawerNavigatorWrapper = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        icon={({size}) => <Ionicons name="home" size={size} color={'white'} />}
        label="Trang chủ"
        labelStyle={styles.drawerText}
        onPress={() =>
          props.navigation.navigate('Drawer', {
            screen: 'Tabs',
            params: {screen: 'Home'},
          })
        } // Access Tabs through Drawer
      />
      <DrawerItem
        icon={({size}) => (
          <MaterialIcons name="theater" size={size} color={'white'} />
        )}
        label="Rạp chiếu"
        labelStyle={styles.drawerText}
        onPress={() =>
          props.navigation.navigate('Drawer', {
            screen: 'Tabs',
            params: {screen: 'Theater'},
          })
        } // Navigate to Theater in Tabs
      />
      <DrawerItem
        icon={({size}) => (
          <MaterialIcons name="food" size={size} color={'white'} />
        )}
        label="Thực phẩm"
        labelStyle={styles.drawerText}
        onPress={() =>
          props.navigation.navigate('Drawer', {
            screen: 'Tabs',
            params: {screen: 'Food'},
          })
        } // Navigate to Food in Tabs
      />
      <DrawerItem
        icon={({size}) => (
          <Ionicons name="person" size={size} color={'white'} />
        )}
        label="Cá nhân"
        labelStyle={styles.drawerText}
        onPress={() =>
          props.navigation.navigate('Drawer', {
            screen: 'Tabs',
            params: {screen: 'User'},
          })
        } // Navigate to User in Tabs
      />
    </DrawerContentScrollView>
  );
};

function App() {
  const isDarkMode = 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: '100%' as const,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <DrawerNavigatorWrapper {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#333',
              width: 250,
              borderEndEndRadius: 0,
              borderTopEndRadius: 0,
            },
            drawerLabelStyle: {
              color: '#fff',
            },
          }}>
          <Drawer.Screen
            name="Drawer"
            component={StackNavigatorWrapper}
            options={{headerShown: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerText: {
    color: 'white',
  },
});

export default App;
