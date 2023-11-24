import toast from "react-hot-toast";

function toastAlert(message, type) {
  if (type === "error") {
    toast.error(message, {
      duration: 2000,
      style: {
        backgroundColor: "#202020",
        color: "#fff",
      },
    });
  }

  if (type === "success") {
    toast.success(message, {
      duration: 2000,
      style: {
        backgroundColor: "#202020",
        color: "#fff",
      },
    });
  }

  return;
}

export { toastAlert };
