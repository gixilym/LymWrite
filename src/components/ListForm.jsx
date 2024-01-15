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
    {
      snippetsNames,
      setSnippetsNames,
      userConfig,
      setSelectedSnippet,
      setSlideBarIsVisible,
    } = useSnippetStore(),
    snippetsFormat = snippetsNames.filter(
      item => item !== "config" && !userConfig.paper.includes(item)
    ),
    filterSearches = snippetsFormat.filter(name => name.includes(searchItem)),
    NothingHere = (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {dictionary.NothingHere}
      </motion.p>
    ),
    LymWriteText = (
      <p
        onClick={onClickLymWrite}
        className="absolute top-3 left-5 text-2xl cursor-pointer duration-100 hover:scale-110 opacity-70 hover:opacity-100"
      >
        <span className="text-indigo-500">L</span>ym
        <span className="text-indigo-500">W</span>rite
      </p>
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

  function onClickLymWrite() {
    setSelectedSnippet({
      name: null,
      content: "",
      isCode: false,
    });
    setSlideBarIsVisible();
  }

  function renderPaper() {
    if (userConfig.paper.length > 0) {
      return userConfig.paper.map(snippetName => (
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
      {LymWriteText}
      {searchItem == null && renderEveryFiles()}
      {searchItem != null && renderSearchResults()}
      {paperIsOpen && renderPaper()}
    </ol>
  );
}

export default ListForm;
