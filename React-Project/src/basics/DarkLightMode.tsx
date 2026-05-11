import { MdWbSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import { useState } from "react";
function DarkLightMode() {
    const [mode,setMode] = useState<string>("light")

  return (
    <div className="w-dvw h-dvh">
      <div className={`${mode==="light"?"bg-white":"bg-[#26242E] text-white"} w-full h-full flex flex-col items-center justify-center`}>
      {
          mode==="light"?(<div><MdWbSunny color="#FF6A2F" className="lg:w-50 w-40 h-40 lg:h-50 " /></div>):(<div><IoMoonSharp color="#FF6A2F" className="lg:w-50 w-40 h-40 lg:h-50 " /></div>)
      }
      <div className=" font-semibold text-3xl">Choose the style</div>
      <div className=" font-semibold ">Customize your interface</div>
      <div className={`${mode==="light"?"bg-[#E5E5E5] text-black":"bg-[#222029]"} w-60 h-15 rounded-full mt-10 relative flex`} >
          <div onClick={()=>setMode("light")} className="w-1/2 h-full rounded-l-full flex items-center justify-center">Light</div>
          <div onClick={()=>setMode("dark")} className="w-1/2 h-full  rounded-r-full flex items-center justify-center">Dark</div>
          <div  className={`absolute top-[4%] ml-0.5 w-[49%] h-[92%] rounded-full flex items-center justify-center  font-semibold transition-all duration-500 ease-in-out shadow-md
  ${mode === "dark" ? "translate-x-full bg-[#34323D] text-white" : "translate-x-0 bg-white text-black"}
  `}>{mode==="light"?"Light":"Dark"}</div>
      </div>
      
      
      </div>
        
    </div>
  )
}

export default DarkLightMode