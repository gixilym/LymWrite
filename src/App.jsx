import Form from "./components/Form.jsx";
import ListForm from "./components/ListForm.jsx";
import Editor from "./components/Editor.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className=" h-screen text-white grid grid-cols-12">
      <div className="col-span-3 bg-zinc-900">
        <Form />
        <ListForm />
      </div>
      <div className="col-span-9 bg-neutral-950 flex justify-center items-center">
        <Editor />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
