import SlideBar from "./components/SlideBar.jsx";
import FileContent from "./components/FileContent.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-row justify-between items-center w-full h-screen text-white bg-zinc-800">
      <SlideBar />
      <FileContent />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
