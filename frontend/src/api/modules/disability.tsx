import api from "..";

export const disabilityCrud = {
    getAll: async() => {
        const response = await api.get('disabilities/');
        return response.data;
    },
    getAllByType: async(typeId: any) => {
        const response = await api.get('disabilities/?type_id='+typeId);
        return response.data;
    },
    create: async(data: any) => {
        const response = await api.post('disabilities/', data)
        return response.data;
    },
}

// export const fetchBarangays = async() => {
//     const response = await api.get('/');
//     return (response).data;
// }