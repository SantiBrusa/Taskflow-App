import { View, ActivityIndicator, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../constants/theme"
import { HomeStackParamList, RootTabParamList, AuthStackParamList } from "./types"
import { useAppSelector } from "../store/hooks"
import { selectUser } from "../store/authSlice"
import { useAuthListener, useTasksListener } from "../hooks/useFirebaseSync"
import { TaskListScreen } from "../screens/TaskListScreen"
import { TaskDetailScreen } from "../screens/TaskDetailScreen"
import { TaskFormScreen } from "../screens/TaskFormScreen"
import { ProfileScreen } from "../screens/ProfileScreens"
import { LoginScreen } from "../screens/LoginScreen"
import { RegisterScreen } from "../screens/RegisterScreen"

const Tab = createBottomTabNavigator<RootTabParamList>()
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>()
const AuthStackNav = createNativeStackNavigator<AuthStackParamList>()

function HomeStack() {
    return (
        <HomeStackNav.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.card },
                headerTintColor: COLORS.primary,
                headerTitleStyle: { color: COLORS.text },
                contentStyle: { backgroundColor: COLORS.background },
            }}
        >
            <HomeStackNav.Screen name="TaskList" component={TaskListScreen} options={{ title: "Mis tareas" }} />
            <HomeStackNav.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: "Detalle" }} />
            <HomeStackNav.Screen name="TaskForm" component={TaskFormScreen} options={{ title: "Nueva tarea" }} />
        </HomeStackNav.Navigator>
    )
}

// Stack para usuarios sin sesión
function AuthStack() {
    return (
        <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
            <AuthStackNav.Screen name="Login" component={LoginScreen} />
            <AuthStackNav.Screen name="Register" component={RegisterScreen} />
        </AuthStackNav.Navigator>
    )
}

// Tabs para usuarios logueados (lo que ya tenías)
function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textLight,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap

                    if (route.name === "Home") {
                        iconName = focused ? "list" : "list-outline"
                    } else {
                        iconName = focused ? "person" : "person-outline"
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} options={{ title: "Tareas" }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, title: "Perfil" }} />
        </Tab.Navigator>
    )
}

export default function AppNavigator() {
    const user = useAppSelector(selectUser)
    const initializing = useAuthListener()   // restaura la sesión
    useTasksListener()                       // sincroniza Firestore → Redux

    // Mientras Firebase restaura la sesión no se muestra nada, para evitar ver el login un instante
    if (initializing) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {/* Protección de rutas: sin usuario, las pantallas de tareas directamente no existen */}
            {user ? <MainTabs /> : <AuthStack />}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
    },
})