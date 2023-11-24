import { useState } from "react";
import Form from "./Form.jsx";
import ListForm from "./ListForm.jsx";
import { motion } from "framer-motion";

function SlideBar() {
  const [isVisible, setIsVisible] = useState(false);

  function onMouseEnter() {
    setTimeout(() => setIsVisible(true), 300);
  }

  function onMouseLeave() {
    setTimeout(() => setIsVisible(false), 300);
  }

  return isVisible ? (
    <motion.aside
      className="bg-zinc-900 w-[40%] h-screen border-r-2 border-zinc-800 overflow-hidden"
      onMouseLeave={onMouseLeave}
      transition={{ duration: 0.3 }}
      initial={{ x: -200 }}
      animate={{ x: 0 }}
    >
      <Form />
      <ListForm />
    </motion.aside>
  ) : (
    <aside className="bg-zinc-900 w-12 h-screen" onMouseEnter={onMouseEnter} />
  );
}

export default SlideBar;
