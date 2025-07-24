import api from "..";

export const statusLogCrud = {
    getAll: async(id: any) => {
        const response = await api.get('status_log/?pwd_id='+id);
        return response.data;
    },
    get: async(id: any) => {
        const response = await api.get('pwds/pwd_id='+id );
        return response.data;
    },
    create: async(data: any) => {
        const response = await api.post('pwds/', data)
        return response.data;
    },
}