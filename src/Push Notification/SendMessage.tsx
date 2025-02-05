import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [employeeStatus, setEmployeeStatus] = useState({});

  useEffect(() => {
    // Get FCM token
    messaging().getToken().then(token => {
      // Store token in Firebase
      firestore().collection('employees').doc('employee1').update({
        fcmToken: token
      });
    });

    // Listen for status changes
    const unsubscribe = firestore().collection('employees').onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmployeeStatus(data);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = (employeeId, newStatus) => {
    // Update status in Firebase
    firestore().collection('employees').doc(employeeId).update({
      status: newStatus
    });

    // Send notification to other employees
    firestore().collection('employees').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        const employee = doc.data();
        if (employee.id !== employeeId && employee.fcmToken) {
          messaging().send({
            to: employee.fcmToken,
            notification: {
              title: 'Employee Status Update',
              body: `Employee ${employeeId} is now ${newStatus}`
            }
          });
        }
      });
    });
  };

  return (
    <View>
      {employeeStatus.map(employee => (
        <View key={employee.id}>
          <Text>Employee: {employee.name}</Text>
          <Text>Status: {employee.status}</Text>
          <Button title="Change Status" onPress={() => handleStatusChange(employee.id, 'outside')} />
        </View>
      ))}
    </View>
  );
};

export default App;
