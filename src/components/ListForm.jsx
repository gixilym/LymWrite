import { useEffect } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { useSnippetStore } from "../store/snippetsStore.js";
import { desktopDir, join } from "@tauri-apps/api/path";
import ItemForm from "./ItemForm.jsx";

function ListForm() {
  const { snippetsNames, setSnippetsNames } = useSnippetStore();

  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir(),
        myPathName = await join(
          desktopPath,
          "toding",
          "morralla",
          "snippets-code"
        ),
        res = await readDir(myPathName),
        filesNames = res.map(file => file.name.split(".")[0]);
      setSnippetsNames(filesNames);
    }
    return () => loadFiles();
  }, []);

  return (
    <ol className="select-none flex flex-col justify-start items-center">
      {snippetsNames.length > 0 &&
        snippetsNames.map(snippetName => (
          <ItemForm snippetName={snippetName} key={snippetName} />
        ))}
    </ol>
  );
}

export default ListForm;
