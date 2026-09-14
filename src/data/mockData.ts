// ============================================
// DATOS MOCKEADOS PARA TESTING
// Estructura idéntica a lo que generará la IA
// ============================================

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  relatedPhase: 'discover' | 'explore' | 'understand' | 'master';
}

export interface ChatResponse {
  message: string;
  relatedContent?: string;
}

// Preguntas mockeadas para el REL (Retículo Endoplasmático Liso)
export const mockQuizQuestions: Record<string, QuizQuestion[]> = {
  'rel-general': [
    // Nivel Básico (Fase Descubrir + Explorar)
    {
      id: 'rel-basic-1',
      question: '¿Cuál es la metáfora central del REL?',
      options: [
        'El taller de costura de la célula',
        'La planta química de la célula',
        'El centro de control de la célula',
        'La central energética de la célula'
      ],
      correctAnswer: 1,
      explanation: 'El REL es la planta química de la célula: maneja grasas, fabrica hormonas, limpia toxinas y guarda calcio.',
      difficulty: 'basic',
      relatedPhase: 'discover'
    },
    {
      id: 'rel-basic-2',
      question: '¿Qué diferencia visualmente al REL del RER?',
      options: [
        'El REL tiene más membranas',
        'El REL no tiene ribosomas (es liso)',
        'El REL es más grande',
        'El REL está en el núcleo'
      ],
      correctAnswer: 1,
      explanation: 'El REL es una red de túbulos lisos sin ribosomas, mientras que el RER tiene sacos aplanados con ribosomas adheridos.',
      difficulty: 'basic',
      relatedPhase: 'explore'
    },
    {
      id: 'rel-basic-3',
      question: '¿Cuál de estas NO es una función del REL?',
      options: [
        'Fabricar hormonas esteroideas',
        'Detoxificar sustancias tóxicas',
        'Sintetizar proteínas',
        'Almacenar calcio'
      ],
      correctAnswer: 2,
      explanation: 'La síntesis de proteínas es función del RER (Retículo Endoplasmático Rugoso), no del REL.',
      difficulty: 'basic',
      relatedPhase: 'understand'
    },
    // Nivel Intermedio (Fase Comprender)
    {
      id: 'rel-intermediate-1',
      question: '¿Por qué el REL del hígado es especialmente desarrollado?',
      options: [
        'Porque el hígado necesita fabricar muchas proteínas',
        'Porque el hígado trabaja horas extras detoxificando toxinas',
        'Porque el hígado almacena mucho calcio',
        'Porque el hígado produce muchas hormonas'
      ],
      correctAnswer: 1,
      explanation: 'El hígado es el filtro del cuerpo. El REL trabaja horas extras neutralizando toxinas (medicamentos, alcohol, pesticidas) y regulando el azúcar en la sangre.',
      difficulty: 'intermediate',
      relatedPhase: 'understand'
    },
    {
      id: 'rel-intermediate-2',
      question: '¿Qué nombre especial recibe el REL en las células musculares?',
      options: [
        'Retículo sarcoplasmático',
        'Retículo nuclear',
        'Retículo perinuclear',
        'Retículo golgiano'
      ],
      correctAnswer: 0,
      explanation: 'En las células musculares, el REL se especializa como Retículo Sarcoplasmático y su función principal es almacenar y liberar calcio para la contracción muscular.',
      difficulty: 'intermediate',
      relatedPhase: 'understand'
    },
    {
      id: 'rel-intermediate-3',
      question: '¿Qué enzima clave contiene el REL para regular el azúcar en la sangre?',
      options: [
        'ATP sintasa',
        'Glucosa-6-fosfatasa',
        'Citocromo P450',
        'Peptidil transferasa'
      ],
      correctAnswer: 1,
      explanation: 'La glucosa-6-fosfatasa "quita el seguro" al azúcar almacenada en el hígado, liberando glucosa libre a la sangre cuando tu nivel baja.',
      difficulty: 'intermediate',
      relatedPhase: 'understand'
    },
    // Nivel Avanzado (Fase Dominar)
    {
      id: 'rel-advanced-1',
      question: 'Si una persona toma un medicamento durante semanas, ¿qué le pasa al REL de sus células hepáticas?',
      options: [
        'Se atrofia por el exceso de trabajo',
        'Se hipertrofia (crece) para detoxificar más rápido',
        'No cambia, mantiene su tamaño original',
        'Desaparece porque ya no es necesario'
      ],
      correctAnswer: 1,
      explanation: 'El REL del hígado crece y se multiplica para eliminar el fármaco cada vez más rápido. Es como ampliar una planta de tratamiento cuando llega más agua contaminada.',
      difficulty: 'advanced',
      relatedPhase: 'master'
    },
    {
      id: 'rel-advanced-2',
      question: '¿Cuál es la trampa común de examen sobre el REL?',
      options: [
        'Confundirlo con el aparato de Golgi',
        'Decir que tiene ribosomas (eso es el RER)',
        'Confundirlo con las mitocondrias',
        'Decir que solo existe en células animales'
      ],
      correctAnswer: 1,
      explanation: 'Trampa común: "¿El REL tiene ribosomas?" → NO, eso es el RER. El REL es liso, sin ribosomas. El RER es rugoso, con ribosomas.',
      difficulty: 'advanced',
      relatedPhase: 'master'
    },
    {
      id: 'rel-advanced-3',
      question: '¿Qué complejo enzimático del REL se encarga de la detoxificación?',
      options: [
        'ATP sintasa',
        'Complejo de Citocromo P450',
        'Rubisco',
        'DNA polimerasa'
      ],
      correctAnswer: 1,
      explanation: 'El complejo enzimático microsomal del Citocromo P450 transforma sustancias tóxicas lipófilas en sustancias solubles para que se eliminen por orina o bilis.',
      difficulty: 'advanced',
      relatedPhase: 'master'
    }
  ]
};

