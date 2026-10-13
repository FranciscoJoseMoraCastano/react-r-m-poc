# Rick & Morty Explorer 🛸

Proof of Concept (POC) y guía práctica de arquitectura diseñada para la transición técnica desde el ecosistema **Angular** hacia **React + TypeScript**. La aplicación consume la [Rick and Morty API](https://rickandmortyapi.com/) pública e implementa patrones de diseño modernos, gestión global de estado mediante Context API, internacionalización avanzada y tematización dinámica con Material UI.

---

## Stack Tecnológico

| Herramienta | Versión / Tipo | Propósito |
| :--- | :--- | :--- |
| **Vite** | Bundler / Dev Server | Tooling ultrarrápido con compilación nativa en módulos ES |
| **React** | SPA Library | Creación de interfaces mediante arquitectura basada en componentes funcionales |
| **TypeScript** | Lenguaje | Tipado estático estricto para modelos de dominio, props y eventos |
| **Material UI (MUI v6)** | UI Library | Sistema de componentes visuales, rejilla responsiva y motor de estilos |
| **React Router v6** | Enrutador | Navegación declarativa en el cliente con rutas parametrizadas |
| **React Hook Form** | Formularios | Gestión reactiva y no controlada de inputs con mínimo re-render |
| **react-i18next** | i18n Framework | Difusión global de traducciones, detección de idioma y adaptación por contexto de género |

---

## Mapeo Mental: Angular vs. React

Para facilitar la adopción conceptual durante la transición, la arquitectura del proyecto refleja las siguientes equivalencias directas:

| Concepto en Angular | Equivalente en esta POC | Uso Práctico en la Aplicación |
| :--- | :--- | :--- |
| `Angular CLI` + `Webpack` | **Vite** | Entorno de desarrollo con Hot Module Replacement (HMR) instantáneo. |
| `RouterModule` / `<router-outlet>` | **React Router v6** (`<Routes>`, `<Route>`) | Enrutamiento de vistas principales (`/`, `/characters`, `/characters/:id`, `/search`). |
| `HttpClient` + `RxJS` (`switchMap`) | **`useEffect` + `fetch` + `AbortController`** | Custom Hook `useCharacters` con cancelación de peticiones activas al paginar. |
| `@Injectable({ providedIn: 'root' })` | **React Context API + Custom Hook** | `FavoritesContext` y `ThemeContext` para difusión global de estado sin prop drilling. |
| `ReactiveFormsModule` (`FormGroup`) | **React Hook Form** (`useForm`, `register`) | Captura de filtros en `/search` sin re-renders por pulsación de tecla. |
| Angular Material | **Material UI (MUI v6)** | Controles de cuadrícula (`Grid`), tarjetas (`Card`), paginadores y alertas. |
| `@ngx-translate` | **`react-i18next`** | Traducciones reactivas, soporte de fallback e inferencia de género gramatical. |

---

## Características Principales

### 1. Sistema Dual de Temas (Portal & Galactic)
- **Modo Claro (Portal):** Inspirado en el portal interdimensional de la serie (acentos verdes `#84cc16` y fondos `#f8fafc`).
- **Modo Oscuro (Galactic):** Paleta espacial con matices púrpuras (`#8b5cf6`) y fondos oscuros (`#0f172a`).
- Persistencia del modo seleccionado en `localStorage`.
- Elevación e iluminación en tarjetas mediante micro-interacciones hover (`transition` + `transform: translateY(-6px)`).
- Tipografía personalizada: títulos con fuente temática alienígena (*Creepster*) y textos legibles (*Exo 2*).

### 2. Gestión de Favoritos Persistente
- Contexto centralizado (`FavoritesProvider`) que sincroniza las altas y bajas con `localStorage`.
- Métricas calculadas en tiempo real en la Home: total de favoritos agrupados por vivos, muertos y estado desconocido.
- Capacidad de alternar el estado de favorito desde la vista de detalle mediante el botón interactivo.

### 3. Internacionalización Avanzada (i18n)
- Conmutador dinámico de idioma (Español / Inglés) en la barra de navegación sin recarga de página.
- Adaptación gramatical por género en español para estados de personaje (*Vivo / Viva*, *Muerto / Muerta*) mediante contextos de `i18next`.
- Mecanismo de fallback seguro: si la API retorna una especie no registrada en el diccionario, la aplicación muestra el término original en lugar de una clave rota.
- Mensajes de error y estados vacíos totalmente traducibles de forma reactiva.

### 4. Paginación y Búsqueda Reactiva
- Consumo desacoplado mediante el hook reutilizable `useCharacters(page)`.
- Prevención de fugas de memoria y condiciones de carrera con `AbortController`.
- Búsqueda compuesta por nombre y estado mediante parámetros de consulta seguros (`URLSearchParams`).

---

## Estructura del Proyecto

```text
rick-morty-poc/
├── public/
│   └── logo.png              # Imagen y favicon corporativo
├── src/
│   ├── context/              # Contextos globales de React (Providers)
│   │   ├── FavoritesContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/                # Custom hooks de lógica de negocio
│   │   └── useCharacters.ts
│   ├── i18n/                 # Configuración de diccionarios e inicialización
│   │   └── index.ts
│   ├── pages/                # Componentes correspondientes a las rutas
│   │   ├── Home.tsx
│   │   ├── Characters.tsx
│   │   ├── CharacterDetail.tsx
│   │   └── Search.tsx
│   ├── theme/                # Paletas de colores, tipografías y overrides de MUI
│   │   └── theme.ts
│   ├── types/                # Interfaces TypeScript del dominio
│   │   └── character.ts
│   ├── utils/                # Funciones auxiliares puras (traducción de badges)
│   │   └── characterI18n.ts
│   ├── App.tsx               # Enrutador principal, Providers y Layout
│   └── main.tsx              # Punto de entrada de la aplicación
├── index.html                # Carga de Google Fonts y contenedor raíz (#root)
├── package.json
├── tsconfig.json
└── vite.config.ts
```
---

## Instalación y Puesta en Marcha

### Prerrequisitos
- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/rick-morty-poc.git](https://github.com/tu-usuario/rick-morty-poc.git)
   cd rick-morty-poc
   ```

2. Instalar dependencias del proyecto:
    ```bash
    npm install
    ```

3. Iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```
  *La aplicación se abrirá por defecto en http://localhost:5173.*

  ---

  ## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo local con Vite y HMR.
- `npm run build`: Ejecuta la verificación estricta de TypeScript (`tsc -b`) y compila la versión optimizada de producción en la carpeta `dist/`.
- `npm run preview`: Previsualiza localmente el empaquetado final de producción antes del despliegue.
- `npm run lint`: Ejecuta ESLint para asegurar la calidad y consistencia del código.

---

## Criterios de Validación Cumplidos

- [✓] Arranque rápido y eficiente mediante Vite sin configuraciones pesadas de Webpack.
- [✓] Conmutación instantánea de idiomas (`ES` / `EN`) vía Context API sin recargar el navegador.
- [✓] Paginación fluida en `/characters` con feedback visual mediante loaders de Material UI.
- [✓] Formulario desacoplado con React Hook Form en `/search` y manejo de respuestas 404 de la API.
- [✓] Navegación por parámetros dinámicos (`/characters/:id`) usando `useParams`.
- [✓] Persistencia y resumen métrico de favoritos en LocalStorage en la vista principal.
- [✓] Tematización completa claro/oscuro con adaptación a CSS variables y efectos hover dinámicos.
