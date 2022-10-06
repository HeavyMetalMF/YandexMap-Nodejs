import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export interface IInputsData {
    name: string,
    latitude: string,
    longitude: string,
    _id?: number,
    userId?: string | null
}

export interface IMark {
    _id: number,
    name: string,
    latitude: string,
    longitude: string
}

export interface IAuthData {
    username: string,
    password: string,
}

export interface ILoginData extends IAuthData{
    setToken: (token: string) => void
    navigate: Function
}

interface IDeleteData {
    userId: string | null,
    id: number
}

interface IState {
    marks: IMark[],
    userId: string | null
}

const initialState: IState = {
    marks: [],
    userId: null
}


export const getMarks = createAsyncThunk(
    'main/getMarks',
    async (userId: string | null) => {
        const response = await axios.get('http://localhost:5000/mark', {
            params:{
                userId: userId
            }
        });
        return response.data;
    }
)

export const addMark = createAsyncThunk(
    'main/addMark',
    async (data: IInputsData) => {
        const response = await axios.post('http://localhost:5000/mark', {
            name: data.name,
            latitude: data.latitude,
            longitude: data.longitude,
            id: data._id,
            userId: data.userId
        }, {})
        return response.data;
    }
)

export const deleteMark = createAsyncThunk(
    'main/deleteMark',
    async (data: IDeleteData) => {
        const response = await axios.delete('http://localhost:5000/mark', {
            // headers: {Authorization: `Bearer ${data.token}`},
            params: {
                _id: data.id,
                userId: data.userId
            }
        })
        return response.data;
    }
)

export const updateMark = createAsyncThunk(
    'main/updateMark',
    async (data: IInputsData) => {
        const response = await axios.put('http://localhost:5000/mark', {
            name: data.name,
            latitude: data.latitude,
            longitude: data.longitude,
            _id: data._id,
            userId: data.userId
        }, {})
        return response.data;
    }
)

export const login = createAsyncThunk(
    'main/login',
    async (data: ILoginData) => {
        const response = await axios.post('http://localhost:5000/auth/login', {
            username: data.username,
            password: data.password
        })
        return response.data
    }
)

export const register = createAsyncThunk(
    'main/register',
    async (data: IAuthData) => {
        const response = await axios.post('http://localhost:5000/auth/register', {
            username: data.username,
            password: data.password
        }, {})

        return response.data
    }
)

export const MainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(addMark.fulfilled, (state, action) => {
                state.marks.push(action.payload)
            })
            .addCase(getMarks.fulfilled, (state, action) => {
                state.marks = action.payload;
            })
            .addCase(updateMark.fulfilled, (state, action) => {
                state.marks = state.marks.map(mark => {
                    if (action.payload._id == mark._id){
                        return action.payload;
                    }else {
                        return mark;
                    }
                })
            })
            .addCase(deleteMark.fulfilled, (state, action) => {
                state.marks = state.marks.filter(mark => mark._id !== action.payload._id);
            })
    }
})

export default MainSlice.reducer;