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

Nos pide: 'Project Name', 'framework' (React) y 'Variant' (TS)  

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

```js
const useStore = create((set) => ({
  count: 0,
  increment: () => set ( (state) => ({ count: state.count + 1 }) ),
  decrement: () => set ( (state) => ({ count: state.count - 1 }) ),
}));
```

En nuestro caso, necesitaremos una variable "reservations" (array) y una función "addReservation" para modificar dicho array.
Todas las acciones/funciones modificarán el estado: set (state => {....})

``````js
const useStore = create ((set) => ({
    reservations: [],
    addReservation: (hotel, dates) => 
        set (state => ({
            reservations: [...state.reservations, [hotel, dates]]
        }))
}));
``````

Finalmente, para usar la "store", podemos importar este archivo en un componente React y hacer uso de dichas variables y acciones:

``````js
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

``````js
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

(NOTA: Ver la implementación en "/src/components/HotelList.tsx")

Cada vez que queramos utilizar un componente que use "useQuery" deberemos envolverlo en el wrapper "QueryClientProvider" y definir un "QueryClient".

Por ejemplo, en "app.tsx":

``````js
<QueryClientProvider client={client}>
  <HotelList />
</QueryClientProvider>
``````

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

## JSON-SERVER:

npm i -D json-server

La idea es de simular la respuesta de una API mediante un archivo JSON.

Agregaremos en "Package.JSON" (en "scripts"): 
"myFakeServer": "json-server --watch hotels.json --port 3001"

(Se ejecutará como "npm run myFakeServer")

Esto levantará un servidor en "localhost:3001" que devolverá los datos de "hotels.json".

Útil para hacer un fetch().

http://localhost:3001/hotels
http://localhost:3001/hotels/2

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

## SWITCH ROUTE WITH "WOUTER":

La librería "wouter" es una excelente opción para gestionar las rutas en una aplicación React de manera sencilla y eficiente. 10 veces más ligero que "react-router".

Su uso es tan simple como envolver con "Switch" el/los elemento(s) "Route" que queramos definir como "endpoints".

``````js
import React from 'react';
import { Route, Switch, Link } from 'wouter';

// Componentes para cada página:
const Home = () => <div>¡Bienvenido a la página de inicio!</div>;
const About = () => <div>Acerca de nosotros</div>;
const Contact = () => <div>Contáctanos</div>;
const NotFound = () => <div>Página no encontrada</div>;

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/about">Acerca</Link>
          </li>
          <li>
            <Link href="/contact">Contacto</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
``````

Por tanto, ahora nuestra "app.tsx" quedará así:

```js
<QueryClientProvider client={client}>
  <Switch>
      <Route path="/" component={HotelList} />
      <Route path="/hotel/:id" component={HotelDetails} />
   </Switch>
</QueryClientProvider>
```

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
## useForm (react-hook-form):

'react-hook-form' es una biblioteca popular para gestionar formularios en aplicaciones React de manera eficiente. 'useForm' es un hook que te ayuda a controlar y gestionar los estados y validaciones de tus formularios de manera fácil y efectiva: https://react-hook-form.com/

Dentro del componente, inicializamos el hook 'useForm':

``````js
const { register, handleSubmit, formState: {errors} } = useForm();
``````

Así, extraemos las funciones 'register', 'handleSubmit', y 'errors' del objeto que devuelve 'useForm'.

* register: Se utiliza para registrar tus campos de entrada (input) en el formulario.
* handleSubmit: Se utiliza para manejar la función que se ejecutará cuando se envíe el formulario.
* errors: Se utiliza para almacenar y mostrar mensajes de error asociados a los campos de entrada.


Ejemplo:

``````js
<form onSubmit={handleSubmit(data => console.log(data))}>
  <input type="text" name="nombre" ref={register} />
  <input type="email" name="correo" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
  
  {errors.correo && errors.correo.type === 'required' && <span>Este campo es requerido</span>}
  {errors.correo && errors.correo.type === 'pattern' && <span>Correo electrónico no válido</span>}
  
  <button type="submit">Enviar</button>
</form>
``````

En este ejemplo, usamos la función 'register' para registrar los 2 campos: "nombre" y "correo". También hemos añadido validaciones usando el atributo 'ref' en el campo "correo" para requerir un valor y validar el formato del correo electrónico.

Finalmente,el propósito de 'handleSubmit' es manejar el envío del formulario. En el ejemplo, simplemente estamos imprimiendo los datos del formulario en la consola, pero puedes hacer lo que necesites con esos datos, como enviarlos a un servidor.


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

## TOASTS:

"react-hot-toast" es una librería de notificaciones tipo "toast" diseñada específicamente para aplicaciones React. Es fácil de usar y personalizable.




+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++