import { useState, useEffect } from "react";
import SectionToOpenSnippets from "./components/SectionToOpenSnippets.jsx";
import SnippetsList from "./components/SnippetsList.jsx";
import FileContent from "./components/FileContent.jsx";
import { useSnippetStore } from "./store/snippetsStore.js";
import ConfigPage from "./components/ConfigPage.jsx";
import { join, desktopDir } from "@tauri-apps/api/path";
import { fs } from "@tauri-apps/api";
import { Toaster } from "react-hot-toast";

function App() {
  const [configPage, setConfigPage] = useState(false),
    { userConfig, setUserConfig } = useSnippetStore();

  useEffect(() => {
    /* La función se ejecuta pero no crea la carpeta
    async function createFolder() {
      const desktop = await desktopDir(),
        path = await join(desktop, "lymwrite-files"),
        exists = await fs.exists(path)
      if (!exists) {
        console.log("creando carpeta");
        await fs.createDir("lymwrite-files");
      }
    }*/

    async function recoveryUserConfig() {
      const desktop = await desktopDir(),
        path = await join(desktop, "lymwrite-files", "config.json"),
        exists = await fs.exists(path),
        config = await fs.readTextFile(path);

      if (exists) {
        setUserConfig(JSON.parse(config));
      }
    }

    return () => {
      /*  createFolder();*/
      recoveryUserConfig();
    };
  }, []);

  if (configPage) {
    return <ConfigPage setConfigPage={setConfigPage} />;
  }

  return (
    <div
      className={`${userConfig.theme} ${userConfig.fontFamily} ${userConfig.fontSize} flex flex-row justify-center items-center w-full h-screen`}
    >
      <SectionToOpenSnippets />
      <SnippetsList setConfigPage={setConfigPage} />
      <FileContent />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
