import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { HomeSTYLES } from '../styles/ScreenStyles';
import TopLeftModal from './Modal';
import colors from '../assest/color/colors';

function CustomHeader(props: {
  handleStatusChange: (status: string) => void;
  selectedStatus: string;
  status: string;
  viewModal: boolean;
  setModal: (visible: boolean) => void;
}) {
  const { handleStatusChange, selectedStatus, status, viewModal, setModal } = props;

  const STATUS_OPTIONS = ['Present', 'On Leave', 'Outside'];

  const getStatusStyle = (option: string) => {
    switch (option) {
      case 'Present':
        return { backgroundColor: colors.greenSoftneer, textColor: colors.greenDarkest };
      case 'Outside':
        return { backgroundColor: colors.softOrange, textColor: 'orange' };
      case 'On Leave':
        return { backgroundColor: colors.redSoftner, textColor: colors.redDarkest };
      default:
        return { backgroundColor: '#ddd', textColor: '#000' }; // Default for non-selected
    }
  };

  

  return (
    <View style={HomeSTYLES.headerContainer}>
      <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>Employee</Text>

      <View style={{ flexDirection: 'row', gap: 10 }}> {/* Buttons in a row */}
        {STATUS_OPTIONS.map(option => {
          const isSelected = selectedStatus === option;
          const { backgroundColor, textColor } = getStatusStyle(option);

          return (
            <Pressable
              key={option}
              onPress={() => handleStatusChange(option)}
              style={[
                HomeSTYLES.statusButton,
                { backgroundColor: isSelected ? backgroundColor : '#ddd' }, // Only selected is colorful
              ]}
            >
              <Text style={{ 
                color: isSelected ? textColor : '#000', // Only selected has colored text
                fontWeight: isSelected ? 'bold' : 'normal' 
              }}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TopLeftModal
        modalVisible={viewModal}
        setModalVisible={setModal}
        value={status}
        setCalendarVisible={undefined}
        tovalue={undefined}
        FromValue={undefined}
      />
    </View>
  );
}

export default CustomHeader;
