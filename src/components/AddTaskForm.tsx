import { useState } from "react"
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, Text } from "react-native"
import { COLORS } from "../constants/theme"

const categories = [
    "Mantenimiento",
    "Limpieza",
    "Administracion",
]

export function AddTaskForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState(categories[0])

    const [errors, setErrors] = useState<{title?: string; description?: string}>({})

    const [focused, setFocused] = useState<"title" | "description" | null>(null)

    const validate = () => {
        const newErrors: {title?: string; description?: string} = {}

        if (!title.trim()) {
            newErrors.title = "El título es obligatorio"
        } else if (title.trim().length < 5) {
            newErrors.title = "El mínimo de caracteres es 5"
        }

        if (!description.trim()) {
            newErrors.description = "La descripción es obligatoria"
        } else if (description.trim().length < 10) {
            newErrors.description = "El mínimo de caracteres es 10"
        }

        return newErrors
    }

    const handleAddTask = () => {
        const validation = validate()

        setErrors(validation)

        if(Object.keys(validation).length > 0){
            return;
        }

        const task = {
            title: title.trim(),
            description: description.trim(),
            category: category
        }

        console.log(task)

        Alert.alert("Éxito","Tarea capturada localmente")

        setTitle("")
        setDescription("")
        setCategory(categories[0])
    }

    const getBorderColor = (field: "title" | "description") => {
        if(errors[field]){
            return COLORS.danger;
        }

        if(focused === field){
            return COLORS.primary
        }else{
            return COLORS.border
        }
    }
  return (
    <View style={styles.container}>
        <TextInput
        style={[styles.input, { borderColor: getBorderColor("title")}]}
        placeholder="¿Qué hay que hacer?"
        placeholderTextColor={COLORS.textLight}
        value={title}
        onChangeText={setTitle}
        autoCapitalize="sentences"
        onFocus={() => setFocused("title")}
        onBlur={() => setFocused(null)}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        <TextInput
        style={[styles.input, styles.textArea, { borderColor: getBorderColor("description")}]}
        placeholder="Describe que hacer"
        placeholderTextColor={COLORS.textLight}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        autoCapitalize="sentences"
        onFocus={() => setFocused("description")}
        onBlur={() => setFocused(null)}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <View style={styles.categories}>
            {categories.map((c)=>(
                <TouchableOpacity
                key={c}
                style={[styles.optionCategory, c === category && styles.optionSelected]}
                onPress={()=>setCategory(c)}
                >
                    <Text style={[styles.optionText, c === category && styles.textSelected]}>{c}</Text>
                </TouchableOpacity>
            ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
            <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
    </View>

  )

}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        padding: 20,
        backgroundColor: COLORS.background,
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
    textArea: {
        minHeight: 100,
    },
    categories: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    optionCategory: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        backgroundColor: COLORS.card,
    },
    optionSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary
    },
    optionText: {
        color: COLORS.textLight,
    },
    textSelected: {
        color: COLORS.card
    },
    errorText: {
        color: COLORS.danger,
        fontSize: 13,
        marginTop: -8,
        marginBottom: 8
        
    },
    button: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        alignItems: 'center',
        marginTop: 12
    },
    buttonText: {
        color: COLORS.card,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

