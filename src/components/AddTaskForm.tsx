import { useState } from "react"
import { View, TextInput, StyleSheet, TouchableOpacity, Alert, Text, Keyboard, TouchableWithoutFeedback } from "react-native"
import { COLORS } from "../constants/theme"

// Categorías disponibles. La primera queda seleccionada por defecto.
const categories = [
    "Mantenimiento",
    "Limpieza",
    "Administracion",
]

export function AddTaskForm() {
    // Estado de cada campo del formulario (inputs controlados)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState(categories[0])

    // Mensajes de error por campo. Si una clave no existe, ese campo no tiene error.
    const [errors, setErrors] = useState<{title?: string; description?: string}>({})

    // Campo que tiene el foco en este momento (null si ninguno). Sirve para el color del borde.
    const [focused, setFocused] = useState<"title" | "description" | null>(null)

    /**
     * Revisa los campos y devuelve un objeto con los errores encontrados.
     * Si el objeto vuelve vacío, el formulario es válido.
     * Se usa trim() para que los espacios en blanco no cuenten como contenido.
     * La categoría no se valida porque siempre hay una seleccionada.
     */
    const validate = () => {
        const newErrors: {title?: string; description?: string} = {}

        // Título: obligatorio y mínimo 5 caracteres
        if (!title.trim()) {
            newErrors.title = "El título es obligatorio"
        } else if (title.trim().length < 5) {
            newErrors.title = "El mínimo de caracteres es 5"
        }

        // Descripción: obligatoria y mínimo 10 caracteres
        if (!description.trim()) {
            newErrors.description = "La descripción es obligatoria"
        } else if (description.trim().length < 10) {
            newErrors.description = "El mínimo de caracteres es 10"
        }

        return newErrors
    }

     // Simula el envío a una API: valida, muestra el resultado y limpia el formulario
    const handleAddTask = () => {
        const validation = validate()

        // Se guardan los errores para mostrarlos en pantalla.
        // Si todo es válido, esto también borra los errores anteriores.
        setErrors(validation)

        // Si el objeto tiene alguna clave, hay errores: se corta acá y no se guarda nada
        if(Object.keys(validation).length > 0){
            return;
        }

        // Objeto final de la tarea (con los textos sin espacios sobrantes)
        const task = {
            title: title.trim(),
            description: description.trim(),
            category: category
        }

        console.log(task)

        Alert.alert("Éxito","Tarea capturada localmente")

        // Se limpian los campos y la categoría vuelve a la de por defecto
        setTitle("")
        setDescription("")
        setCategory(categories[0])
    }

    // Elige el color del borde. El orden importa: el error tiene prioridad sobre el foco,
    // así el borde sigue rojo mientras el usuario corrige el campo.
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
    // Al tocar fuera de los campos se cierra el teclado (útil en iPhone con el input multilínea)
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            {/* Título */}
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

            {/* Descripción*/}
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

            {/* Selector de categoría: un botón por categoría, resaltado el seleccionado */}
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

            {/* Botón de guardar */}
            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>

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

