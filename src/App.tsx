import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { estructuraCompleta, Parte, Tema, Seccion, SubtemaMetadata, countSubtemas } from './data/esqueletoCompleto';
import { BookOpen, ChevronRight, Lightbulb, Microscope, ArrowLeft, Search, GraduationCap } from 'lucide-react';

type ViewMode = 'intuitive' | 'precision';
type NavigationState = 
  | { view: 'home' }
  | { view: 'parte'; parte: Parte }
  | { view: 'tema'; parte: Parte; tema: Tema }
  | { view: 'seccion'; parte: Parte; tema: Tema; seccion: Seccion }
  | { view: 'subtema'; parte: Parte; tema: Tema; seccion: Seccion; subtema: SubtemaMetadata };

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('intuitive');
  const [nav, setNav] = useState<NavigationState>({ view: 'home' });
  const [searchQuery, setSearchQuery] = useState('');

  const totalSubtemas = countSubtemas();

  const goBack = () => {
    if (nav.view === 'subtema') {
      setNav({ view: 'seccion', parte: nav.parte, tema: nav.tema, seccion: nav.seccion });
    } else if (nav.view === 'seccion') {
      setNav({ view: 'tema', parte: nav.parte, tema: nav.tema });
    } else if (nav.view === 'tema') {
      setNav({ view: 'parte', parte: nav.parte });
    } else {
      setNav({ view: 'home' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      viewMode === 'intuitive' ? 'bg-[#FAFAFA]' : 'bg-[#0F172A]'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        viewMode === 'intuitive' 
          ? 'bg-white/80 border-gray-200' 
          : 'bg-[#0F172A]/80 border-[#1E293B]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {nav.view !== 'home' && (
                <motion.button 
                  onClick={goBack}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                    viewMode === 'intuitive' 
                      ? 'hover:bg-gray-100 text-gray-600' 
                      : 'hover:bg-[#1E293B] text-gray-400'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              )}
              <BookOpen className={`w-6 h-6 flex-shrink-0 ${
                viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
              }`} />
              <div className="min-w-0">
                <h1 className={`text-lg sm:text-xl font-semibold truncate ${
                  viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                }`}>
                  Charlemos 2.0
                </h1>
                <p className={`text-xs ${
                  viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {totalSubtemas} subtemas disponibles
                </p>
              </div>
            </div>

            {/* Toggle de modos */}
            <div className={`flex items-center gap-1 p-1 rounded-lg flex-shrink-0 ${
              viewMode === 'intuitive' ? 'bg-gray-100' : 'bg-[#1E293B]'
            }`}>
              <button
                onClick={() => setViewMode('intuitive')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  viewMode === 'intuitive'
                    ? 'bg-white text-[#10B981] shadow-sm'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Intuitivo</span>
              </button>
              <button
                onClick={() => setViewMode('precision')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  viewMode === 'precision'
                    ? 'bg-[#0F172A] text-[#3B82F6] shadow-sm'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Microscope className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Precisión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {nav.view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <HomeView viewMode={viewMode} onNavigate={setNav} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </motion.div>
          )}
          {nav.view === 'parte' && (
            <motion.div
              key="parte"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ParteView viewMode={viewMode} parte={nav.parte} onNavigate={setNav} />
            </motion.div>
          )}
          {nav.view === 'tema' && (
            <motion.div
              key="tema"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TemaView viewMode={viewMode} parte={nav.parte} tema={nav.tema} onNavigate={setNav} />
            </motion.div>
          )}
          {nav.view === 'seccion' && (
            <motion.div
              key="seccion"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SeccionView viewMode={viewMode} parte={nav.parte} tema={nav.tema} seccion={nav.seccion} onNavigate={setNav} />
            </motion.div>
          )}
          {nav.view === 'subtema' && (
            <motion.div
              key="subtema"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SubtemaView viewMode={viewMode} subtema={nav.subtema} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 transition-colors duration-300 ${
        viewMode === 'intuitive' ? 'border-gray-200 bg-white/50' : 'border-[#1E293B] bg-[#0F172A]/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className={`text-sm ${viewMode === 'intuitive' ? 'text-gray-400' : 'text-gray-500'}`}>
            CHARLEMOS 2.0 — Biología Celular Interactiva
          </p>
          <p className={`text-xs mt-1 ${viewMode === 'intuitive' ? 'text-gray-300' : 'text-gray-600'}`}>
            Sistema educativo con generación de contenido por IA
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// HOME VIEW - Mostrar las 2 partes + búsqueda
// ============================================
function HomeView({ viewMode, onNavigate, searchQuery, setSearchQuery }: { 
  viewMode: ViewMode; 
  onNavigate: (state: NavigationState) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  const filteredResults = searchQuery.trim() ? getSearchResults(searchQuery) : [];

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className={`w-8 h-8 sm:w-10 sm:h-10 ${
              viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
            }`} />
            <h2 className={`text-3xl sm:text-4xl font-bold ${
              viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
            }`}>
              Biología Celular
            </h2>
          </div>
          <p className={`text-base sm:text-lg mb-6 ${
            viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Aprende con explicaciones claras y visuales. Explora la célula como nunca antes.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
            viewMode === 'intuitive' ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Buscar subtemas... (ej: mitocondrias, ribosomas, membrana)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border text-sm transition-all outline-none ${
              viewMode === 'intuitive'
                ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20'
                : 'bg-[#1E293B] border-[#334155] text-gray-100 placeholder-gray-500 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20'
            }`}
          />
        </motion.div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10"
        >
          <h3 className={`text-sm font-medium mb-4 ${
            viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''} encontrado{filteredResults.length !== 1 ? 's' : ''}
          </h3>
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredResults.slice(0, 12).map((result) => (
                <motion.button
                  key={result.subtema.id}
                  onClick={() => onNavigate({ view: 'subtema', parte: result.parte, tema: result.tema, seccion: result.seccion, subtema: result.subtema })}
                  whileHover={{ y: -2 }}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    viewMode === 'intuitive'
                      ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm'
                      : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{result.subtema.emoji}</span>
                    <div className="min-w-0">
                      <h4 className={`font-semibold text-sm truncate ${
                        viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                      }`}>
                        {result.subtema.title}
                      </h4>
                      <p className={`text-xs truncate ${
                        viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {result.tema.title} → {result.seccion.title}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'}`}>
              No se encontraron resultados para "{searchQuery}"
            </p>
          )}
        </motion.div>
      )}

      {/* Parts Grid */}
      {!searchQuery.trim() && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {estructuraCompleta.map((parte, index) => (
            <motion.button
              key={parte.id}
              onClick={() => onNavigate({ view: 'parte', parte })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`text-left p-6 sm:p-8 rounded-xl border transition-all ${
                viewMode === 'intuitive'
                  ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm'
                  : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]'
              }`}
            >
              <div className="text-4xl sm:text-5xl mb-4">{parte.emoji}</div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
                viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
              }`}>
                {parte.title}
              </h3>
              <p className={`text-sm mb-4 ${
                viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {parte.temas.length} temas • {parte.temas.reduce((acc, t) => acc + t.secciones.reduce((a, s) => a + s.subtemas.length, 0), 0)} subtemas
              </p>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
              }`}>
                <span>Explorar</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Stats */}
      {!searchQuery.trim() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-10 p-6 rounded-xl border ${
            viewMode === 'intuitive' 
              ? 'bg-gradient-to-br from-[#10B981]/5 to-[#10B981]/10 border-[#10B981]/20' 
              : 'bg-gradient-to-br from-[#3B82F6]/5 to-[#3B82F6]/10 border-[#3B82F6]/20'
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className={`text-2xl font-bold ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>2</p>
              <p className={`text-xs ${viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'}`}>Partes</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>12</p>
              <p className={`text-xs ${viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'}`}>Temas</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>{countSubtemas()}</p>
              <p className={`text-xs ${viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'}`}>Subtemas</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>2</p>
              <p className={`text-xs ${viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'}`}>Modos</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ============================================
// PARTE VIEW - Mostrar temas de una parte
// ============================================
function ParteView({ viewMode, parte, onNavigate }: { viewMode: ViewMode; parte: Parte; onNavigate: (state: NavigationState) => void }) {
  return (
    <div>
      <div className="mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-4xl sm:text-5xl mb-4">{parte.emoji}</div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${
            viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
          }`}>
            {parte.title}
          </h2>
          <p className={`text-base sm:text-lg ${
            viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {parte.temas.length} temas disponibles
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {parte.temas.map((tema, index) => (
          <motion.button
            key={tema.id}
            onClick={() => onNavigate({ view: 'tema', parte, tema })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className={`text-left p-5 sm:p-6 rounded-xl border transition-all ${
              viewMode === 'intuitive'
                ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm'
                : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]'
            }`}
          >
            <div className="text-3xl sm:text-4xl mb-3">{tema.emoji}</div>
            <h3 className={`text-base sm:text-lg font-semibold mb-2 ${
              viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
            }`}>
              {tema.title}
            </h3>
            <p className={`text-xs sm:text-sm ${
              viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {tema.secciones.length} secciones • {tema.secciones.reduce((acc, s) => acc + s.subtemas.length, 0)} subtemas
            </p>
            <div className={`flex items-center gap-1 mt-4 text-sm font-medium ${
              viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
            }`}>
              <span>Ver temas</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// TEMA VIEW - Mostrar secciones de un tema
// ============================================
function TemaView({ viewMode, parte, tema, onNavigate }: { viewMode: ViewMode; parte: Parte; tema: Tema; onNavigate: (state: NavigationState) => void }) {
  return (
    <div>
      <div className="mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-4xl sm:text-5xl mb-4">{tema.emoji}</div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${
            viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
          }`}>
            {tema.title}
          </h2>
          <p className={`text-sm ${
            viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {parte.title}
          </p>
        </motion.div>
      </div>

      <div className="space-y-4">
        {tema.secciones.map((seccion, index) => (
          <motion.button
            key={seccion.id}
            onClick={() => onNavigate({ view: 'seccion', parte, tema, seccion })}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 4 }}
            className={`w-full text-left p-5 sm:p-6 rounded-xl border transition-all ${
              viewMode === 'intuitive'
                ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm'
                : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl sm:text-3xl">{seccion.emoji}</div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-semibold ${
                    viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                  }`}>
                    {seccion.title}
                  </h3>
                  <p className={`text-sm ${
                    viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {seccion.subtemas.length} subtemas
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 flex-shrink-0 ${
                viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
              }`} />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SECCION VIEW - Mostrar subtemas de una sección
// ============================================
function SeccionView({ viewMode, parte, tema, seccion, onNavigate }: { viewMode: ViewMode; parte: Parte; tema: Tema; seccion: Seccion; onNavigate: (state: NavigationState) => void }) {
  return (
    <div>
      <div className="mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-4xl sm:text-5xl mb-4">{seccion.emoji}</div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${
            viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
          }`}>
            {seccion.title}
          </h2>
          <p className={`text-sm ${
            viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {parte.title} → {tema.title}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {seccion.subtemas.map((subtema, index) => (
          <motion.button
            key={subtema.id}
            onClick={() => onNavigate({ view: 'subtema', parte, tema, seccion, subtema })}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -2 }}
            className={`text-left p-4 sm:p-5 rounded-xl border transition-all ${
              viewMode === 'intuitive'
                ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm'
                : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="text-xl sm:text-2xl flex-shrink-0">{subtema.emoji}</div>
                <h3 className={`font-semibold text-sm sm:text-base truncate ${
                  viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                }`}>
                  {subtema.title}
                </h3>
              </div>
              <ChevronRight className={`w-4 h-4 flex-shrink-0 ${
                viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
              }`} />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SUBTEMA VIEW - Mostrar contenido del subtema
// ============================================
function SubtemaView({ viewMode, subtema }: { viewMode: ViewMode; subtema: SubtemaMetadata }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 sm:mb-12"
      >
        <div className="text-5xl sm:text-6xl mb-4">{subtema.emoji}</div>
        <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${
          viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
        }`}>
          {subtema.title}
        </h2>
        <p className={`text-sm font-mono ${
          viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {subtema.path}
        </p>
      </motion.div>

      {/* Contenido según modo */}
      {viewMode === 'intuitive' ? (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 sm:p-8 rounded-xl border ${
              viewMode === 'intuitive' ? 'bg-white border-gray-200' : 'bg-[#1E293B] border-[#334155]'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${
              viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
            }`}>
              💡 Idea Central
            </h3>
            <p className={`leading-relaxed ${
              viewMode === 'intuitive' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              {subtema.metaforaCentral || 'Este contenido será generado por IA cuando se conecte la API. La explicación usará analogías cotidianas para que entiendas el concepto de forma natural.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 sm:p-8 rounded-xl border ${
              viewMode === 'intuitive' ? 'bg-white border-gray-200' : 'bg-[#1E293B] border-[#334155]'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${
              viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
            }`}>
              🔗 Temas Relacionados
            </h3>
            <div className="flex flex-wrap gap-2">
              {subtema.temasRelacionados.length > 0 ? (
                subtema.temasRelacionados.map((tema, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-full text-xs sm:text-sm ${
                    viewMode === 'intuitive' 
                      ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20' 
                      : 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20'
                  }`}>
                    {tema}
                  </span>
                ))
              ) : (
                <span className={`text-sm ${
                  viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Sin temas relacionados
                </span>
              )}
            </div>
          </motion.div>

          {subtema.prerequisitos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 sm:p-8 rounded-xl border ${
                viewMode === 'intuitive' ? 'bg-white border-gray-200' : 'bg-[#1E293B] border-[#334155]'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${
                viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
              }`}>
                📚 Prerequisitos
              </h3>
              <div className="flex flex-wrap gap-2">
                {subtema.prerequisitos.map((pre, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-full text-xs sm:text-sm ${
                    viewMode === 'intuitive' 
                      ? 'bg-gray-100 text-gray-600 border border-gray-200' 
                      : 'bg-[#334155] text-gray-300 border border-[#475569]'
                  }`}>
                    {pre}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-6 sm:p-8 rounded-xl border ${
              viewMode === 'intuitive' 
                ? 'bg-gradient-to-br from-[#10B981]/5 to-[#10B981]/10 border-[#10B981]/20' 
                : 'bg-gradient-to-br from-[#3B82F6]/5 to-[#3B82F6]/10 border-[#3B82F6]/20'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${
              viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
            }`}>
              🚀 Estado del Contenido
            </h3>
            <p className={`leading-relaxed ${
              viewMode === 'intuitive' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Este subtema tiene su estructura completa definida en el esqueleto. 
              Cuando se conecte la API de IA (OpenAI/Claude), aquí se generará el contenido 
              completo siguiendo el Super Prompt v2.0 con el Modo Intuitivo (analogías cotidianas).
            </p>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 sm:p-8 rounded-xl border bg-[#1E293B] border-[#334155]"
          >
            <h3 className="text-lg font-semibold mb-4 text-[#3B82F6]">
              📊 Metadata Técnica
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-sm font-medium text-gray-400 min-w-[100px]">ID:</span>
                <span className="text-sm text-gray-100 font-mono">{subtema.id}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-sm font-medium text-gray-400 min-w-[100px]">Path:</span>
                <span className="text-sm text-gray-100 font-mono break-all">{subtema.path}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                <span className="text-sm font-medium text-gray-400 min-w-[100px]">Prerequisitos:</span>
                <span className="text-sm text-gray-100">
                  {subtema.prerequisitos.length > 0 ? subtema.prerequisitos.join(', ') : 'Ninguno'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                <span className="text-sm font-medium text-gray-400 min-w-[100px]">Relacionados:</span>
                <span className="text-sm text-gray-100">
                  {subtema.temasRelacionados.length > 0 ? subtema.temasRelacionados.join(', ') : 'Ninguno'}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 sm:p-8 rounded-xl border bg-[#1E293B] border-[#334155]"
          >
            <h3 className="text-lg font-semibold mb-4 text-[#3B82F6]">
              🔬 Estructura Esperada (Modo Precisión)
            </h3>
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${viewMode === 'precision' ? 'bg-[#0F172A]' : 'bg-gray-50'}`}>
                <p className="text-sm text-gray-300">📊 Esquema de flujo (ASCII art)</p>
              </div>
              <div className={`p-3 rounded-lg ${viewMode === 'precision' ? 'bg-[#0F172A]' : 'bg-gray-50'}`}>
                <p className="text-sm text-gray-300">🧩 Piezas clave con descripciones</p>
              </div>
              <div className={`p-3 rounded-lg ${viewMode === 'precision' ? 'bg-[#0F172A]' : 'bg-gray-50'}`}>
                <p className="text-sm text-gray-300">⚡ Funciones detalladas</p>
              </div>
              <div className={`p-3 rounded-lg ${viewMode === 'precision' ? 'bg-[#0F172A]' : 'bg-gray-50'}`}>
                <p className="text-sm text-gray-300">🎯 Casos especiales por tejido</p>
              </div>
              <div className={`p-3 rounded-lg ${viewMode === 'precision' ? 'bg-[#0F172A]' : 'bg-gray-50'}`}>
                <p className="text-sm text-gray-300">🧠 Resumen mental + Reto mental</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 sm:p-8 rounded-xl border bg-gradient-to-br from-[#3B82F6]/5 to-[#3B82F6]/10 border-[#3B82F6]/20"
          >
            <h3 className="text-lg font-semibold mb-4 text-[#3B82F6]">
              ⚙️ Sistema Listo para IA
            </h3>
            <p className="leading-relaxed text-sm text-gray-300">
              El esqueleto contiene toda la estructura necesaria para que la IA genere contenido premium.
              Solo falta conectar la API para activar la generación automática de contenido siguiendo
              el Super Prompt v2.0 con el Modo Precisión (técnico pero claro).
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ============================================
// SEARCH HELPER
// ============================================
interface SearchResult {
  parte: Parte;
  tema: Tema;
  seccion: Seccion;
  subtema: SubtemaMetadata;
}

function getSearchResults(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const q = query.toLowerCase().trim();
  
  estructuraCompleta.forEach(parte => {
    parte.temas.forEach(tema => {
      tema.secciones.forEach(seccion => {
        seccion.subtemas.forEach(subtema => {
          const searchable = `${subtema.title} ${subtema.id} ${subtema.path} ${tema.title} ${seccion.title}`.toLowerCase();
          if (searchable.includes(q)) {
            results.push({ parte, tema, seccion, subtema });
          }
        });
      });
    });
  });
  
  return results;
}
