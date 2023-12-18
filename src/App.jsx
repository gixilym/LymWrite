import { useState } from "react";
import SectionToOpenSnippets from "./components/SectionToOpenSnippets.jsx";
import SnippetsList from "./components/SnippetsList.jsx";
import FileContent from "./components/FileContent.jsx";
import { useSnippetStore } from "./store/snippetsStore.js";
import { ArrowConfig } from "./components/svgs.jsx";
import { translations } from "./store/utils.js";
import { Toaster } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

function App() {
  const [configPage, setConfigPage] = useState(false),
    { userConfig, setUserConfig } = useSnippetStore(),
    dictionary = translations();

  //!subi los cambios cunado termines configuracion

  if (!configPage) {
    return (
      <div
        className={twMerge(
          userConfig.theme,
          userConfig.fontFamily,
          "flex flex-col justify-start pt-16 pb-6 gap-y-20 items-center w-full min-h-screen"
        )}
      >
        <div className="flex justify-between items-center w-2/4">
          <ArrowConfig onClick={() => setConfigPage(false)} />
          <p className="text-4xl w-2/4">{dictionary.Configuration}</p>
        </div>

        <form
          className={`${userConfig.fontSize} flex flex-col items-center justify-center gap-y-10 w-10/12 h-full`}
        >
          <label
            htmlFor="language"
            className="flex items-center justify-between w-3/6"
          >
            <p className="w-2/4">{dictionary.Language}</p>
            <select
              id="language"
              className="rounded w-2/4 outline-none text-black text-center bg-slate-400"
              onChange={e => setUserConfig({ language: e.target.value })}
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </label>

          <label
            htmlFor="theme"
            className="flex items-center justify-between w-3/6"
          >
            <p className="w-2/4">{dictionary.Theme}</p>
            <select
              id="theme"
              className="rounded w-2/4 outline-none text-black text-center bg-slate-400 "
              defaultValue="bg-zinc-800 text-white"
              onChange={e => setUserConfig({ theme: e.target.value })}
            >
              <option value="bg-zinc-800 text-white">
                {dictionary.ClearNight}
              </option>
              <option value="bg-black text-white">
                {dictionary.DarkNight}
              </option>
              <option value="bg-[#dadada] text-slate-900 ">
                {dictionary.Day}
              </option>
            </select>
          </label>

          <label
            htmlFor="fontSize"
            className="flex items-center justify-between w-3/6"
          >
            <p className="w-2/4">{dictionary.FontSize}</p>
            <select
              id="fontSize"
              className="rounded w-2/4 outline-none text-black text-center bg-slate-400 "
              defaultValue="text-2xl"
              onChange={e => setUserConfig({ fontSize: e.target.value })}
            >
              <option value="text-lg">{dictionary.VerySmall}</option>
              <option value="text-xl">{dictionary.Small}</option>
              <option value="text-2xl"> {dictionary.Medium}</option>
              <option value="text-3xl"> {dictionary.Large}</option>
            </select>
          </label>

          <label
            htmlFor="fontFamily"
            className="flex items-center justify-between w-3/6"
          >
            <p className="w-2/4">{dictionary.FontFamily}</p>

            <select
              id="fontFamily"
              className="rounded w-2/4 outline-none text-black text-center bg-slate-400"
              defaultValue="font-Roboto"
              onChange={e => setUserConfig({ fontFamily: e.target.value })}
            >
              <option value="font-Roboto">Roboto Mono</option>
              <option value="font-Arial">Arial</option>
              <option value="font-OpenSans">Open Sans</option>
              <option value="font-Lato">Lato</option>
            </select>
          </label>
        </form>

        <small
          className={`${userConfig.fontSize} text-indigo-500 tracking-wide `}
        >
          {dictionary.CreatedBySL}
        </small>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center items-center w-full h-screen text-white bg-zinc-900">
      <SectionToOpenSnippets />
      <SnippetsList setConfigPage={setConfigPage} />
      <FileContent />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
