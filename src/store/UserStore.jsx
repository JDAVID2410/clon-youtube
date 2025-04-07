import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/Firebase/config";



const useStore = create((set) => ({
  usuario: null,

  loginUser: (usuario) => set({ usuario }),
  logoutUser: () => set({ usuario: null }),
}));

// Escucha la sesión de Firebase y actualiza el store automáticamente
onAuthStateChanged(auth, (user) => {
  if (user) {
    useStore.getState().loginUser(user);
  } else {
    useStore.getState().logoutUser();
  }
});

export default useStore;

