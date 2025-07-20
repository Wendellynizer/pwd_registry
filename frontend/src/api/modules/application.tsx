import api from "..";

export const applicationCrud = {
    getAll: async() => {
        const reponse = await api.get('applications/');
        return reponse.data;
    },
    get: async(id: any) => {
        const reponse = await api.get('applications/'+id);
        return reponse.data;
    },
    create: async(data: any) => {
        const response = await api.post('applications/', data)
        return response.data;
    },
}