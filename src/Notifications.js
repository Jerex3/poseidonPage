import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const toastSuccess = (message) => {
    toast.success(message, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
}

const toastWarn = (message) => {
    toast.warn(message, {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT
    })
}


export default {
    toastSuccess,
    toastWarn
}