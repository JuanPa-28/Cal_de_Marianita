const resultScreen = document.getElementById('result');
const dinoBubble = document.getElementById('dinoBubble');

// Mensaje inicial del dinosaurio
const initialDinoMessage = "¡Hola Mariana! Soy Rocket. dime que vas a operar hoy.";

// Actualiza el mensaje del dino en la burbuja
function updateDinoSpeech(message) {
    dinoBubble.textContent = message;
}

/**
 * Agrega el valor del botón (número u operador) a la pantalla.
 * Se ha simplificado al quitar la lógica de mensajes personalizados.
 * @param {string} value - El valor a añadir (ej: '7', '+', '.').
 */
function appendValue(value) {
    // Si la pantalla está vacía y el valor no es un número o un menos, avisa.
    if (resultScreen.value === '' && isOperator(value) && value !== '-') {
        updateDinoSpeech("WTF, enpieza con un numero mi socia, ¿estas loca?");
        return; 
    }
    
    // Evita doble operador consecutivo 
    const lastChar = resultScreen.value.slice(-1);
    if (isOperator(lastChar) && isOperator(value)) {
        if (value !== '-') {
            resultScreen.value = resultScreen.value.slice(0, -1) + value;
            updateDinoSpeech(`oye oye solo puede con un solo signo (${value}) Calmate!`);
        } else {
            resultScreen.value += value;
        }
        return;
    }
    
    resultScreen.value += value;
    if (isOperator(value)) {
        updateDinoSpeech(`¡Un signo de ${getOperatorName(value)} omg!`);
    } else if (value === '.') {
        updateDinoSpeech("¿Con los decimales? es enserio Mariana?");
    }
}

/**
 * Limpia la pantalla de resultado.
 */
function clearResult() {
    resultScreen.value = '';
    updateDinoSpeech("No me borre las cosas niña ");
}

/**
 * Calcula la expresión actual en la pantalla y la explica.
 */
function calculateResult() {
    if (resultScreen.value === '') {
        updateDinoSpeech("¿hay que poner algo no? Es una calculadora ");
        return;
    }

    try {
        let expression = resultScreen.value;
        let result = eval(expression);
        
        // Explicación antes de mostrar el resultado
        let explanation = explainOperation(expression, result);
        updateDinoSpeech(explanation);

        resultScreen.value = Number.isInteger(result) ? result : result.toFixed(5);
        
    } catch (e) {
        resultScreen.value = 'Syntax Error';
        updateDinoSpeech("wow wow wow... ella no puede con tanto ");
    }
}

/**
 * Comprueba si un carácter es un operador.
 */
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

/**
 * Devuelve el nombre "amigable" de un operador.
 */
function getOperatorName(operator) {
    switch (operator) {
        case '+': return "suma";
        case '-': return "resta";
        case '*': return "multiplicación";
        case '/': return "división";
        default: return "operador";
    }
}

/**
 * Genera una explicación "para niños" de la operación. (Sin cambios)
 */
function explainOperation(expression, result) {
    const parts = expression.match(/(-?\d+\.?\d*)|([\+\-\*\/])/g); 
    if (!parts || parts.length < 3) {
        return "Algo no me cuadra wtf???";
    }

    let explanation = "Bueno, bueno...";
    
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (isOperator(part)) {
            switch (part) {
                case '+': explanation += "y luego le vamos a SUMAR "; break;
                case '-': explanation += "y después le vamos a RESTAR "; break;
                case '*': explanation += "y eso lo vamos a MULTIPLICAR por "; break;
                case '/': explanation += "y lo DIVIDIMOS entre "; break;
            }
        } else { // Es un número
            if (i === 0) {
                explanation += `Empezamos con el número ${part}. `;
            } else if (i > 0 && isOperator(parts[i-1])) {
                 explanation += `el número **${part}** `;
            }
        }
    }
    explanation += `Y al final, ¡el resultado es ${result}. muy bien mariana 🎉`;
    
    const extraPhrases = [
        "Alias (Doña enojona)",
        "¡Eres muy inteligente!",
        "La matemática es lo tuyo",
        "Eres mas rapida que la inteligencia wooow",
        "ishh, esto es lo tuyo bb",
        "Salte del planeta",
        "Llegaste al top global",
        "Eso vv alokate",
        "You are very good",
        "Pongan la plata de diometes",
        "muy buena, a que horas sales mi reina?",
        "No dejes que nadie encienda tu brillo",
        "Los tralaleros dicen tralala y marianita dice tra la la ",

    ];
    explanation += " " + extraPhrases[Math.floor(Math.random() * extraPhrases.length)];

    return explanation;
}


// Mensaje inicial cuando la página carga
updateDinoSpeech(initialDinoMessage);