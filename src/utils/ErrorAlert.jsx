import Swal from "sweetalert2";

const showErrorMessage = (message, imageUrl, title) => {
  Swal.fire({
    title: title,
    text: message,
    imageUrl: "https://i.ibb.co/d6qsR6J/Emoji-Message.png",
    width: 400,

    imageWidth: 200,
    imageHeight: 200,
    confirmButtonColor: "#ff2a60",
    imageAlt: "Custom image",
    animation: false,
  });
};
export default showErrorMessage;
