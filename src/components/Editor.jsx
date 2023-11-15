import { useEffect, useState } from "react";
import { useSnippetStore } from "../store/snippetsStore.js";
import EditorCode from "@monaco-editor/react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import { myPathName } from "../store/const.js";

function Editor() {
  const { selectedSnippet } = useSnippetStore(),
    [contentSnippet, setContentSnippet] = useState("");

  useEffect(() => {
    if (selectedSnippet.name === null) return;

    const saveContentSnippet = setTimeout(async () => {
      const filePath = await join(myPathName, selectedSnippet.name);
      await writeTextFile(filePath, contentSnippet);
    }, 1500);

    return () => clearTimeout(saveContentSnippet);
  }, [contentSnippet]);

  return selectedSnippet.name !== null ? (
    <>
      {selectedSnippet.isCode ? (
        <EditorCode
          onChange={value => setContentSnippet(value)}
          theme="vs-dark"
          defaultLanguage="javascript"
          options={{
            fontLigatures: true,
            fontSize: 19,
            fontFamily: "sans-serif",
          }}
          value={selectedSnippet.content}
        />
      ) : (
        <div>
          <p>aaca toasd</p>
          {selectedSnippet.content}
        </div>
      )}
    </>
  ) : (
    <p>Selecciona un archivo</p>
  );
}

export default Editor;
