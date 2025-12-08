import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      if (!res.ok) {
        const error = await res.json()
        return rejectWithValue(error.message)
      }

      return await res.json()

    } catch (error) {
      return rejectWithValue('Error de conexión')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as null | { id: string; email: string; name: string },
    loading: false,
    error: null as string | null
  },
  reducers: {
    logout(state) {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
