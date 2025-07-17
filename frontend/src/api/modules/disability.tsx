import api from "..";

export const disabilityCrud = {
    getAll: async() => {
        const response = await api.get('disabilities/');
        return response.data;
    }
}