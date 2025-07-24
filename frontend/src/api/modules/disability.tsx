import api from "..";

export const disabilityCrud = {
    getAll: async() => {
        const response = await api.get('disabilities/');
        return response.data;
    },
    create: async(data: any) => {
        const response = await api.post('disabilities/', data)
        return response.data;
    },
}