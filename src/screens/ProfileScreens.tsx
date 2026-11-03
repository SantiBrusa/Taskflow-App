import { View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native"
import { ProfileCard } from "../components/ProfileCards"
import { COLORS } from "../constants/theme"
import { useAppSelector } from "../store/hooks"
import { selectUser } from "../store/authSlice"
import { logOut } from "../services/authService"


export function ProfileScreen() {
    const user = useAppSelector(selectUser)
    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>
                Mi Perfil
            </Text>
            <ProfileCard
                name={user?.email ?? "Usuario"}
                role="Usuario de TaskFlow"
                image="https://i.pravatar.cc/150?img=55"
            />

            <Text style={{ textAlign: "center", color: COLORS.textLight, marginTop: 12 }}>{user?.email}</Text>
            <TouchableOpacity
                style={{ backgroundColor: COLORS.danger, borderRadius: 20, paddingVertical: 10, alignItems: "center", margin: 20 }}
                onPress={() => logOut().catch(() => Alert.alert("Error", "No se pudo cerrar la sesión"))}
            >
                <Text style={{ color: COLORS.card, fontWeight: "bold" }}>Cerrar sesión</Text>
            </TouchableOpacity>
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