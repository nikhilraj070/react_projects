import { IoTextSharp } from "react-icons/io5";
import { FaRegCopy, FaRegLightbulb } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";

function WordCounter() {
  const audio = new Audio("/tick.mp3");
  audio.volume = 0.2;
  const [text, setText] = useState<string>("")
  const [totalChar, setTotalChar] = useState<number>(0)
  const [totalWord, setTotalWord] = useState<number>(0)
  const [charNoSpcae, setCharNoSpcae] = useState<number>(0)
  const [sentense, setSentense] = useState<number>(0)
  const [readingTime, setReadingTime] = useState<number>(0)

  const copyText = async () => {

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };
  useEffect(() => {
    setTotalChar(text.length)
    if (text.trim() === "") {
      setTotalWord(0);
    } else {
      setTotalWord(text.trim().split(/\s+/).length);
    }
    setCharNoSpcae(text.replace(/\s+/g, "").length);
    setSentense(text.split(/[!.?]+/).filter(Boolean).length)
    setReadingTime(Math.ceil(totalWord / 200));
  }, [text, totalWord])


  return (
    <div className="min-w-dvw overflow-x-hidden h-screen flex justify-center pt-5 bg-[#080B11]">

      <div className="bg-[#090C11] w-[95%]">
        <div className="h-fit p-3 bg-[#0D131B] flex gap-4 items-center px-5 rounded-xl">

          <div className="border-2 border-blue-900 rounded-xl p-2 bg-blue-900">
            <IoTextSharp className="sm:w-10 w-5 h-5 sm:h-10 text-white" />
          </div>

          <div className="text-white text-2xl font-semibold">
            Character Counter

            <div className="text-[13px] text-zinc-500">
              Count Character, words, setences and more.
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4 mt-5">
          <div className="lg:w-[72%] w-full">
            <textarea onChange={(e) => setText(e.target.value)} value={text}
              className="border border-[#1f2937] bg-[#111620] text-white h-100 resize-none rounded-xl p-5 outline-none w-full"
              placeholder="Start typing here..."
            ></textarea>
            <div className="w-full h-12 items-center mt-5 flex justify-between gap-3">
              <button onClick={copyText} className="flex gap-3 w-[50%] rounded-xl justify-center items-center bg-[#7041D1] h-full text-white">
                <FaRegCopy className="w-5 h-5 text-white" />
                <div>Copy Text</div>
              </button>
              <button onClick={() => setText("")} className="flex bg-[#7041D1] w-[50%] rounded-xl gap-3 justify-center items-center border border-[#1f2937] h-full text-white">
                <MdDeleteForever className="w-5 h-5 text-white" />
                <div>Clear Text</div>
              </button>
            </div>
            <div className="w-full h-15 pl-5 rounded-xl bg-[#111620] border border-[#1f2937] p-2 gap-3 items-center text-white mt-5 flex">
              <FaRegLightbulb className="w-5 h-5 text-yellow-400" />
              <div className="text-[13px] text-zinc-400">
                Tip: Keep your content clear and consise for better engagement
              </div>
            </div>
          </div>
          <div className="lg:w-[35%] w-full bg-[#0b1120] h-140 border border-[#1e293b] rounded-xl p-4 text-white shadow-xl">
            <h1 className="text-2xl font-semibold mb-4">
              Overview
            </h1>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 text-center">
                <p className="text-gray-400 text-lg">
                  Characters
                </p>
                <h2 className="text-3xl font-bold text-purple-500 mt-4">
                  {totalChar}
                </h2>
              </div>
              <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 text-center">
                <p className="text-gray-400 text-lg">
                  Characters (no spaces)
                </p>
                <h2 className="text-3xl font-bold text-blue-500 mt-4">
                  {charNoSpcae}
                </h2>
              </div>

              <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 text-center">

                <p className="text-gray-400 text-lg">
                  Words
                </p>

                <h2 className="text-3xl font-bold text-green-500 mt-4">
                  {totalWord}
                </h2>
              </div>

              <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 text-center">

                <p className="text-gray-400 text-lg">
                  Sentences
                </p>

                <h2 className="text-3xl font-bold text-yellow-400 mt-4">
                  {sentense}
                </h2>
              </div>

            </div>

            {/* Reading Time */}
            <div className="mt-5 bg-[#111827] border border-[#1f2937] rounded-2xl p-8 text-center">

              <p className="text-gray-400 text-xl">
                🕒 Reading Time
              </p>

              <h2 className="text-3xl font-bold text-purple-500 mt-4">
                {readingTime} min read
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default WordCounter;