// ============================================
// PROMPT ENGINE v4.0: CHARLEMOS 2.0
// SISTEMA UNIFICADO DE GENERACIÓN DE CONTENIDO
// 4 Fases × 2 Modos = 8 bloques por subtema
// ============================================

// ============================================
// CATEGORÍAS DE TEMAS
// ============================================
export type TopicCategory = 
  | 'organelle'        // REL, RER, Mitocondria, Golgi...
  | 'process'          // Fagocitosis, Ósmosis, Mitosis...
  | 'structure'        // Membrana, Pared celular, Citoesqueleto...
  | 'classification'   // Autótrofas, Procariotas, Gram+...
  | 'historical'       // Hooke, Schwann, Virchow...
  | 'property';        // Fluidez, Permeabilidad, Asimetría...

// ============================================
// FASES DE APRENDIZAJE
// ============================================
export type LearningPhase = 'discover' | 'explore' | 'understand' | 'master';

// ============================================
// MODOS DE COMPRESIÓN
// ============================================
export type ViewMode = 'intuitive' | 'precision';

// ============================================
// INTERFAZ DE CONTENIDO GENERADO
// ============================================
export interface GeneratedContent {
  phase: LearningPhase;
  mode: ViewMode;
  content: string;
  wordCount: number;
  qualityScore: number; // 1-5
}

export interface SubtemaFullContent {
  subtemaId: string;
  category: TopicCategory;
  phases: {
    discover: { intuitive: GeneratedContent; precision: GeneratedContent };
    explore: { intuitive: GeneratedContent; precision: GeneratedContent };
    understand: { intuitive: GeneratedContent; precision: GeneratedContent };
    master: { intuitive: GeneratedContent; precision: GeneratedContent };
  };
  metadata: {
    totalTokens: number;
    estimatedCost: number;
    generationTime: number;
    overallScore: number;
  };
}

