import Swal from "sweetalert2";

const showSuccessMessage = (message, imageUrl, title) => {
  Swal.fire({
    title: title,
    text: message,
    imageUrl: "https://file.rendit.io/n/ygZfLwjhkH7R6r5pHciB.svg",
    width: 400,
    confirmButtonColor: "#3cb043",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    animation: false,
  });
};
export default showSuccessMessage;
