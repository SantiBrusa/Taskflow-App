import { View, Text, StyleSheet } from "react-native"
import { ProfileCard } from "../components/ProfileCards"
import { COLORS } from "../constants/theme"

export function ProfileScreen() {
    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>
                Mi Perfil
            </Text>
            <ProfileCard name="Santino Vissani" role="Desarrollador Full Stack" image="https://i.pravatar.cc/150?img=55"/>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 20,
        marginTop: 30,
    },
})