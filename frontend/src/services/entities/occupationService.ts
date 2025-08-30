import api from '@services/api';

const URL = '/occupations/';

export const occupationService = {
    getAll: () => api.get(URL).then(res => res.data),
}