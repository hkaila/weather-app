import { useEffect, useState } from 'react'
import keys from '../keys';
import { WiCloudy } from "react-icons/wi";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import axios from 'axios'
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes"

export default function App() {
  const [query, setQuery] = useState("")
  const [info, setInfo] = useState({})
  const today  = new Date()
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
}

  const fetchData = (e)  => {
    if(e.key === 'Enter'){
      fetch(`${keys[0]['base_URL']}weather?q=${query}&units=metric&APPID=${keys[0]['API_Key']}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setInfo(result);
        });
    }
  }
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  return(
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
      <GlobalStyles/>
    <div className='flex flex-col h-screen gap-6'>
      <nav className='flex flex-row justify-between p-4'>
      <span className='font-medium bg-orange-400 px-4 py-[.2em] rounded-lg hover:scale-105' onClick={themeToggler}>
        <WiMoonAltFirstQuarter size='1.4em'/>
      </span>
      <label>
        <input className='border-2 border-solid border-slate-400 rounded-md'
        required
        type="text"
        placeholder='Enter your city here'
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyPress ={fetchData}
        />
      </label>
      </nav>

      {/*Main body*/}
      
      {
        typeof info.main != 'undefined' ? (
          <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 font-bold font-serif text-center p-2 m-4 text-md md:text-xl lg:text-2xIl">
      <div className="col-span-full md:col-span-2 min-h-26 p-2 md:h-auto justify-center shadow-xl border-4 border-transparent border-solid rounded-lg">
        <div className='flex flex-row gap-2 justify-between'>
          <div className="flex flex-row gap-2">
          <span className='font-light relative'>{info.name}</span>
          <span className='font-light text-[.6em] md:text-sm lg:text-lg h-fit w-fit bg-orange-400 text-slate-100 text-center p-[.3em] rounded-full'>{info.sys.country}</span>
          </div>
          <span className='relative place'>{dateBuild(new Date())}</span>
        </div>
      </div>
      <div className="justify-center shadow-xl min-h-26 p-2 md:h-auto border-4 border-transparent border-solid rounded-lg">
        <p>{Math.floor(info.main.temp)} <sup className='font-light'><sup>o</sup>C</sup></p>
      </div>
      <div className="flex flex-col items-center gap-2 shadow-xl h-26 p-2 md:h-auto border-4 border-transparent border-solid rounded-lg">
        <p>{info.weather[0].description}</p>
      </div>
    </div>
        ) : (
          ""
        )
      }
    </div>
    </>
    </ThemeProvider> 
  )
  }

