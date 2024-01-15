import { useSnippetStore } from "../store/snippetsStore.js";
import { Feather } from "./svgs.jsx";

function Presentation() {
  const { userConfig } = useSnippetStore();

  return (
    <section
      className={`${userConfig.theme} w-full h-screen flex flex-col justify-start items-center pt-16 gap-y-14`}
    >
      <div className="w-10/12 flex flex-row justify-start gap-x-14 items-center">
        <h1 className="text-7xl">
          <span className="text-indigo-500">L</span>ym
          <span className="text-indigo-500">W</span>rite
        </h1>
        <Feather />
        <div className="flex flex-col justify-center gap-y-2 items-start">
          <p className="text-lg text-gray-400">Versión: 1.0.0</p>
          <p className="text-lg text-gray-400">Desarrollado por Staff Lym</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start w-10/12 gap-y-5">
        <p className="w-[60%] text-2xl text-indigo-500">Características</p>
        <ol className="w-[100%] flex flex-col justify-center items-start text-gray-300 gap-y-4 list-[circle] pl-4">
          <li className="text-lg">
            Organiza tus ideas y pensamientos y pon en órden tu mente.
          </li>
          <li className="text-lg ">
            Guardado seguro de lo que escribas localmente.
          </li>
          <li className="text-lg">
            Editor de código disponible colocando "-code" al final del snippet.
            <div className="mt-4 pl-4 flex flex-row justify-start items-center gap-x-3">
              Por ejemplo:
              <p className="px-6 py-2 border-2 border-zinc-700 rounded-xl w-max text-start">
                snippets
                <span className="text-indigo-500">-code</span>
              </p>
              <p className="px-6 py-2 border-2 border-zinc-700 rounded-xl w-max text-start">
                items
                <span className="text-indigo-500">-code</span>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

export default Presentation;
