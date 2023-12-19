import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { join, desktopDir } from "@tauri-apps/api/path";
import { confirm } from "@tauri-apps/api/dialog";
import { useSnippetStore } from "../store/snippetsStore.js";
import { toastAlert, translations } from "../store/utils.js";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

function ItemForm(props) {
  const { snippetName } = props,
    {
      setSelectedSnippet,
      selectedSnippet,
      removeSnippet,
      setSlideBarIsVisible,
      userConfig,
    } = useSnippetStore(),
    dictionary = translations();

  async function onClickItem() {
    const desktop = await desktopDir(),
      myPathName = await join(desktop, "lymwrite-files", `${snippetName}.txt`),
      snippetContent = await readTextFile(myPathName),
      newSnippet = {
        name: snippetName,
        content: snippetContent,
        isCode: snippetName.includes("-code"),
      };
    setSelectedSnippet(newSnippet);
    setSlideBarIsVisible();
  }

  async function handleDelete(event) {
    event.stopPropagation();
    const desktop = await desktopDir(),
      myPathName = await join(desktop, "lymwrite-files"),
      accept = await confirm(`${dictionary.WantDelete} ${snippetName}?`, {
        title: "LymWrite",
        type: "warning",
      }),
      deletedSnippet = {
        name: null,
        content: "",
        isCode: false,
      };

    if (accept) {
      const filePath = await join(myPathName, `${snippetName}.txt`);
      await removeFile(filePath);
      removeSnippet(snippetName);
      setSelectedSnippet(deletedSnippet);
      toastAlert(dictionary.DeletedNote, "error");
    } else return;
  }

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      key={snippetName}
      onClick={onClickItem}
      className={twMerge(
        "w-full py-2 px-4 hover:cursor-pointer hover:bg-zinc-800 flex justify-between items-center border-b-2 border-zinc-700",
        selectedSnippet.name === snippetName ? "bg-zinc-800" : userConfig.theme
      )}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
      >
        {snippetName}
      </motion.p>

      <div
        onClick={handleDelete}
        className="flex w-8 gap-x-1 justify-center items-center"
      >
        <span className=" w-2 h-2 rounded-full bg-zinc-600 hover:bg-zinc-400" />
        <span className=" w-2 h-2 rounded-full bg-zinc-600 hover:bg-zinc-400" />
        <span className=" w-2 h-2 rounded-full bg-zinc-600 hover:bg-zinc-400" />
      </div>
    </motion.li>
  );
}

export default ItemForm;
