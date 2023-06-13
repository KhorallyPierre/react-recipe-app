import React from "react";
import './App.css'
import Homepage from "./pages/homepage/Homepage.jsx";
import Favorites from "./pages/favorites/Favorites";
import {useRoutes} from 'react-router-dom';
// this is a functional component as it starts with the word function or includes an arrow function
// component name should start with a capital letter
// the component body is known as jsx (implements component logic
// export that component to be used in other files 


// function App() {
//   return ( <div className="App">
//     <Routes>
//       <Route path='/' element={<Homepage/>}/>
//       <Route path='favorites' element={<Favorites/>}/>

//     </Routes>
//   </div>
    
//   )
// }

const App = () => {
  const routes = useRoutes([
      { path: '/', element: <Homepage /> },
      { path: 'favorites', element: <Favorites /> },
  ]);

  return routes;
};

export default App