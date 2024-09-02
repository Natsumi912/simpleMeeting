import axios from "axios";

// baseURLを作成
const customFetch = axios.create({
  baseURL: "/api/v1",
});

export default customFetch;
