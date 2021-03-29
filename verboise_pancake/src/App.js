
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Redirect } from "react-router-dom";
import Main from "routes"
function App() {

 
  return (
    <BrowserRouter>
     <Main />
    </BrowserRouter>

  );
}

export default App;

