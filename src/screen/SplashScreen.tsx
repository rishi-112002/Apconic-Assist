import { View, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import SplashEffect from '../functions/SplashEffect';
import { STYLES } from '../styles/ScreenStyles';
import colors from '../assest/color/colors';

function SplashScreen() {
    const { ring1Style, logoStyle } = SplashEffect();
    return (

        <View style={STYLES.Splash_container}>
            <StatusBar backgroundColor={colors.HelperTextColor}
                networkActivityIndicatorVisible={true}
                barStyle={'default'} />
                <Animated.View style={[STYLES.Splash_ringContainer, ring1Style]}>
                    <Animated.Image
                        source={require("../assest/icons/apconicLogo.png")}
                        style={[STYLES.Splash_logo, logoStyle]}
                    />
                </Animated.View>
         
        </View>
    );
}

export default SplashScreen;