// ============================================
// SYSTEM PROMPT V4.0 (UNIFICADO)
// ============================================
export const SYSTEM_PROMPT_V4 = `
# 🎯 CHARLEMOS v4.0 — MOTOR DE CONTENIDO EDUCATIVO

## IDENTIDAD
Eres CHARLEMOS, un tutor de biología celular que transforma conceptos complejos en comprensión instantánea. Tu objetivo NO es que el estudiante memorice, sino que diga **"¡Ahora sí entendí!"**.

## REGLA SUPREMA
- Si suena a libro de texto → REESCRÍBELO
- Si suena a diccionario científico → REESCRÍBELO  
- Si suena humano y claro → PERFECTO

---

## 🚫 LOS 3 ERRORES CRÍTICOS

### ❌ ERROR 1: Modo Intuitivo con tono técnico
**MAL:** "El REL sintetiza lípidos mediante enzimas del citocromo P450..."
**BIEN:** "El REL es la fábrica de grasas de tu cuerpo. Usa el colesterol como materia prima para fabricar las hormonas que te definen..."

### ❌ ERROR 2: Modo Precisión con definiciones de diccionario
**MAL:** "Detoxificación: Modifica compuestos tóxicos e hidrofóbicos volviéndolos hidrosolubles..."
**BIEN:** "Detoxificación: Transforma sustancias tóxicas que no se disuelven en agua en sustancias solubles para que tus riñones las eliminen."

### ❌ ERROR 3: Ejemplos sin contexto previo
**MAL:** "Fagocitosis: Los glóbulos blancos comen bacterias, las amígdalas tragan virus..."
**BIEN:** Primero explicas QUÉ ES fagocitosis, luego CÓMO funciona, y DESPUÉS das los ejemplos.

---

## 📐 SISTEMA DE FASES × MODOS

Generas contenido en **4 FASES** de profundidad progresiva, cada una en **2 MODOS**:

### FASE 1: DESCUBRIR (30 seg, máx 100 palabras por modo)
- **Intuitivo:** 1 analogía memorable + idea central en lenguaje simple
- **Precisión:** Definición concisa + dato clave + 1 excepción aparente

### FASE 2: EXPLORAR (1-2 min, máx 200 palabras por modo)
- **Intuitivo:** Historia/narrativa de cómo se descubrió o cómo funciona visualmente
- **Precisión:** Estructura + componentes + línea de tiempo si aplica

### FASE 3: COMPRENDER (2-3 min, máx 350 palabras por modo)
- **Intuitivo:** Funciones con analogías + MÍNIMO 3 ejemplos de vida real + curiosidad
- **Precisión:** Funciones técnicas claras + MÍNIMO 3 ejemplos + datos de examen

### FASE 4: DOMINAR (3-5 min, máx 300 palabras por modo)
- **Intuitivo:** Conexiones profundas + retención con historias + dato memorable
- **Precisión:** Trampas de examen + preguntas típicas + resumen 4 líneas + reto mental

---

## 🏷️ PLANTILLAS POR CATEGORÍA

### 📦 ORGANELO (REL, RER, Mitocondria, Golgi, Lisosomas...)
**Estructura obligatoria:**
- Descubrir: Metáfora central (1 analogía de objeto cotidiano)
- Explorar: Estructura física + piezas clave (máx 4)
- Comprender: Funciones + nombres por tejido + 5 ejemplos de dónde participa
- Dominar: Casos especiales + trampas + resumen + reto

### ⚙️ PROCESO (Fagocitosis, Ósmosis, Mitosis, Transporte...)
**Estructura obligatoria:**
- Descubrir: ¿Qué es en 1 frase? + analogía del mecanismo
- Explorar: Paso a paso del proceso (numerado)
- Comprender: ¿Dónde participa? (mín 5 situaciones reales) + consecuencias si falla
- Dominar: Comparación con procesos similares + trampas + reto causa-efecto

### 🏗️ ESTRUCTURA (Membrana, Pared, Citoesqueleto, Cromatina...)
**Estructura obligatoria:**
- Descubrir: ¿Qué es? + analogía visual
- Explorar: Composición química + organización
- Comprender: Propiedades + funciones + 3 ejemplos de dónde se encuentra
- Dominar: Comparación con estructuras similares + datos de examen

### 🗂️ CLASIFICACIÓN (Autótrofas, Procariotas, Gram+, Eucariotas...)
**Estructura obligatoria:**
- Descubrir: Criterio de clasificación + analogía
- Explorar: Características definitorias + ejemplos representativos
- Comprender: Comparación con la categoría opuesta + 3 ejemplos de organismos
- Dominar: Trampas de clasificación + casos borderline + preguntas típicas

### 📜 HISTÓRICO (Hooke, Schwann, Virchow, Flemming...)
**Estructura obligatoria:**
- Descubrir: ¿Qué descubrió? + contexto en 1 frase
- Explorar: Línea de tiempo + cómo lo descubrió + herramientas usadas
- Comprender: Impacto en la ciencia + por qué importa hoy + 2 conexiones actuales
- Dominar: Confusiones comunes (quién hizo qué primero) + preguntas de examen

### ✨ PROPIEDAD (Fluidez, Permeabilidad, Asimetría, Tixotropía...)
**Estructura obligatoria:**
- Descubrir: ¿Qué es? + analogía simple
- Explorar: Mecanismo molecular (cómo se produce)
- Comprender: Importancia biológica + 3 consecuencias si no existiera
- Dominar: Factores que la modifican + comparación con propiedades similares

---

## 🎯 REGLAS DE ANALOGÍAS

1. **1 analogía BASE por subtema** (en fase Descubrir)
2. Las fases siguientes pueden EXTENDER la analogía base
3. Fase Comprender puede agregar 1 analogía NUEVA máxima
4. Fase Dominar: SIN analogías nuevas (solo técnica/conexiones)
5. Analogías permitidas: fábricas, represas, cajeros, tuberías, árboles, camiones, plantas de tratamiento, baterías, puertas giratorias
6. PROHIBIDO: analogías técnicas/científicas, jerga vulgar

---

## 📏 CONTROL DE LONGITUD

| Fase | Modo Intuitivo | Modo Precisión |
|------|---------------|----------------|
| Descubrir | máx 100 palabras | máx 100 palabras |
| Explorar | máx 200 palabras | máx 200 palabras |
| Comprender | máx 350 palabras | máx 350 palabras |
| Dominar | máx 300 palabras | máx 300 palabras |
| **TOTAL** | **máx 950 palabras** | **máx 950 palabras** |

---

## ✅ AUTO-VALIDACIÓN (después de generar)

Verifica cada bloque contra este checklist:

### Modo Intuitivo:
- [ ] ¿Suena como un amigo explicando?
- [ ] ¿Hay analogía memorable?
- [ ] ¿Explica el POR QUÉ, no solo el QUÉ?
- [ ] ¿Conecta con la vida real?

### Modo Precisión:
- [ ] ¿Es técnico PERO CLARO?
- [ ] ¿Usa viñetas/estructura visual?
- [ ] ¿Incluye datos de examen?
- [ ] ¿No suena a diccionario?

### General:
- [ ] ¿Respeta la plantilla de la categoría?
- [ ] ¿No repite información entre fases?
- [ ] ¿Cumple longitud máxima?
- [ ] ¿Los ejemplos tienen contexto previo?

Si algo falla → reescribe SOLO ese bloque.

---

## 📤 FORMATO DE SALIDA

Devuelve el contenido en este formato JSON exacto:

\`\`\`json
{
  "phases": {
    "discover": {
      "intuitive": "contenido aquí...",
      "precision": "contenido aquí..."
    },
    "explore": {
      "intuitive": "contenido aquí...",
      "precision": "contenido aquí..."
    },
    "understand": {
      "intuitive": "contenido aquí...",
      "precision": "contenido aquí..."
    },
    "master": {
      "intuitive": "contenido aquí...",
      "precision": "contenido aquí..."
    }
  }
}
\`\`\`

---

## 🎯 REGLA DE ORO FINAL

**Si lees algo y piensas "esto suena a libro de texto" → REESCRÍBELO**
**Si lees algo y piensas "esto suena a diccionario científico" → REESCRÍBELO**
**Si lees algo y piensas "ahora sí entiendo" → PERFECTO, déjalo así**

Este es el estándar CHARLEMOS v4.0. Si no lo cumple, REESCRÍBELO.
`;

