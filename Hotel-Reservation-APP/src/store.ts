import { create } from "zustand";

// ---------------------------------------------------------
// Guía para usar ZUSTAND: https://github.com/pmndrs/zustand
// ---------------------------------------------------------

/**
 * ZUSTAND es una librería simple y eficiente para gestionar el estado en aplicaciones React. 
 * A diferencia de otras soluciones más complejas como Redux, Zustand es fácil de aprender y usar.
 */


/**
 * CREAR STORE:
 * En Zustand, un "store" es un objeto que contiene el estado de tu aplicación 
 * y funciones para manipular ese estado. Se podría considerar un "custom hook".
 */

/** 
 * Este ejemplo crea una "store" (useStore) con una variable "count" (number) y 
 * 2 acciones "increment()", "decrement()" que modifican el valor de "count":

const useStore = create((set) => ({
  count: 0,
  increment: () => set ( (state) => ({ count: state.count + 1 }) ),
  decrement: () => set ( (state) => ({ count: state.count - 1 }) ),
}));
*/

/**
 * Finalmente, para usar la store, podemos importar este archivo en un componente React 
 * y hacer uso de dichas variables y acciones:
 * 
 * import { useStore } from './tu_archivo_de_store';
 * const { count, increment, decrement } = useStore();
 * return (
 *  <div>
 *      <p>{count}</p> 
 *      <button onClick={increment}>Increment</button>
 *      <button onClick={decrement}>Decrement</button>
 *  </div>
 * ); * 
 */

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * Creamps la "store" con una variable "reservations" y una función "addReservations" que la modifica:
 */
const useStore = create ((set) => ({
    reservations: [],
    addReservation: (hotel, dates) => 
        set (state => ({
            reservations: [...state.reservations, [hotel, dates]]
        }))
}));

// Finalmente exportamos la "store":
export default useStore;

