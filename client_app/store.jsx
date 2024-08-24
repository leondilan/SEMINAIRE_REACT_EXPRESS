import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthUser = create((set) => ({
    USER: {},
    loginUser: (user) => set(() => ({ USER: user })),
    logoutUser: () => set(() => ({ USER: {} })),
}))