import axios from "axios";
import BASE_URL, { BASE_URL2, BASE_URL3 } from "../config/config";
import { localStore } from "./localStore";
import { toast } from "react-toastify";
import { loginError } from "../redux/actions";


export default function fireAjax(method, URL, data, header) {
  let url = BASE_URL + URL;
  let config = {};
  if (
    URL !== "user/login" &&
    URL !== "user/register" &&
    URL !==
      "data/bbg/getAssetsHistoryStartEnd/XS1877338043%20Corp/PX_LAST/1432166400/1543795200/USD" &&
    URL !==
      "data/bbg/getAssetsHistoryStartEnd/CB%20CQISCEFT%20Index/PX_LAST/1432166400/1543795200/USD"
  ) {
    config = {
      headers: {
        "Content-Type": "application/json",
        token: localStore("token"),
          'Authorization': "Bearer 18be53a2-93b2-4d92-ae4a-77fa3de000f9"
      }
    };
  } else {
    config = {
      headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer 18be53a2-93b2-4d92-ae4a-77fa3de000f9"
      }
    };
  }
  if (method === "GET") {
    return axios
      .get(url, config)
      .then(response => {
        return response;
      })
      .catch(error => {
        if (error.response.status == 401) {
          toast.error("session Expired");
          window.location.href = "/";
        } else {
          return error.response;
        }
      });
  } else if (method === "POST") {
    return axios
      .post(url, data, config)
      .then(response => {
        return response;
      })
      .catch(error => {
        if (error.response.status == 401) {
          toast.error("session Expired");
          window.location.href = "/";
        } else {
          return error.response;
        }
      });
  }
  else if (method === "DELETE") {
    return axios
      .delete(url, config)

      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error.response.status);

        if (error.response.status == 401) {
          toast.error("session Expired");
          // window.location.href = "/";
        } else {
          return error.response;
        }
      });
    }
  else if (method === "PUT") {
    return axios
      .put(url, data, config)
      .then(response => {
        return response;
      })
      .catch(error => {
        if (error.response.status == 401) {
          toast.error("session Expired");
          window.location.href = "/";
        } else {
          return error.response;
        }
      });
  } else if (method === "POST2") {
    url = BASE_URL2 + URL;
    return axios.post(url, data);
  } else if (method === "GET2") {
    url = BASE_URL2 + URL;
    return axios.get(url);
  }
}
