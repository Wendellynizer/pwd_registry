import api from "@services/api";

const URL = "/barangays/";

export const barangayService = {
  getAll: () => api.get(URL).then((res) => res.data),
};
