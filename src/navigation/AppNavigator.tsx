import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../constants/theme"
import { HomeStackParamList, RootTabParamList } from "./types"
import { TaskListScreen } from "../screens/TaskListScreen"
import { TaskDetailScreen } from "../screens/TaskDetailScreen"
import { TaskFormScreen } from "../screens/TaskFormScreen"
import { ProfileScreen } from "../screens/ProfileScreens"

const Tab = createBottomTabNavigator<RootTabParamList>()
const Stack = createNativeStackNavigator<HomeStackParamList>()

// La ruta "Home" es en realidad un Stack con las tres pantallas de tareas
function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.card },
                headerTintColor: COLORS.primary,
                headerTitleStyle: { color: COLORS.text },
                contentStyle: { backgroundColor: COLORS.background },
            }}
        >
            <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: "Mis tareas" }} />
            <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: "Detalle" }} />
            <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: "Nueva tarea" }} />
        </Stack.Navigator>
    )
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    // El header lo dibuja el Stack, así no se duplica
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
        </NavigationContainer>
    )
}