import { useEffect } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { useSnippetStore } from "../store/snippetsStore.js";
import { desktopDir, join } from "@tauri-apps/api/path";
import ItemForm from "./ItemForm.jsx";
import { translations } from "../store/utils.js";
import { motion } from "framer-motion";

function ListForm(props) {
  const { searchItem, paperIsOpen } = props,
    dictionary = translations(),
    { snippetsNames, setSnippetsNames, paperBin } = useSnippetStore(),
    snippetsFormat = snippetsNames.filter(item => item !== "config"),
    filterSearches = snippetsFormat.filter(name => name.includes(searchItem)),
    NothingHere = (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {dictionary.NothingHere}
      </motion.p>
    );

  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir(),
        path = await join(desktopPath, "lymwrite-files"),
        res = await readDir(path),
        filesNames = res.map(file => file.name.split(".")[0]);
      setSnippetsNames(filesNames);
    }
    return () => loadFiles();
  }, []);

  function renderPaperBin() {
    if (paperBin.length > 0) {
      return paperBin.map(snippetName => (
        <ItemForm
          inTrash
          paperIsOpen
          snippetName={snippetName}
          key={snippetName}
        />
      ));
    } else {
      return NothingHere;
    }
  }

  function renderSearchResults() {
    if (filterSearches.length > 0) {
      return filterSearches.map(snippetName => (
        <ItemForm snippetName={snippetName} key={snippetName} />
      ));
    } else {
      return NothingHere;
    }
  }

  function renderEveryFiles() {
    if (!paperIsOpen) {
      return snippetsFormat.map(snippetName => (
        <ItemForm snippetName={snippetName} key={snippetName} />
      ));
    }
  }

  return (
    <ol className="w-full h-6/6 select-none flex flex-col justify-start items-center">
      {searchItem == null && renderEveryFiles()}
      {searchItem != null && renderSearchResults()}
      {paperIsOpen && renderPaperBin()}
    </ol>
  );
}

export default ListForm;
