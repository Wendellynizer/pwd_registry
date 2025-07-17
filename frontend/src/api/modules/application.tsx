import api from "..";

export const applicationCrud = {
    create: async(data: any) => {
        const response = await api.post('application/', data)
        return response.data;
    }
}