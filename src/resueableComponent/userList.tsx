import { Image, Text, TouchableOpacity, View } from "react-native";
import { STYLES } from "../styles/ScreenStyles";
import colors from "../assest/color/colors";
import StringConstants from "../assest/constants/StringsConstants";

function UserList(props: { item: any, makeCall: any }) {
    const { item, makeCall } = props
    const { UNKNOWN, ON_LEAVE, ON_LEAVE_FROM, OUTSIDE, OUTSIDE_FROM, PRESENT, STATUS_UPDATED_AT } = StringConstants();
    return (
        <View style={STYLES.card}>
            <View style={STYLES.cardContent}>
                <View style={[STYLES.statusContainer, {
                    backgroundColor: item.status === PRESENT ? colors.greenSoftneer : item.status === ON_LEAVE ? colors.redSoftner : item.status === UNKNOWN ? colors.white : colors.softOrange, paddingHorizontal: 5, borderRadius: 5
                }]}
                >
                    <Text style={[STYLES.value, { color: item.status === PRESENT ? colors.greenDarkest : item.status === ON_LEAVE ? colors.redDarkest : "orange", }]}>
                        {item.status}
                    </Text>
                </View>
                <Text style={STYLES.title}>{item.firstName} {item.lastName}</Text>
                <View style={STYLES.infoContainer}>
                    <View>
                        <Text style={STYLES.value}>{item.email}</Text>
                        {item.status !== PRESENT && item.From !==null  &&(  
                            <Text style={STYLES.label}>
                                {item.status === ON_LEAVE ? ON_LEAVE_FROM : item.status === OUTSIDE ? OUTSIDE_FROM : STATUS_UPDATED_AT}:
                                <Text style={STYLES.value}>   {item.From.split(' at ')[0]}</Text>
                            </Text>
                        )}
                        {item.status == ON_LEAVE && (
                            <Text style={STYLES.label}>
                                On Leave To :
                                <Text style={STYLES.value}>   {item.To.split(' at ')[0]}</Text>
                            </Text>
                        )}
                    </View>
                </View>
            </View>
            <View style={STYLES.callButtonContainer}>
                <TouchableOpacity onPress={() => makeCall(item.mobilePhone)} style={STYLES.callButton}>
                    <Image source={require("../assest/icons/phone_icon_white.png")} style={STYLES.callIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default UserList;