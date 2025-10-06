import { create } from "zustand";

const useUserStore = create((set) => ({
    user: {
        id: null,
        firstName: null,
        lastName: null,
        role: null,
        email: null,
    },
    setUser: (userData) =>

        set({
            user: {
                id: userData.id,
                firstName: userData.first_name,
                lastName: userData.last_name,
                role: userData.role,
                email: userData.email,
            }
        })
    ,
    logOut: () => set({ user: null })
}))


export default useUserStore;