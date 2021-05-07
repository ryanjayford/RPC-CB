import React from 'react';
import { Text,View} from 'react-native';
import { useTheme } from '@react-navigation/native';
import ReportStandard from './ReportStandardScreen';
import ReportFavorite from './ReportFavoriteScreen';
import ReportSmart from './ReportSmartScreen';
import ReportAdmin from './ReportAdminScreen';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

const TopTabs = ({navigation}) => {
  
    const { colors } = useTheme();
    return (
        
      <TopTab.Navigator tabBarOptions={{
        activeTintColor: '#fff',
        indicatorStyle: { backgroundColor: '#f3ad2b'},
        //labelStyle: { fontSize: 12 },
        style: { backgroundColor: colors.primary },
        labelStyle: {
          fontSize: 11,
        },
      }}>

        <TopTab.Screen name="Standard Reports" component={ReportStandard} />
        <TopTab.Screen name="Favorite Reports" component={ReportFavorite} />
        <TopTab.Screen name="Smart Projection Report" component={ReportSmart} />
        <TopTab.Screen name="Admin Report" component={ReportAdmin} />
      </TopTab.Navigator>
    )
  };

  export default TopTabs;