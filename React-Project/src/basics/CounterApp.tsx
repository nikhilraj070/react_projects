import { useState } from "react"

function CounterApp() {
    const [number,setNumber] = useState<number>(0)
  return (
    <div className=" h-dvh w-dvw bg-[#6C6CFF] flex justify-center items-center ">
        <div className="lg:h-30 h-20 lg:w-80 w-60   bg-[#7F90FF] items-center p-3 rounded-full  flex justify-evenly ">
            <button onClick={()=>setNumber(prev => prev-1)} className="text-white w-20 font-semibold text-4xl ">-</button>
            <div className="lg:h-30 h-20  lg:w-30 w-20  bg-white rounded-full flex justify-center items-center text-3xl lg:text-5xl font-bold text-[#8290FF]">{number}</div>
            <button onClick={()=>setNumber(prev=>prev+1)} className="text-white w-20 font-semibold text-4xl ">+</button>
        </div> 
    </div>
  )
}

export default CounterApp