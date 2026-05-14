import { useEffect, useRef, useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6"
import { GoDotFill } from "react-icons/go";
import { GrUpdate } from "react-icons/gr";


function LiveClock() {
  const [timeZone, setTimeZones] = useState<string>("Asia/Kolkata");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);

 
  const tickRef = useRef<HTMLAudioElement | null>(null);

const timezones = [
  { id: 1, name: "India", zone: "Asia/Kolkata" },
  { id: 2, name: "United States (New York)", zone: "America/New_York" },
  { id: 3, name: "United States (Los Angeles)", zone: "America/Los_Angeles" },
  { id: 4, name: "United Kingdom", zone: "Europe/London" },
  { id: 5, name: "Japan", zone: "Asia/Tokyo" },
  { id: 6, name: "China", zone: "Asia/Shanghai" },
  { id: 7, name: "Russia", zone: "Europe/Moscow" },
  { id: 8, name: "Australia", zone: "Australia/Sydney" },
  { id: 9, name: "Canada", zone: "America/Toronto" },
  { id: 10, name: "Germany", zone: "Europe/Berlin" },
  { id: 11, name: "France", zone: "Europe/Paris" },
  { id: 12, name: "Italy", zone: "Europe/Rome" },
  { id: 13, name: "Spain", zone: "Europe/Madrid" },
  { id: 14, name: "Brazil", zone: "America/Sao_Paulo" },
  { id: 15, name: "Mexico", zone: "America/Mexico_City" },
  { id: 16, name: "South Korea", zone: "Asia/Seoul" },
  { id: 17, name: "Singapore", zone: "Asia/Singapore" },
  { id: 18, name: "UAE", zone: "Asia/Dubai" },
  { id: 19, name: "Saudi Arabia", zone: "Asia/Riyadh" },
  { id: 20, name: "South Africa", zone: "Africa/Johannesburg" },
  { id: 21, name: "Pakistan", zone: "Asia/Karachi" },
  { id: 22, name: "Bangladesh", zone: "Asia/Dhaka" },
  { id: 23, name: "Nepal", zone: "Asia/Kathmandu" },
  { id: 24, name: "Sri Lanka", zone: "Asia/Colombo" },
  { id: 25, name: "Thailand", zone: "Asia/Bangkok" },
  { id: 26, name: "Malaysia", zone: "Asia/Kuala_Lumpur" },
  { id: 27, name: "Indonesia", zone: "Asia/Jakarta" },
  { id: 28, name: "Vietnam", zone: "Asia/Ho_Chi_Minh" },
  { id: 29, name: "Philippines", zone: "Asia/Manila" },
  { id: 30, name: "Turkey", zone: "Europe/Istanbul" },
  { id: 31, name: "Netherlands", zone: "Europe/Amsterdam" },
  { id: 32, name: "Switzerland", zone: "Europe/Zurich" },
  { id: 33, name: "Sweden", zone: "Europe/Stockholm" },
  { id: 34, name: "Norway", zone: "Europe/Oslo" },
  { id: 35, name: "Denmark", zone: "Europe/Copenhagen" },
  { id: 36, name: "Poland", zone: "Europe/Warsaw" },
  { id: 37, name: "Ukraine", zone: "Europe/Kyiv" },
  { id: 38, name: "Egypt", zone: "Africa/Cairo" },
  { id: 39, name: "Nigeria", zone: "Africa/Lagos" },
  { id: 40, name: "Kenya", zone: "Africa/Nairobi" },
  { id: 41, name: "Argentina", zone: "America/Argentina/Buenos_Aires" },
  { id: 42, name: "Chile", zone: "America/Santiago" },
  { id: 43, name: "Colombia", zone: "America/Bogota" },
  { id: 44, name: "Peru", zone: "America/Lima" },
  { id: 45, name: "New Zealand", zone: "Pacific/Auckland" },
  { id: 46, name: "Israel", zone: "Asia/Jerusalem" },
  { id: 47, name: "Iran", zone: "Asia/Tehran" },
  { id: 48, name: "Afghanistan", zone: "Asia/Kabul" },
  { id: 49, name: "Portugal", zone: "Europe/Lisbon" },
  { id: 50, name: "Greece", zone: "Europe/Athens" },
  { id: 51, name: "Austria", zone: "Europe/Vienna" },
  { id: 52, name: "Belgium", zone: "Europe/Brussels" },
  { id: 53, name: "Finland", zone: "Europe/Helsinki" },
  { id: 54, name: "Ireland", zone: "Europe/Dublin" },
  { id: 55, name: "Czech Republic", zone: "Europe/Prague" },
  { id: 56, name: "Hungary", zone: "Europe/Budapest" },
  { id: 57, name: "Romania", zone: "Europe/Bucharest" },
  { id: 58, name: "Bulgaria", zone: "Europe/Sofia" },
  { id: 59, name: "Croatia", zone: "Europe/Zagreb" },
  { id: 60, name: "Serbia", zone: "Europe/Belgrade" },
  { id: 61, name: "Iraq", zone: "Asia/Baghdad" },
  { id: 62, name: "Qatar", zone: "Asia/Qatar" },
  { id: 63, name: "Kuwait", zone: "Asia/Kuwait" },
  { id: 64, name: "Oman", zone: "Asia/Muscat" },
  { id: 65, name: "Yemen", zone: "Asia/Aden" },
  { id: 66, name: "Jordan", zone: "Asia/Amman" },
  { id: 67, name: "Lebanon", zone: "Asia/Beirut" },
  { id: 68, name: "Syria", zone: "Asia/Damascus" },
  { id: 69, name: "Mongolia", zone: "Asia/Ulaanbaatar" },
  { id: 70, name: "Kazakhstan", zone: "Asia/Almaty" },
  { id: 71, name: "Uzbekistan", zone: "Asia/Tashkent" },
  { id: 72, name: "Turkmenistan", zone: "Asia/Ashgabat" },
  { id: 73, name: "Tajikistan", zone: "Asia/Dushanbe" },
  { id: 74, name: "Kyrgyzstan", zone: "Asia/Bishkek" },
  { id: 75, name: "Myanmar", zone: "Asia/Yangon" },
  { id: 76, name: "Cambodia", zone: "Asia/Phnom_Penh" },
  { id: 77, name: "Laos", zone: "Asia/Vientiane" },
  { id: 78, name: "Brunei", zone: "Asia/Brunei" },
  { id: 79, name: "Maldives", zone: "Indian/Maldives" },
  { id: 80, name: "Mauritius", zone: "Indian/Mauritius" },
  { id: 81, name: "Ethiopia", zone: "Africa/Addis_Ababa" },
  { id: 82, name: "Morocco", zone: "Africa/Casablanca" },
  { id: 83, name: "Algeria", zone: "Africa/Algiers" },
  { id: 84, name: "Tunisia", zone: "Africa/Tunis" },
  { id: 85, name: "Ghana", zone: "Africa/Accra" },
  { id: 86, name: "Uganda", zone: "Africa/Kampala" },
  { id: 87, name: "Tanzania", zone: "Africa/Dar_es_Salaam" },
  { id: 88, name: "Zimbabwe", zone: "Africa/Harare" },
  { id: 89, name: "Namibia", zone: "Africa/Windhoek" },
  { id: 90, name: "Botswana", zone: "Africa/Gaborone" },
  { id: 91, name: "Iceland", zone: "Atlantic/Reykjavik" },
  { id: 92, name: "Greenland", zone: "America/Godthab" },
  { id: 93, name: "Cuba", zone: "America/Havana" },
  { id: 94, name: "Jamaica", zone: "America/Jamaica" },
  { id: 95, name: "Panama", zone: "America/Panama" },
  { id: 96, name: "Costa Rica", zone: "America/Costa_Rica" },
  { id: 97, name: "Guatemala", zone: "America/Guatemala" },
  { id: 98, name: "Honduras", zone: "America/Tegucigalpa" },
  { id: 99, name: "El Salvador", zone: "America/El_Salvador" },
  { id: 100, name: "Dominican Republic", zone: "America/Santo_Domingo" }
];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    tickRef.current = new Audio("/tick.mp3");
    tickRef.current.volume = 0.25;
    tickRef.current.preload = "auto";

    return () => {
      tickRef.current?.pause();
      tickRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioEnabled || !tickRef.current) return;

    tickRef.current.currentTime = 0;
    tickRef.current.play().catch(() => {});
  }, [currentTime, audioEnabled]);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !is24Hour,
  });
  const min = Number(
    currentTime.toLocaleString("en-US", {
      timeZone,
      minute: "2-digit",
    })
  );
  const sec = Number(
    currentTime.toLocaleString("en-US", {
      timeZone,
      second: "2-digit",
    })
  );

  const mins = Number(
    currentTime.toLocaleString("en-US", {
      timeZone,
      minute: "2-digit",
    })
  );

  const hrs = Number(
    currentTime.toLocaleString("en-US", {
      timeZone,
      hour: "2-digit",
      hour12: false,
    })
  );

  const secondDeg = sec * 6;
  const minuteDeg = mins * 6 + sec * 0.1;
  const hourDeg = (hrs % 12) * 30 + mins * 0.5;
  let greeting = "Good Night";
  let emoji = "🌙";

  if (hrs >= 5 && hrs < 12) {
    greeting = "Good Morning";
    emoji = "🌤️";
  }
  else if (hrs >= 12 && hrs < 17) {
    greeting = "Good Afternoon";
    emoji = "☀️";
  }
  else if (hrs >= 17 && hrs < 21) {
    greeting = "Good Evening";
    emoji = "🌇";
  }
  const handleEnableAudio = async () => {
    const audio = tickRef.current;
    setShowAudioPrompt(false);

    if (!audio) return;

    try {
      audio.currentTime = 0;
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
      setAudioEnabled(true);
    } catch {
      setAudioEnabled(false);
    }
  };

  const handleDisableAudio = () => {
    setAudioEnabled(false);
    setShowAudioPrompt(false);
  };

  return (
    <div className="min-w-dvw overflow-x-hidden h-dvh flex justify-center pt-5 bg-[#030811] px-2">


      {showAudioPrompt && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-[#1E293B] bg-[#060B17] p-6 shadow-[0_0_40px_rgba(59,130,246,0.12)]">
            <div className="text-xl font-semibold text-white">
              Do you want home clock vibe?
            </div>

            <div className="mt-2 text-sm text-zinc-400">
              Turn on the ticking audio for this clock.
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => void handleEnableAudio()}
                className="w-full rounded-[5px] bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_5px_#2563EB]"
              >
                Yes, play audio
              </button>

              <button
                onClick={handleDisableAudio}
                className="w-full  border rounded-[5px] border-[#334155] bg-[#0B1220] px-4 py-3 text-sm font-semibold text-zinc-300"
              >
                No, keep silent
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="w-[95%] bg-[#060B17] border my-4  border-[#1E293B] h-fit p-3 sm:p-4 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.12)]">
 
        {/* Header */}
        <div className="w-full lg:pl-[15%] p-4  sm:p-5 flex items-center gap-4">

          <div className="p-3 rounded-2xl border border-[#1E3A8A] bg-[#0B1220]">
            <FaRegClock className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#60A5FA]" />
          </div>

          <div>
            <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">
              Live Clock
            </div>

            <div className="text-[13px] sm:text-[14px] lg:text-[15px] text-zinc-400">
              Real-time, Always on time.
            </div>
          </div>
        </div>


        {/* Clock UI */}
        <div>
          <div className="flex flex-col lg:flex-row p-4 sm:p-6 gap-10 justify-evenly w-full border border-[#1E293B] rounded-3xl bg-[#09101D] items-center">

            {/* Clock */}
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 flex items-center  justify-center">

              <div
                className="w-6 h-6 absolute z-50 border border-white rounded-full bg-[#93C5FD] shadow-[0_0_15px_#60A5FA]  transition-all duration-500"
                style={{
                  transform: `
      rotate(${hourDeg}deg)
      translateY(-110px)
    `,
                }}
              ></div>

              {
                [...Array(60)].map((_, i) => {
                  const active = i <= min;

                  return (
                    <div
                      key={i}
                      className={`
                    absolute rounded-full transition-all duration-500
                    ${active
                          ? "bg-white shadow-[0_0_12px_#3B82F6]"
                          : "bg-gray-600"
                        }
                  `}
                      style={{
                        width: "3px",
                        height: i % 5 === 0 ? "30px" : "15px",

                        transform: `
                      rotate(${i * 6}deg)
                      translateY(-110px)
                    `,
                      }}
                    />
                  );
                })
              }

              <div className="w-44 h-44 rounded-full border-4 border-[#1E293B] bg-[radial-gradient(circle,#101827,#050816)] shadow-[inset_0_0_25px_rgba(59,130,246,0.25),0_0_40px_rgba(59,130,246,0.15)] backdrop-blur-xl relative ">

                {/* Hour Hand */}
                <div
                  className=" absolute -1.25 h-12  rounded-t-full rounded-b-3xl bg-linear-to-t from-white to-zinc-400 bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.4)] "
                  style={{
                    transform: `translateX(-50%) rotate(${hourDeg}deg)`,
                  }}
                ></div>

                {/* Minute Hand */}
                <div
                  className="absolute w-1 h-16  rounded-t-full rounded-b-3xl bg-linear-to-t from-[#60A5FA] to-cyan-200 bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 shadow-[0_0_14px_#60A5FA] "
                  style={{
                    transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
                  }}
                ></div>

                {/* Second Hand */}
                <div
                  className=" absolute w-0.5 h-20  rounded-full bg-linear-to-t from-red-500 to-red-200 bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 shadow-[0_0_12px_rgba(239,68,68,0.8)] "
                  style={{
                    transform: `translateX(-50%) rotate(${secondDeg}deg)`,
                  }}
                ></div>
                <div className=" absolute w-5 h-5 rounded-full bg-white/85 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(255,255,255,0.9)] border z-50 "></div>

              </div>
            </div>


            {/* Time Content */}
            <div className="flex items-center lg:items-start flex-col gap-3 text-center lg:text-left">

              <div className="flex gap-2 text-xl sm:text-2xl lg:text-3xl font-semibold">
                <div className="text-white">
                  {greeting}
                </div>

                <div className="animate-pulse">
                  {emoji}
                </div>
              </div>

              <div className="flex items-end gap-2 text-white flex-wrap justify-center lg:justify-start">

                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wider">
                  {formattedTime.slice(0, 8)}
                </div>

                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-300">
                  {is24Hour ? "" : formattedTime.slice(-2)}
                </div>
              </div>

              <div className="flex gap-2 text-[14px] sm:text-[16px] lg:text-xl items-center font-medium text-zinc-400">
                <div><FaRegCalendarAlt /></div>
                <div>Saturday, May 17, 2025</div>
              </div>

            </div>
          </div>
        </div>


        {/* Bottom Cards */}
        <div className="flex flex-col lg:flex-row justify-evenly w-full p-2 gap-3 mt-4">

          {/* Timezone */}
          <div className="w-full sm:justify-between lg:w-[33%] flex flex-col sm:flex-row lg:flex-col lg:justify-center lg:items-start gap-4 border border-[#1E293B] bg-[#09101D] p-4 rounded-2xl ">

            <div className="flex  gap-2 text-[14px] sm:text-[16px] lg:text-[18px] items-center font-semibold text-zinc-400">
              <CiGlobe />
              <div>Timezone</div>
            </div>

            <select value={timeZone}
              onChange={(e) => setTimeZones(e.target.value)} className="w-full sm:w-auto bg-[#0B1220] border border-[#334155] rounded-xl px-4 py-3  text-white text-[14px] sm:text-[15px] outline-none shadow-[0_0_15px_rgba(59,130,246,0.08)] ">
              {
                timezones.map((t): React.ReactNode => (
                  <option key={t.id} value={t.zone}>
                    {t.name} ({t.short})
                  </option>
                ))
              }

            </select>
          </div>


          {/* Format */}
          <div className="w-full sm:justify-between lg:w-[33%] flex flex-col sm:flex-row lg:flex-col lg:justify-center lg:items-start gap-4 border border-[#1E293B] bg-[#09101D] p-4 rounded-2xl ">

            <div className="flex gap-2 text-[14px] sm:text-[16px] lg:text-[18px] items-center font-semibold text-zinc-400">
              <FaRegClock />
              <div>Format</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

              <button
                onClick={() => setIs24Hour(false)}
                className={` px-6 py-3  rounded-[5px]  w-full sm:w-auto text-[15px] sm:text-[18px] font-semibold transition-all duration-300
      ${!is24Hour
                    ? "bg-[#2563EB] text-white shadow-[0_0_12px_#2563EB]"
                    : "bg-[#1E293B] text-zinc-300"
                  }
    `}
              >
                12 Hour
              </button>

              <button
                onClick={() => setIs24Hour(true)}
                className={` px-6 py-3  rounded-[5px]  w-full sm:w-auto text-[15px] sm:text-[18px] font-semibold transition-all duration-300
      ${is24Hour
                    ? "bg-[#2563EB] text-white shadow-[0_0_12px_#2563EB]"
                    : "bg-[#1E293B] text-zinc-300"
                  }
    `}
              >
                24 Hour
              </button>

            </div>
          </div>


          {/* Live */}
          <div className="w-full lg:w-[33%] flex flex-col sm:flex-row lg:flex-col  lg:justify-center lg:items-start gap-4 border border-[#1E293B] bg-[#09101D] p-4 rounded-2xl sm:justify-between   ">

            <div className="flex gap-2 w-fit text-[14px] sm:text-[16px] lg:text-[18px] items-center font-semibold text-zinc-400">
              <GrUpdate />
              <div >Auto Update</div>
            </div>

            <div className="flex w-fit gap-2 text-[14px] sm:text-[15px] lg:text-[16px] items-center font-semibold text-green-400">
              <GoDotFill className="animate-pulse" />
              <div>Live</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LiveClock
