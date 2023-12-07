import axios from "axios";

const client = axios.create({
  baseURL: "https://serverpprod.hksoftware.in/api/v1/users",
});

export default client;