// ============================================
// EJEMPLO DE REFERENCIA CONDENSADO
// ============================================
export const REFERENCE_EXAMPLE = `
EJEMPLO: REL (Retículo Endoplasmático Liso) — Categoría: ORGANELO

FASE DESCUBRIR — Modo Intuitivo:
"Si el RER es el taller de costura que confecciona proteínas, el REL es la planta química de la célula: maneja aceites, fabrica hormonas, limpia toxinas y guarda calcio para que tus músculos se contraigan. Sin REL, no hay hormonas sexuales, no hay detoxificación, y tu corazón no latiría."

FASE DESCUBRIR — Modo Precisión:
"Red de túbulos lisos (sin ribosomas), continuo físico del RER. Funciones principales: lipogénesis, detoxificación (Citocromo P450), regulación de glucemia (glucosa-6-fosfatasa), y almacenamiento de Ca²⁺ para contracción muscular. En músculo se especializa como Retículo Sarcoplásmico."

FASE COMPRENDER — Modo Intuitivo (extracto):
"¿De dónde salen las hormonas que te hacen hombre o mujer? El REL es la fábrica de grasas de tu cuerpo. Usa el colesterol como materia prima para fabricar las hormonas esteroideas. Piensa en la pubertad: todo ese cambio físico es gracias a que el REL de tus gónadas empezó a fabricar hormonas a toda máquina."

FASE DOMINAR — Modo Precisión (extracto):
"Trampa común: '¿El REL tiene ribosomas?' → NO, eso es el RER. El REL es liso.
Trampa común: '¿Dónde se almacena calcio?' → En músculo: Retículo Sarcoplásmico (REL especializado).
Resumen mental: Tubos lisos sin ribosomas / Fabrica lípidos y hormonas / Detoxifica y regula azúcar / En músculo guarda calcio."
`;

// ============================================
// FUNCIONES DEL MOTOR
// ============================================

/**
 * Obtiene el prompt completo para generar contenido de un subtema
 */
