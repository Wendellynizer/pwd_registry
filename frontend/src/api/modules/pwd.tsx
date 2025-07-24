import api from "..";

export const pwdCrud = {
    getAll: async() => {
        const response = await api.get('pwds/');
        return response.data;
    },
    get: async(id: any) => {
        const response = await api.get('pwds/'+id );
        return response.data;
    },
    create: async(data: any) => {
        const response = await api.post('pwds/', data)
        return response.data;
    },
}