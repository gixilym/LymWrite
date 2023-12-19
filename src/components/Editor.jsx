import { useEffect, useState } from "react";
import { useSnippetStore } from "../store/snippetsStore.js";
import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
import Presentation from "./Presentation.jsx";
import EditorText from "./EditorText.jsx";
import EditorCode from "./EditorCode.jsx";

function Editor() {
  const { selectedSnippet } = useSnippetStore(),
    [contentSnippet, setContentSnippet] = useState("");

  useEffect(() => {
    setContentSnippet(selectedSnippet.content || "");
  }, [selectedSnippet]);

  useEffect(() => {
    if (selectedSnippet.name !== null) {
      const saveContentSnippet = setTimeout(async () => {
        const desktopPath = await desktopDir(),
          myPathName = await join(
            desktopPath,
            "lymwrite-files",
            `${selectedSnippet.name}.txt`
          );
        await writeTextFile(myPathName, contentSnippet);
      }, 1500);
      return () => clearTimeout(saveContentSnippet);
    }
  }, [contentSnippet, selectedSnippet]);

  return selectedSnippet.name === null ? (
    <Presentation />
  ) : selectedSnippet.isCode ? (
    <EditorCode
      contentSnippet={contentSnippet}
      setContentSnippet={setContentSnippet}
    />
  ) : (
    <EditorText
      contentSnippet={contentSnippet}
      setContentSnippet={setContentSnippet}
    />
  );
}

export default Editor;
