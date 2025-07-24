import api from "..";

export const applicationCrud = {
    getAll: async(filters = {}) => {
        const response = await api.get('applications/', {
            params: filters,
        });
        return response.data;
    },
    get: async(id: any) => {
        const reponse = await api.get('applications/'+id);
        return reponse.data;
    },
    patch: async(data: any, id: any) => {
        const response = await api.patch(`applications/${id}/` , data);
        return response.data;
    },
    create: async(data: any) => {
        const response = await api.post('applications/', data)
        return response.data;
    },
}