import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

export type ThemeState = {
  mode: ThemeMode
}

type ThemeRootState = { theme: ThemeState }

const initialState: ThemeState = { mode: 'dark' }

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload
    },
    toggleMode(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
  },
})

export const { setMode, toggleMode } = themeSlice.actions
export const selectMode = (state: ThemeRootState): ThemeMode => state.theme.mode
export const selectIsDark = (state: ThemeRootState): boolean => state.theme.mode === 'dark'
export const selectNextMode = (state: ThemeRootState): ThemeMode =>
  state.theme.mode === 'dark' ? 'light' : 'dark'

export default themeSlice.reducer
