import { useState } from "react";
import Form from "./Form.jsx";
import ListForm from "./ListForm.jsx";

function SlideBar() {
  const [isVisible, setIsVisible] = useState(false);

  return isVisible ? (
    <aside
      className="bg-zinc-900 w-[40%] h-screen border-r-2 border-zinc-800"
      onMouseLeave={() => setIsVisible(false)}
    >
      <Form />
      <ListForm />
    </aside>
  ) : (
    <aside
      className="bg-zinc-900 w-12 h-screen"
      onMouseEnter={() => setIsVisible(true)}
    />
  );
}

export default SlideBar;
