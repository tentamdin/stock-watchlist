import axios from "axios";

const TOKEN = "cj53k49r01qq6hgdrikgcj53k49r01qq6hgdril0";
export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
