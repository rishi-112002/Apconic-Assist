import {
  Animated,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import React from 'react';
function CustomHeader({ title, searchIcon, filterIcon, translateY }: any) {

  const Navigations = useNavigation();
//   const openDrawer = useCallback(() => {
//     Navigations.dispatch(DrawerActions.toggleDrawer());
//   }, [Navigations]);



  return (
    <Animated.View
      style={{
        transform: [{ translateY: translateY }],
        zIndex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        height: 60
      }}>
      <View style={{}}>
        <View style={{}}>
          {/* <TouchableOpacity onPress={openDrawer}>
            <MaterialIcons
              name={IconName.MENU}
              size={28}
              color={colors.darkblack}
              style={{}}
            />
          </TouchableOpacity> */}
          <Text style={{}}>{title}</Text>
        </View>
        {searchIcon && filterIcon &&

          <View style={{}}>
          </View>
        }
      </View>
    </Animated.View>
  );
}
export default CustomHeader;

