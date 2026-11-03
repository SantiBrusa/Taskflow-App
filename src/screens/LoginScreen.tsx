import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../navigation/types"
import { signIn } from "../services/authService"
import { AuthForm } from "../components/AuthForm"

type Props = NativeStackScreenProps<AuthStackParamList, "Login">

export function LoginScreen({ navigation }: Props) {
    return (
        <AuthForm
            title="Iniciar sesión"
            buttonText="Ingresar"
            onSubmit={signIn}
            footerText="¿No tenés cuenta? Registrate"
            onFooterPress={() => navigation.navigate("Register")}
        />
    )
}