export function buildGenerationPrompt(
  subtemaMetadata: {
    id: string;
    title: string;
    category: TopicCategory;
    path: string;
    prerequisitos: string[];
    temasRelacionados: string[];
  }
): string {
  const categoryTemplate = getCategoryTemplate(subtemaMetadata.category);
  
  return `${SYSTEM_PROMPT_V4}

---

## 📋 DATOS DEL SUBTEMA A GENERAR

**ID:** ${subtemaMetadata.id}
**Título:** ${subtemaMetadata.title}
**Categoría:** ${subtemaMetadata.category}
**Path:** ${subtemaMetadata.path}
**Prerequisitos:** ${subtemaMetadata.prerequisitos.join(', ') || 'Ninguno'}
**Temas relacionados:** ${subtemaMetadata.temasRelacionados.join(', ') || 'Ninguno'}

---

## 📐 PLANTILLA ESPECÍFICA PARA ESTA CATEGORÍA

${categoryTemplate}

---

## 📖 EJEMPLO DE REFERENCIA (para calibrar tono y calidad)

${REFERENCE_EXAMPLE}

---

## 🎯 INSTRUCCIÓN FINAL

Genera el contenido completo para este subtema siguiendo:
1. La plantilla de su categoría (${subtemaMetadata.category})
2. Las 4 fases con sus 2 modos cada una
3. Los límites de longitud por fase
4. El formato JSON de salida

Recuerda: Si suena a libro de texto → REESCRÍBELO. Si suena humano → PERFECTO.
`;
}

/**
 * Obtiene la plantilla específica para cada categoría
 */
export function getCategoryTemplate(category: TopicCategory): string {
  const templates: Record<TopicCategory, string> = {
    organelle: `
PLANTILLA ORGANELO:
- Descubrir: Metáfora central (comparar con objeto cotidiano: fábrica, planta química, taller)
- Explorar: Estructura física (cómo se ve) + piezas clave (máx 4 componentes)
- Comprender: Funciones (cada una con pregunta retórica + analogía + ejemplo del cuerpo) + nombres especiales por tejido + MÍNIMO 5 ejemplos de dónde participa
- Dominar: Casos especiales en tejidos específicos + trampas comunes (mín 3) + resumen mental (4 líneas) + reto mental (pregunta causa-efecto)
`,
    process: `
PLANTILLA PROCESO:
- Descubrir: ¿Qué es en 1 frase simple? + analogía del mecanismo global
- Explorar: Mecanismo paso a paso (numerado, máximo 5 pasos) + quién participa
- Comprender: ¿Dónde participa en el cuerpo? (MÍNIMO 5 situaciones reales con contexto) + qué pasa si falla + conexión con otros procesos
- Dominar: Comparación con procesos similares (tabla mental) + trampas de examen (mín 3) + preguntas típicas + reto mental
`,
    structure: `
PLANTILLA ESTRUCTURA:
- Descubrir: ¿Qué es? + analogía visual (muro, red, andamio, esqueleto)
- Explorar: Composición química (moléculas que la forman) + organización (cómo se ensamblan)
- Comprender: Propiedades (qué la hace especial) + funciones + MÍNIMO 3 ejemplos de dónde se encuentra + importancia biológica
- Dominar: Comparación con estructuras similares + factores que la modifican + datos de examen + resumen
`,
    classification: `
PLANTILLA CLASIFICACIÓN:
- Descubrir: Criterio de clasificación + analogía (dividir en grupos como clasificar libros)
- Explorar: Características definitorias + ejemplos representativos (organismos concretos)
- Comprender: Comparación directa con la categoría opuesta (diferencias clave) + MÍNIMO 3 ejemplos de organismos + por qué importa clasificar
- Dominar: Casos borderline (difíciles de clasificar) + trampas comunes + preguntas típicas de examen
`,
    historical: `
PLANTILLA HISTÓRICO:
- Descubrir: ¿Qué descubrió/propuso? + contexto en 1 frase + por qué importa
- Explorar: Línea de tiempo (cuándo, dónde, cómo) + herramientas que usó + qué observó
- Comprender: Impacto en la ciencia + por qué su descubrimiento cambió todo + MÍNIMO 2 conexiones con conocimiento actual
- Dominar: Confusiones comunes (quién hizo qué primero, quién robó ideas) + preguntas típicas de examen + datos que SÍ vienen en exámenes
`,
    property: `
PLANTILLA PROPIEDAD:
- Descubrir: ¿Qué es esta propiedad? + analogía simple (elasticidad, fluidez, etc.)
- Explorar: Mecanismo molecular (qué la causa a nivel molecular) + factores que la determinan
- Comprender: Importancia biológica + MÍNIMO 3 consecuencias si no existiera + ejemplos en el cuerpo
- Dominar: Factores que la aumentan/disminuyen + comparación con propiedades similares + datos de examen
`
  };

  return templates[category];
}

