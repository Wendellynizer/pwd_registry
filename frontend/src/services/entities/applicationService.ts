import api from '@services/api';

const URL = '/applications/';

export const applicationService = {
    getAll: () => api.get(URL).then(res => res.data),
    get: (id: string | number) => api.get(URL+`/${id}`).then(res => res.data),
    create: (data: any) => api.post(URL, data).then(res => res.data),
    update: (id: string | number, data: any) => api.put(URL+`/${id}`, data).then(res => res.data),
    patch: (id: string | number, data: any) => api.patch(URL+`/${id}`, data).then(res => res.data),
    delete: (id: string | number) => api.delete(URL+`${id}`).then(res => res.data)
}