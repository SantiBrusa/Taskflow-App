import { useState } from "react"
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    ActivityIndicator, Keyboard, TouchableWithoutFeedback,
} from "react-native"
import { COLORS } from "../constants/theme"
import { getAuthErrorMessage } from "../services/authService"

type AuthFormProps = {
    title: string
    buttonText: string
    // Recibe email y contraseña; debe devolver una promesa (createAccount o signIn)
    onSubmit: (email: string, password: string) => Promise<unknown>
    footerText: string
    onFooterPress: () => void
}

export function AuthForm({ title, buttonText, onSubmit, footerText, onFooterPress }: AuthFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        // Validación local antes de llamar a Firebase
        if (!email.trim() || !email.includes("@")) {
            setError("Ingresá un email válido")
            return
        }
        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres")
            return
        }

        setError("")
        setLoading(true)
        try {
            await onSubmit(email.trim(), password)
            // Si sale bien, onAuthStateChanged cambia la navegación solo
        } catch (e) {
            setError(getAuthErrorMessage(e))
            setLoading(false)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={COLORS.textLight}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={COLORS.textLight}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />

                {error !== "" && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color={COLORS.card} />
                    ) : (
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={onFooterPress}>
                    <Text style={styles.footer}>{footerText}</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.text,
        textAlign: "center",
        marginBottom: 24,
    },
    input: {
        backgroundColor: COLORS.card,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        fontSize: 16,
        color: COLORS.text,
    },
    errorText: {
        color: COLORS.danger,
        fontSize: 13,
        marginBottom: 8,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: COLORS.card,
        fontWeight: "bold",
        fontSize: 16,
    },
    footer: {
        color: COLORS.primary,
        textAlign: "center",
        marginTop: 16,
    },
})