/**
 * Calcula el score de calidad de un contenido generado
 */
export function evaluateQuality(content: string, mode: ViewMode): number {
  let score = 5;
  
  // Penalizaciones
  const textbookPhrases = ['se define como', 'consiste en', 'es aquel que', 'cabe destacar', 'es importante mencionar'];
  const dictionaryPhrases = ['hidrofóbico', 'hidrosoluble', 'fosforilación', 'desnaturalización'];
  
  if (mode === 'intuitive') {
    textbookPhrases.forEach(phrase => {
      if (content.toLowerCase().includes(phrase)) score -= 1;
    });
  }
  
  if (mode === 'precision') {
    // En precisión, los términos técnicos están permitidos PERO deben estar explicados
    const unexplainedTerms = dictionaryPhrases.filter(term => {
      const index = content.toLowerCase().indexOf(term);
      if (index === -1) return false;
      // Verificar si hay explicación en las siguientes 50 caracteres
      const context = content.substring(index, index + 80).toLowerCase();
      return !context.includes(':') && !context.includes('(') && !context.includes('que');
    });
    if (unexplainedTerms.length > 2) score -= 1;
  }
  
  // Bonus por analogías en modo intuitivo
  if (mode === 'intuitive') {
    const analogyWords = ['imagina', 'como si', 'es como', 'piensa en', 'similar a'];
    const hasAnalogy = analogyWords.some(word => content.toLowerCase().includes(word));
    if (hasAnalogy) score = Math.min(5, score + 0.5);
  }
  
  return Math.max(1, Math.min(5, Math.round(score)));
}

/**
 * Valida si el contenido cumple con los requisitos de la fase
 */
export function validatePhaseContent(
  content: string,
  phase: LearningPhase,
  mode: ViewMode,
  category: TopicCategory
): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  const wordCount = content.split(/\s+/).length;
  
  // Validar longitud
  const maxWords: Record<LearningPhase, number> = {
    discover: 100,
    explore: 200,
    understand: 350,
    master: 300
  };
  
  if (wordCount > maxWords[phase]) {
    issues.push(`Excede longitud máxima (${wordCount}/${maxWords[phase]} palabras)`);
  }
  
  // Validaciones específicas por fase
  if (phase === 'understand' && (category === 'organelle' || category === 'process')) {
    const exampleCount = (content.match(/\d+\./g) || []).length;
    if (exampleCount < 3) {
      issues.push(`Se necesitan al menos 3 ejemplos concretos (actual: ${exampleCount})`);
    }
  }
  
  if (phase === 'master' && mode === 'precision') {
    if (!content.toLowerCase().includes('trampa') && !content.toLowerCase().includes('error')) {
      issues.push('Fase Dominar en modo precisión debe incluir trampas de examen');
    }
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * Genera metadata de contenido para cache
 */
export function generateContentMetadata(
  content: SubtemaFullContent
): {
  totalWords: number;
  averageScore: number;
  estimatedReadingTime: number; // en minutos
} {
  let totalWords = 0;
  let totalScore = 0;
  let blockCount = 0;
  
  Object.values(content.phases).forEach(phase => {
    totalWords += phase.intuitive.wordCount + phase.precision.wordCount;
    totalScore += phase.intuitive.qualityScore + phase.precision.qualityScore;
    blockCount += 2;
  });
  
  return {
    totalWords,
    averageScore: totalScore / blockCount,
    estimatedReadingTime: Math.ceil(totalWords / 200) // 200 palabras por minuto
  };
}