// Respuestas mockeadas del chat
export const mockChatResponses: Record<string, ChatResponse[]> = {
  'rel-general': [
    {
      message: 'El REL del hígado es más grande porque trabaja horas extras. Imagina una planta de tratamiento de aguas: si recibe 10 veces más contaminantes, necesitas más tuberías y más trabajadores. El REL del hígado neutraliza toxinas (medicamentos, alcohol, pesticidas) y regula el azúcar, por eso necesita más "tuberías" (túbulos) para procesar todo.',
      relatedContent: 'detoxificación'
    },
    {
      message: 'En el músculo, el REL se llama Retículo Sarcoplasmático y su única misión es guardar calcio y liberarlo cuando llega la señal del cerebro. Piensa en una represa: cuando se abren las compuertas, el agua (calcio) inunda el campo (fibra muscular) y el músculo se contrae. Sin REL, no hay latido del corazón.',
      relatedContent: 'almacenamiento de calcio'
    },
    {
      message: 'La diferencia clave es que el RER tiene ribosomas adheridos (por eso se ve "rugoso") y se dedica a fabricar proteínas. El REL no tiene ribosomas (es "liso") y se dedica a las grasas, hormonas y detoxificación. Son como dos departamentos de la misma fábrica: el RER es el taller de costura, el REL es la planta química.',
      relatedContent: 'comparación RER vs REL'
    }
  ]
};

// Función para obtener preguntas por nivel
export function getQuestionsByDifficulty(
  subtemaId: string,
  difficulty: 'basic' | 'intermediate' | 'advanced'
): QuizQuestion[] {
  const allQuestions = mockQuizQuestions[subtemaId] || [];
  return allQuestions.filter(q => q.difficulty === difficulty);
}

// Función para obtener respuesta del chat
export function getMockChatResponse(subtemaId: string, question: string): string {
  const responses = mockChatResponses[subtemaId] || [];
  if (responses.length === 0) {
    return 'Esta es una pregunta interesante. Cuando conectemos la API de IA, podré darte una respuesta personalizada basada en el contenido completo del tema. Por ahora, te recomiendo revisar la fase "Comprender" para profundizar en este concepto.';
  }
  // Simular respuesta aleatoria
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  return randomResponse.message;
}
