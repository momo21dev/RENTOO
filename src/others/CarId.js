import { create } from "zustand";

const useCarIdStore = create((set) => ({
    carId: null,
    setCarId: (id) => set({ carId: id })
}))
export default useCarIdStore;