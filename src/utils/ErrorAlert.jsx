import Swal from "sweetalert2";

const showErrorMessage = (message, imageUrl, title) => {
    Swal.fire({
        title: title,
        text: message,
        imageUrl: "https://file.rendit.io/n/MlrlT2b0QgEKTtnymExn.svg",
        width: 400,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        animation: false
    });
};
export default showErrorMessage;