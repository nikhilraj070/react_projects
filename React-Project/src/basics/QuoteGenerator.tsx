
import { useEffect, useState } from 'react'
import { FaRegCopy } from 'react-icons/fa'
import { FaQuoteLeft } from 'react-icons/fa6'
import { IoMdRefresh, IoMdShareAlt } from 'react-icons/io'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
 
type Quote = {
    quote:string;
    author:string;
    category:string;
}
 
function QuoteGenerator() {
    const defaultQuote:Quote = {
   quote: "Success is the sum of small efforts repeated daily.",
   author: "Robert Collier",
   category: "success"
}
    const [quote,setQuote]= useState<Quote | null>(defaultQuote);
    const [load,setLoad] = useState<boolean>(false)
    const [favorite,setFavorite] = useState<Quote[]>([])

  const copyQoute =async ()=>{
    try {
       await navigator.clipboard.writeText(quote?.quote||" ")
    } catch (error) {
        const textArea = document.createElement("textarea");
        textArea.value=quote?.quote||""
        document.body.append(textArea);
        textArea.select();
        document.execCommand("copy")
        document.body.removeChild(textArea)
        console.log(error)

    }
  } 
  const isFavorite = favorite.some((i)=>
          i.quote === quote?.quote
    )
const setFav = () => {

   if(!quote) return;

   const exists = favorite.some(
      (i)=> i.quote === quote.quote
   );

   if(exists){

      const updatedFav = favorite.filter(
         (i)=> i.quote !== quote.quote
      );

      setFavorite(updatedFav);

   } else {

      setFavorite([
         ...favorite,
         quote
      ]);
   }
}
 
  const shareQuote = async () => {
  try {

    await navigator.share({
      title: "Random Quote",
      text: `${quote?.quote} - ${quote?.author}`,
    });

  } catch (error) {
    console.log(error);
  }
};

  const randomQuote = async ()=>{
    try {
        setLoad(true)
        const r = await fetch("https://api.api-ninjas.com/v2/randomquotes?categories=success%2Cwisdom",{
             headers: {
                "X-Api-Key":import.meta.env.VITE_QUOTE_GENERATOR_API_KEY,
            },
        }
           
        );

        const d:Quote[] = await r.json();
        setQuote(d[0]);
       

    } catch (error) {
        console.log(error)

        
    }finally {

      setLoad(false)
   }
  }

const removeFavorite = (text:string)=>{

   const updatedFav = favorite.filter(
      (i)=> i.quote !== text
   );

   setFavorite(updatedFav);
}


  return (
      <div className="min-w-dvw overflow-x-hidden min-h-screen p-1  flex justify-center items-center pt-5 bg-[#080B11]">
       <div className="bg-[#090C11] w-[95%]">
            <div className='flex  items-center gap-3  lg:ml-[9%]  '>
                <div className='p-2 bg-white w-fit text-2xl rounded-xl text-blue-900 '><FaQuoteLeft /></div>
                <div className='text-white text-2xl font-semibold'>Quote Generator</div>
            </div>
             <div className="w-full flex flex-col lg:flex-row gap-4 mt-5">
                <div className="lg:w-[80%] w-full">
                    <div className=' border border-[#1e293b] rounded-xl bg-[#0B1120] py-5 md:py-15   flex justify-center items-center flex-col p-2 gap-2 md:gap-5'>
                        <div className='min-h-70 py-2  lg:min-h-100 lg:w-[80%] m-2  rounded-xl w-full border flex flex-col justify-center items-center  border-blue-600 gap-5'>
                               <div><FaQuoteLeft className='text-[#6454FD] w-15 h-15 '  /></div>
                               <div className='text-white text-2xl md:text-3xl text-center px-4 md:px-10 flex font-bold'>{load
 ? "Loading..."
 : `"${quote?.quote  || defaultQuote.quote}"`
}</div>
                               <div className='text-zinc-400 text-xl md:text-2xl font-semibold'><i>~{load?"Loading...":(quote?.author || defaultQuote.author)}</i></div>
                        </div>
                        <div className='flex text-white gap-2 justify-evenly items-center w-full lg:w-[80%]'> 
                            <div className='w-full lg:w-1/2 flex gap-2 md:flex-row flex-col'>
                                <button disabled={load} onClick={randomQuote} className='w-full md:w-[50%] border border-zinc-400 hover:border-[#372C90] h-full p-2 flex flex-col justify-center items-center bg-[#121929]  hover:bg-[#372C90] hover:scale-[1.03] rounded-xl transition-all duration-75  '>
                                <div><IoMdRefresh className='w-6  h-6 text-xl  font-light' /></div>
                                <div>{load ? "Loading..." : "Next Quote"}</div> 
                            </button>
                            <button onClick={copyQoute} className='w-full hover:border-[#372C90] md:w-[49%] border border-zinc-400 h-full p-2 flex flex-col justify-center items-center bg-[#121929]  hover:bg-[#372C90] hover:scale-[1.03] rounded-xl transition-all duration-75 '>
                                <div><FaRegCopy className='w-6  h-6 text-xl  font-light' /></div>
                                <div>Copy</div>
                            </button>
                            </div>
                            <div className='w-full lg:w-1/2 flex gap-2 md:flex-row flex-col'> 
                                 <button onClick={shareQuote} className='w-full hover:border-[#372C90] md:w-[49%]  border border-zinc-400 h-full p-2 flex flex-col justify-center items-center bg-[#121929]  hover:bg-[#372C90] hover:scale-[1.03] rounded-xl transition-all duration-75 '>
                                <div><IoMdShareAlt className='w-6  h-6 text-xl  font-light' /></div>
                                <div>Share</div>
                              </button>
                             <button onClick={setFav} className='w-full hover:border-[#372C90] md:w-[49%] border border-zinc-400 h-full p-2 flex flex-col justify-center items-center bg-[#121929]  hover:bg-[#372C90] hover:scale-[1.03] rounded-xl transition-all duration-75 '>
                                <div>{
  isFavorite
   ? <MdOutlineFavorite className='w-6  h-6 text-xl  font-light'  />
   : <MdOutlineFavoriteBorder className='w-6  h-6 text-xl  font-light'  />
}</div>
                                <div>Save Favorite</div>
                              </button>
                            </div>
                            
                           
                        </div>
                    </div> 
                </div>

                {/* favourite */}
                <div className="lg:w-[35%] w-full bg-[#0b1120] min-h-30 border flex flex-col gap-3 border-[#1e293b]  text-xl  rounded-xl p-4 text-white shadow-xl">
                    <div className='flex gap-2  p-2 items-end   font-semibold'>
                        <div>Your Favorites</div>
                    </div>

                    {
                        favorite.length===0? ( <div className='text-zinc-400 text-center py-10'>
        No Favorite Quotes Yet 
      </div>):(

          favorite.map((i,index)=>(
            <div key={index} className='w-full text-xl rounded-xl bg-[#091120]  border flex justify-between p-3 px-3 border-zinc-400                     ' >
                          <div className='w-[90%] space-y-1 flex flex-col gap-3 text-center'>
                            <div>&quot;{i.quote}&quot;</div>
                            <div><i>~{i.author}</i></div>
                          </div>
                          <div  onClick={()=> removeFavorite(i.quote)}  ><MdOutlineFavorite  className='w-5 h-5 text-[#7953FD] ' /></div>
                    </div>
          ))


      )
                    }



                    
                  
                   
                </div>

            </div>
        </div>
           
    </div>
  )
}

export default QuoteGenerator