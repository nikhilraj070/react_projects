import { BrowserRouter, Route, Routes } from "react-router-dom";
import CounterApp from "./basics/CounterApp";
import Home from "./Home";
import DarkLightMode from "./basics/DarkLightMode";
// import ToDoList from "./basics/ToDoList";
import WordCounter from "./basics/WordCounter";
import LiveClock from "./basics/LiveClock";
import QuoteGenerator from "./basics/QuoteGenerator";

 function App() {
  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home / >} />
         <Route path="/counter" element={<CounterApp />} / >
         <Route path="/dark-light-mode" element={<DarkLightMode />} />
         {/* <Route path="/to-do-list" element={<ToDoList />} /> */}
         <Route path="/Word-counter" element={<WordCounter />} />
         <Route path="/clock" element={<LiveClock />} />
         <Route path="/quote" element={<QuoteGenerator />} />
         

       </Routes>
    </BrowserRouter>
  )
}
export default App

