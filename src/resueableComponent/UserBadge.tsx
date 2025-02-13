import { Text, TouchableOpacity, View } from "react-native";
import colors from "../assest/color/colors";

const UserBadge = ({ userName, status , onPress }: any) => {
    function getInitials(userName: any) {
        if(userName){

            const names = userName.split(" "); 
            const initials = names.map((name: string) => name.charAt(0).toUpperCase()).join(""); 
            return initials;
        }
    }
    return (
        <View style={{ position: "relative" }}>
            {/* Status Indicator */}
            {status === "On-leave" && (
                <View style={{
                    position: "absolute",
                    top: -2,
                    right: -5,
                    backgroundColor: colors.redBase, // Light gray background
                    borderRadius: 10,
                    width: 10,
                    height: 10,
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                </View>
            )}
            {status === "Outside" && (
                <View style={{
                    position: "absolute",
                    top: -2,
                    right: -5,
                    backgroundColor: "yellow",
                    borderRadius: 10,
                    width: 10,
                    height: 10,
                }} />
            )}
            {status === "Present" && (
                <View style={{
                    position: "absolute",
                    top: -2,
                    right: -5,
                    backgroundColor: "green",
                    borderRadius: 10,
                    width: 10,
                    height: 10,
                }} />
            )}

            {/* Initials Badge */}
            <TouchableOpacity style={{ backgroundColor: colors.SoftGray, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10, paddingHorizontal: 6, paddingVertical: 5 }} 
            onPress={onPress}>
                <Text>
                    {getInitials(userName)}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
export default UserBadge;