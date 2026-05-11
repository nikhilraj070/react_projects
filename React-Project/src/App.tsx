import { BrowserRouter, Route, Routes } from "react-router-dom";
import CounterApp from "./basics/CounterApp";
import Home from "./Home";
import DarkLightMode from "./basics/DarkLightMode";

 function App() {
  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home / >} />
         <Route path="/counter" element={<CounterApp />} / >
         <Route path="/dark-light-mode" element={<DarkLightMode />} />
         

       </Routes>
    </BrowserRouter>
  )
}
export default App

