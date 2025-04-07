import toast from "react-hot-toast";

export default function useToast() {

    const exito = (mensaje) => toast.success(mensaje);
    const errorToast = (mensaje) => toast.error(mensaje);

    return { 
        exito, 
        errorToast 
    };
}
