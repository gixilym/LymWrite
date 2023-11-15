import { useEffect } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { useSnippetStore } from "../store/snippetsStore.js";
import { myPathName } from "../store/const.js";
import ItemForm from "./ItemForm.jsx";

function ListForm() {
  const { snippetsNames, setSnippetsNames } = useSnippetStore();

  useEffect(() => {
    async function loadFiles() {
      const res = await readDir(myPathName),
        filesNames = res.map(file => file.name.split(".")[0]);
      setSnippetsNames(filesNames);
    }
    return () => loadFiles();
  }, []);

  return (
    <div>
      {snippetsNames.length > 0 &&
        snippetsNames.map(snippetName => (
          <ItemForm snippetName={snippetName} />
        ))}
    </div>
  );
}

export default ListForm;
