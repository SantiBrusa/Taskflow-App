import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

// Solo datos simples: el objeto de Firebase no es serializable
export type AuthUser = { uid: string; email: string | null }

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null as AuthUser | null },
    reducers: {
        setUser: (state, action: PayloadAction<AuthUser | null>) => {
            state.user = action.payload
        },
    },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user