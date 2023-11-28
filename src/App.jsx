import SlideBar from "./components/SlideBar.jsx";
import FileContent from "./components/FileContent.jsx";
import ArrowSlideBar from "./components/ArrowSlideBar.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-row justify-center items-center w-full h-screen text-white bg-zinc-900">
      <SlideBar />
      <ArrowSlideBar />
      <FileContent />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
