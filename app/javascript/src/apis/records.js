import axios from "axios";

const recordsBaseUrl = "api/v1/records";

const fetch = () => axios.get(recordsBaseUrl);

const create = (payload) => axios.post(recordsBaseUrl, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const destroy = (recordId) => axios.delete(`${recordsBaseUrl}/${recordId}`);

export default {
	fetch,
	create,
	destroy,
};
