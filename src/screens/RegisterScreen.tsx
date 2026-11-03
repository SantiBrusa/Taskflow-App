import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../navigation/types"
import { createAccount } from "../services/authService"
import { AuthForm } from "../components/AuthForm"

type Props = NativeStackScreenProps<AuthStackParamList, "Register">

export function RegisterScreen({ navigation }: Props) {
    return (
        <AuthForm
            title="Crear cuenta"
            buttonText="Registrarme"
            onSubmit={createAccount}
            footerText="¿Ya tenés cuenta? Iniciá sesión"
            onFooterPress={() => navigation.navigate("Login")}
        />
    )
}