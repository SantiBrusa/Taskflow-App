import { View, Text, StyleSheet } from "react-native"
import { COLORS } from "../constants/theme"

export function EmptyState() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                ¡No tienes tareas pendientes! Empieza por crear una arriba.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: COLORS.textLight,
        textAlign: "center",
    },
})