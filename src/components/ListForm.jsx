import { useEffect } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { useSnippetStore } from "../store/snippetsStore.js";
import { desktopDir, join } from "@tauri-apps/api/path";
import ItemForm from "./ItemForm.jsx";
import { translations } from "../store/utils.js";
import { motion } from "framer-motion";

function ListForm(props) {
  const { searchItem } = props,
    dictionary = translations(),
    { snippetsNames, setSnippetsNames } = useSnippetStore(),
    snippetsFormat = snippetsNames.filter(item => item !== "config"),
    filterSearches = snippetsFormat.filter(name => name.startsWith(searchItem));

  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir(),
        myPathName = await join(desktopPath, "lymwrite-files"),
        res = await readDir(myPathName),
        filesNames = res.map(file => file.name.split(".")[0]);
      setSnippetsNames(filesNames);
    }
    return () => loadFiles();
  }, []);

  return (
    <ol className="w-full h-6/6 select-none flex flex-col justify-start items-center">
      {searchItem !== null ? (
        filterSearches.length > 0 ? (
          filterSearches.map(snippetName => (
            <ItemForm snippetName={snippetName} key={snippetName} />
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {dictionary.NothingHere}
          </motion.p>
        )
      ) : (
        snippetsFormat.map(snippetName => (
          <ItemForm snippetName={snippetName} key={snippetName} />
        ))
      )}
    </ol>
  );
}

export default ListForm;
