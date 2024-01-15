import { useSnippetStore } from "../store/snippetsStore.js";
import { translations } from "../store/utils.js";
import { ArrowConfig } from "./svgs.jsx";
import { twMerge } from "tailwind-merge";

function ConfigPage(props) {
  const { setConfigPage } = props,
    { userConfig, setUserConfig } = useSnippetStore(),
    dictionary = translations();

  return (
    <div
      className={`${userConfig.theme} ${userConfig.fontFamily} flex flex-col justify-start pt-16 pb-6 gap-y-20 items-center w-full min-h-screen`}
    >
      <div className="flex justify-between items-center w-2/6 gap-x-4">
        <ArrowConfig onClick={() => setConfigPage(false)} />
        <p className="text-4xl w-4/5">{dictionary.Configuration}</p>
      </div>

      <form
        className={`${userConfig.fontSize} flex flex-col items-center justify-center gap-y-10 w-10/12 h-full`}
      >
        <label
          htmlFor="language"
          className="flex items-center justify-between w-3/6"
        >
          <p className="w-3/5">{dictionary.Language}</p>
          <select
            id="language"
            className="rounded w-2/5 outline-none text-black text-center bg-slate-400 text-lg font-bold"
            onChange={e => setUserConfig({ language: e.target.value })}
            defaultValue={userConfig.language}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>

        <label
          htmlFor="theme"
          className="flex items-center justify-between w-3/6"
        >
          <p className="w-3/5">{dictionary.Theme}</p>
          <select
            id="theme"
            className="rounded w-2/5 outline-none text-black text-center bg-slate-400 text-lg font-bold"
            defaultValue={userConfig.theme}
            onChange={e => setUserConfig({ theme: e.target.value })}
          >
            <option value="bg-zinc-800 text-white">
              {dictionary.ClearNight}
            </option>
            <option value="bg-black text-white">{dictionary.DarkNight}</option>
            <option value="bg-[#dadada] text-slate-900">
              {dictionary.Day}
            </option>
          </select>
        </label>

        <label
          htmlFor="fontSize"
          className="flex items-center justify-between w-3/6"
        >
          <p className="w-3/5">{dictionary.FontSize}</p>
          <select
            id="fontSize"
            className="rounded w-2/5 outline-none text-black text-center bg-slate-400 text-lg font-bold"
            defaultValue={userConfig.fontSize}
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
          <p className="w-3/5">{dictionary.FontFamily}</p>

          <select
            id="fontFamily"
            className="rounded w-2/5 outline-none text-black text-center bg-slate-400 text-lg font-bold"
            defaultValue={userConfig.fontFamily}
            onChange={e => setUserConfig({ fontFamily: e.target.value })}
          >
            <option value="font-Roboto">Roboto Mono</option>
            <option value="font-Arial">Arial</option>
            <option value="font-OpenSans">Open Sans</option>
            <option value="font-Lato">Lato</option>
          </select>
        </label>

        <label
          htmlFor="textCenter"
          className="flex items-center justify-between w-3/6"
        >
          <p className="w-3/5">{dictionary.TextCenter}</p>
          <span
            id="textCenter"
            onClick={() =>
              setUserConfig({ textCenter: !userConfig.textCenter })
            }
            className={twMerge(
              userConfig.textCenter
                ? "bg-green-500 text-black"
                : "bg-red-700 text-white",
              `rounded w-2/5 h-7 outline-none text-center text-lg cursor-pointer font-bold`
            )}
          >
            {userConfig.textCenter ? dictionary.Enabled : dictionary.Disabled}
          </span>
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

export default ConfigPage;
