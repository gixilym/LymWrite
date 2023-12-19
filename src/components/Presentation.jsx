import { useSnippetStore } from "../store/snippetsStore.js";
import { Feather } from "./svgs.jsx";

function Presentation() {
  const { userConfig } = useSnippetStore();

  return (
    <section
      className={`${userConfig.theme} w-full h-screen flex flex-col justify-center items-center pb-6 text-center text-7xl`}
    >
      <div className="flex justify-center items-center gap-10">
        <h1>
          <span className="text-indigo-500">L</span>ym
          <span className="text-indigo-500">W</span>rite
        </h1>
        <Feather />
        <div className="flex flex-col justify-end items-end">
          <p className="text-lg text-gray-400">Versión: 1.0.1</p>
          <p className="text-lg text-gray-400">Desarrollado por Staff Lym</p>
        </div>
      </div>
    </section>
  );
}

export default Presentation;
