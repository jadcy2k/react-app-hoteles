# React APP Hoteles
Proyecto de reserva hotelera con 5 dependencias.

- Integración y uso de React/TanStack Query para gestionar consultas y mutaciones.
- Estado global con 'Zustand'.
- Navegación con 'Wouter'.
- Formularios con 'React Hooks Forms'.
- Notificaciones con 'React Hot Toast'.
- Diseño y estilos con 'Material UI'.

## SETUP:

El setup inicial lo haremos con 'ViteJS': https://vitejs.dev/

$ npm create vite@latest

Nos pide: 'Project Name', 'framework' (React) y 'Variant' (JS)  

NOTA: 
Si falla, confirmad que el 'registry' de npm es el correcto:

$ npm get registry // Debe de ser 'https://registry.npmjs.org/'

Si no es, se puede cambiar:

$ npm set registry https://registry.npmjs.org/ //Esto modifica el archivo .npmrc


## DEPENDENCIAS:

npm i @tanstack/react-query zustand wouter react-hook-form react-hot-toast 
npm i @mui/material @emotion/react @emotion/styled
npm i @fontsource/roboto @mui/icons-material

## EJECUCION;

 $ npm run dev  // Abrir app en: http://localhost:5173/

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

## STORE:

Guía para usar ZUSTAND: https://github.com/pmndrs/zustand

En Zustand, un "store" es un objeto que contiene el estado de tu aplicación y funciones para manipular ese estado. Se podría considerar un "custom hook".

Este ejemplo crea una "store" (useStore) con una variable "count" (number) y 2 acciones "increment()", "decrement()" que modifican el valor de "count":

```
const useStore = create((set) => ({
  count: 0,
  increment: () => set ( (state) => ({ count: state.count + 1 }) ),
  decrement: () => set ( (state) => ({ count: state.count - 1 }) ),
}));
```

En nuestro caso, necesitaremos una variable "reservations" (array) y una función "addReservation" para modificar dicho array.
Todas las acciones/funciones modificarán el estado: set (state => {....})

``````
const useStore = create ((set) => ({
    reservations: [],
    addReservation: (hotel, dates) => 
        set (state => ({
            reservations: [...state.reservations, [hotel, dates]]
        }))
}));
``````

Finalmente, para usar la "store", podemos importar este archivo en un componente React y hacer uso de dichas variables y acciones:

``````
import { useStore } from './tu_archivo_de_store';
const { count, increment, decrement } = useStore();
return (
<div>
     <p>{count}</p> 
     <button onClick={increment}>Increment</button>
     <button onClick={decrement}>Decrement</button>
 </div>
);
``````

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

## UseQUERY:

useQuery es una función proporcionada por "React-Query" que facilita la obtención y gestión de datos desde una API o cualquier fuente de datos.

Este ejemplo, el componente funcional "UserList" crea una función "fetchUsers" y más tarde la asocia a la key "users" mediante "useQuery":

``````
const UserList = () => {
  // 1) Definimos una función que obtendrá los datos de la API:
  const fetchUsers = async () => {
    const response = await fetch('https://api.example.com/users');
    if (!response.ok) {
      throw new Error('No se pudieron obtener los datos de los usuarios.');
    }
    return response.json();
  };

  // 2) Usamos useQuery para obtener los datos de la API, asociando la key 'users' a fetchUsers:
  const { data, error, isLoading } = useQuery('users', fetchUsers);

  // 3) 'isLoading' indica si la solicitud está en curso
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  // 4) 'error' contiene cualquier error que ocurra durante la solicitud
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // 5) 'data' contiene los datos de la API una vez que se obtienen con éxito
  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
``````

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

## JSON-SERVER:

npm i -D json-server
