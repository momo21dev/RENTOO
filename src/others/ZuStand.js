import { create } from "zustand";

const useUserStore = create((set) => ({
    user: {
        firstName: null,
        lastName: null,
        role: null,
        email: null,
    },
    setUser: (userData) => set({ user: userData }),
    logOut: () => set({ user: null })
}))
export default useUserStore