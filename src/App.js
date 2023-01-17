import React from "react";
import './App.css'
import Homepage from "./pages/homepage";
// this is a functional component as it starts with the word function or includes an arrow function
// component name should start with a capital letter
// the component body is known as jsx (implements component logic
// export that component to be used in other files 


function App() {
  return ( <div className="App">
      <Homepage/>
  </div>
    
  )
}

export default App