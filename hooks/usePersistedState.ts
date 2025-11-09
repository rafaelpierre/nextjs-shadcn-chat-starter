/**
 * Generic hook for synchronizing React state with localStorage.
 * Provides type-safe persistence for any JSON-serializable data.
 * 
 * Features:
 * - SSR-safe with typeof window check
 * - Lazy initialization to avoid reading localStorage on every render
 * - Automatic serialization/deserialization
 * - TypeScript generic for type safety
 * 
 * @template T - Type of the persisted state value
 * @param {string} key - localStorage key for storing the value
 * @param {T} defaultValue - Default value used during SSR and when key doesn't exist
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} Tuple of state value and setter
 * 
 * @example
 * const [theme, setTheme] = usePersistedState<'light' | 'dark'>('theme', 'light');
 */