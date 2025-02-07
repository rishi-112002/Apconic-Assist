import notifee from '@notifee/react-native';
import { View, Button } from 'react-native';
function Notification() {
    async function onDisplayNotification() {
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
      
        // Required for iOS
        // See https://notifee.app/react-native/docs/ios/permissions
        await notifee.requestPermission();
      
        // const notificationId = await notifee.displayNotification({
        //   id: '123',
        //   title: 'Notification Title',
        //   body: 'Main body content of the notification',
        //   android: {
        //     channelId,
        //   },
        // });
      
        // Sometime later...
        await notifee.displayNotification({
          id: '123',
          title: 'Updated Notification Title',
          body: 'Updated main body content of the notification',
          android: {
            channelId,
          },
        });
      }
    
    return (
      <View>
        <Button title="Display Notification" onPress={() => onDisplayNotification()} />
      </View>
    );
  }
export default Notification;  