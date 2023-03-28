import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CodeError } from "./errors";

const endpoints = {
    obtener: "api/getClientes",
    crear: "api/createCliente",
    actualizar: "api/updateCliente",
    eliminar: "api/deleteCliente",
};

const initialState = {
    value: [],
        estado: {
        isLoading: false,
        success: false,
        error: false,
        message: '',
    },
};

const api = axios.create({
    baseURL: "http://localhost:5001/solicito-template/us-central1/",
});

export const obtenerClienteAsync = createAsyncThunk(
    "clientes/obtener",
    async () => {
        return [];
    }
);

export const crearClienteAsync = createAsyncThunk(
    "clientes/crear",
    async (data:any) => {
        await api.post(`clientes/${endpoints.crear}/${data.cedula}`, { data });
        const cliente = { ...data, id: data.cedula };
        return cliente;
    }
);

export const actualizarClienteAsync = createAsyncThunk(
    "clientes/actualizar",
    async (data:any) => {
        await api.put(`clientes/${endpoints.actualizar}/${data.id}`, { ...data });
        return data;
    }
);

export const eliminarClienteAsync = createAsyncThunk(
    "clientes/eliminar",
    async (id) => {
        await api.delete(`clientes/${endpoints.eliminar}/${id}`);
        return id;
    }
);

export const clientesReducer = createSlice({
    name: "clientes",
    initialState,
    reducers: {
        reiniciarEstados: (state) => {
            state.estado = initialState.estado;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(obtenerClienteAsync.pending, (state) => {
                state.estado = {
                    ...state.estado,
                    isLoading: true,
                };
            })
            .addCase(obtenerClienteAsync.fulfilled, (state, action) => {
                state.estado = {
                    ...state.estado,
                    isLoading: false,
                    success: true,
                };
                state.value = action.payload;
            })
            .addCase(obtenerClienteAsync.rejected, (state, action) => {
                state.estado = {
                    ...state.estado,
                    isLoading: false,
                    error: true,
                    message: CodeError(action.error.code),
                };
            })

            .addCase(crearClienteAsync.pending, (state) => {
                state.estado = {
                    ...state.estado,
                    isLoading: true,
                };
            })
            .addCase(crearClienteAsync.fulfilled, (state, action) => {
                state.estado = {
                    ...state.estado,
                    isLoading: false,
                    success: true,
                    message: "Registro Exitoso",
                };
                state.value = action.payload;
            })
            .addCase(crearClienteAsync.rejected, (state, action) => {
                state.estado = {
                    ...state.estado,
                    isLoading: false,
                    error: true,
                    message: CodeError(action.error.code),
                };
            })

            .addCase(actualizarClienteAsync.pending, (state) => {
                state.estado = {
                    ...state.estado,
                    isLoading: true,
                };
            })
            .addCase(actualizarClienteAsync.fulfilled, (state, action) => {
                state.estado = {
                    ...state.estado,
                    isLoading: false,
                    success: true,
                    message: "Exito, registro actualizado",
                };
                state.value = action.payload;
            })
            .addCase(actualizarClienteAsync.rejected, (state, action) => {
                state.estado = {
                    ...state.estado,
                    isLoading: false,
                    error: true,
                    message: CodeError(action.error.code),
                };
            })

            .addCase(eliminarClienteAsync.pending, (state) => {
                state.estado = {
                    ...state.estado,
                    isLoading: true,
                };
            })
            .addCase(eliminarClienteAsync.fulfilled, (state, action) => {
                state.estado = {
                    ...state.estado,
                    isLoading: false,
                    success: true,
                    message: "Exito, registro eliminado",
                };
            })
            .addCase(eliminarClienteAsync.rejected, (state, action) => {
                state.estado = {
                    ...state.estado,
                    isLoading: false,
                    error: true,
                    message: CodeError(action.error.code),
                };
            });
    },
});

export const { reiniciarEstados } = clientesReducer.actions;

export const initialClientes = (state : any) => state.clientes.value;
export const estadoProceso = (state : any) => state.clientes.estado;

export default clientesReducer.reducer;
