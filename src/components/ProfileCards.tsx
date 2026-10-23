import { View, Text, Image, StyleSheet } from "react-native"
import { COLORS } from "../constants/theme"

type Props = {
    name: string;
    role: string;
    image: string;
}

export function ProfileCard({name, role, image} : Props) {
    return (
        <View style={Styles.card}>
            <Image source={{ uri: image }} style={Styles.avatar}/>
            <View style={Styles.info}>
                <Text style={Styles.name}>{name}</Text>
                <Text style={Styles.role}>{role}</Text>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.border,
    },
    info: {
        marginLeft: 16,
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    role: {
        fontSize: 14,
        color: COLORS.textLight,
        marginTop: 2,
    },
})
