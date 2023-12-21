import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { join, desktopDir } from "@tauri-apps/api/path";
import { confirm } from "@tauri-apps/api/dialog";
import { useSnippetStore } from "../store/snippetsStore.js";
import { translations } from "../store/utils.js";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { toast } from "react-hot-toast";
import { DeleteItemSVG, RecoveryItemSVG } from "./svgs.jsx";

function ItemForm(props) {
  const { snippetName, inTrash, paperIsOpen } = props,
    {
      setSelectedSnippet,
      selectedSnippet,
      removeSnippet,
      setSlideBarIsVisible,
      addPaperBinItem,
      userConfig,
      removePaperBinItem,
      addSnippetName,
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
    const confirmDelete = await confirm(
        `${dictionary.WantDelete} ${snippetName}?`,
        {
          title: "LymWrite",
          type: "warning",
        }
      ),
      desktop = await desktopDir(),
      path = await join(desktop, "lymwrite-files"),
      filePath = await join(path, `${snippetName}.txt`);

    if (confirmDelete) {
      removePaperBinItem(snippetName);
      toast(`Mataste a ${snippetName}`, {
        icon: "⚰️",
        duration: 2000,
        style: {
          backgroundColor: "#202020",
          color: "red",
        },
      });
      await removeFile(filePath);
    } else return;
  }

  async function handleMoveToTrash(event) {
    event.stopPropagation();

    const accept = await confirm(`${dictionary.MoveToTrash} ${snippetName}?`, {
        title: "LymWrite",
        type: "warning",
      }),
      deletedSnippet = {
        name: null,
        content: "",
        isCode: false,
      };

    if (accept) {
      toast(dictionary.SentToTrash, {
        icon: "🗑️",
        duration: 1500,
        style: {
          backgroundColor: "#202020",
          color: "#fff",
        },
      });
      addPaperBinItem(snippetName);
      removeSnippet(snippetName);
      setSelectedSnippet(deletedSnippet);
    } else return;
  }

  async function recoveryPaperItem(event) {
    event.stopPropagation();

    const recovery = await confirm(
      `${dictionary.RestoreQuestion} ${snippetName}?`,
      {
        title: "LymWrite",
        type: "warning",
      }
    );

    if (recovery) {
      removePaperBinItem(snippetName);
      addSnippetName(snippetName);
      toast(`${dictionary.RestoreSuccess} ${snippetName}`, {
        icon: "❤️",
        duration: 2000,
        style: {
          backgroundColor: "#202020",
          color: "#69ff44",
        },
      });
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

      <div className="flex justify-center items-center gap-x-4">
        {inTrash && <RecoveryItemSVG onClick={recoveryPaperItem} />}

        {paperIsOpen ? (
          <DeleteItemSVG onClick={handleDelete} />
        ) : (
          <div
            onClick={handleMoveToTrash}
            className="flex w-12 h-6 gap-x-1 justify-center items-center hover:rotate-180 duration-1000"
          >
            <span className=" w-2 h-2 rounded-full bg-zinc-600 hover:bg-zinc-400" />
            <span className=" w-2 h-2 rounded-full bg-zinc-600 hover:bg-zinc-400" />
            <span className=" w-2 h-2 rounded-full bg-zinc-600 hover:bg-zinc-400" />
          </div>
        )}
      </div>
    </motion.li>
  );
}

export default ItemForm;
