import { type Signal, signal } from '@preact/signals'

/**
 * Atom<T> is a reactive state container that provides a simple interface
 * for getting and setting values globally within a Fresh application.
 * It leverages Preact's signals for optimal performance in edge-native environments.
 *
 * @template T The type of the value held by the atom.
 */
export interface Atom<T> {
  /**
   * Returns the current value of the atom.
   *
   * @returns The current value stored in the atom.
   */
  get: () => T

  /**
   * Updates the value of the atom.
   * The value can be updated directly or by passing a function
   * that calculates the new value based on the previous one.
   *
   * @param value - The new value or a function that takes the previous value and returns the new one.
   */
  set: (value: T | ((prev: T) => T)) => void

  /**
   * The internal signal that stores the atom's value.
   * Components using this signal will automatically re-render when the value changes.
   */
  signal: Signal<T>
}

/**
 * Creates a reactive atom with an initial value.
 * Atoms are globally shared, and any component using this atom will reactively update
 * when the atom's value changes. This is ideal for managing global state in Fresh applications.
 *
 * @template T The type of the value held by the atom.
 * @param initialValue - The initial value of the atom.
 * @returns An Atom object with get, set, and signal properties for managing state.
 */
export function atom<T>(initialValue: T): Atom<T> {
  const sig: Signal<T> = signal(initialValue) // Initializes the state with a Preact signal.

  return {
    /**
     * Retrieves the current value of the atom.
     * Using signals ensures that components using this value will reactively update.
     */
    get: () => sig.value,

    /**
     * Updates the value of the atom.
     * Supports setting a new value directly or calculating it from the previous value.
     * This enables immutability and functional updates, which can prevent bugs in state management.
     */
    set: (value) => {
      if (typeof value === 'function') {
        sig.value = (value as (prev: T) => T)(sig.value) // Calculate the new value based on the previous one.
      } else {
        sig.value = value // Set the value directly.
      }
    },

    /**
     * The signal that holds the reactive state of the atom.
     * This signal allows Preact components to automatically track and respond to changes in the atom's value.
     */
    signal: sig,
  }
}

/**
 * A custom hook to use an atom in Preact components.
 * This hook allows components to subscribe to the atom's value, ensuring they reactively re-render when the atom changes.
 *
 * @template T The type of the atom's value.
 * @param atom - The atom object whose value is being tracked.
 * @returns A tuple of [value, setValue] where `value` is the current state and `setValue` is the function to update it.
 *
 * @example
 * const [count, setCount] = useAtom(countAtom);
 * setCount(prev => prev + 1);  // Update the atom's value.
 */
export function useAtom<T>(
  atom: Atom<T>,
): [T, (value: T | ((prev: T) => T)) => void] {
  // Return the current value and the setter function for updating the atom's state.
  return [atom.signal.value, atom.set]
}
