import { desktopDir, join } from "@tauri-apps/api/path";

const desktopPath = await desktopDir();
const myPathName = await join(
  desktopPath,
  "every",
  "morralla",
  "snippets-code"
);

export { myPathName };
