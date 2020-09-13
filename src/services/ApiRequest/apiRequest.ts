import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { apiInformationType } from "../../types/generalTypes";
import {
  // IBasicAuth,
  requestMethods,
} from "../../types/serviceTypes";
import TokenService from "../AuthToken/authToken";
import { createDispatchTypes } from "../../store/helpers/createDispatchTypes";

// Auth and URL configs
let url: string = process.env.REACT_APP_POSTING_ENDPOINT!;

// const basicAuth: IBasicAuth = {
//   username: "clientid",
//   password: "secret",
// };

// const getGrantType = (): IGrantType => {
//   return { key: "grant_type", value: "password" };
// };

// Cancel a request using a cancel token.
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

function getToken() {
  let access_token = "";
  const storedToken: string = TokenService.getAccessToken();

  if (storedToken) {
    access_token = storedToken;
  }

  return access_token;
}

export const makeApiRequest = (
  apiDetails: apiInformationType,
  requestData: any,
  requestMethod: requestMethods,
  dispatch?: any
) => {
  if (dispatch) {
    let dispatchTypes = createDispatchTypes(apiDetails.actionName);
    dispatch({ type: dispatchTypes.progressDispatch, payload: null });
  }

  let access_token = getToken();
  let headers = getRequestHeaders(apiDetails, access_token);
  let transformedRequestData = transformRequestData(
    apiDetails,
    requestData
    // basicAuth
  );

  let axiosReqParams: AxiosRequestConfig = {
    url: apiDetails.controllerName,
    method: requestMethod,
    baseURL: url,
    headers: headers,
    ...transformedRequestData,
    timeout: 60 * 3 * 1000,
    cancelToken: source.token,
  };

  return axios
    .request(axiosReqParams)
    .then((response: AxiosResponse<any>) => {
      return response;
    })
    .catch((error: AxiosError<any>) => {
      let errorResponse = manageErrorResponse(error);
      return errorResponse;
    });
};

const getRequestHeaders = (
  apiDetails: apiInformationType,
  access_token: string
) => {
  let headers = {};
  switch (apiDetails.actionName) {
    case "TOKEN":
    case "GET_ALL_POSTS":
      {
        headers = {
          "Content-Type": "application/json",
        };
        break;
      }

    case "SAVE_PROFILE":
    case "UPDATE_PROFILE":
      headers = {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + access_token,
      };
      break;

    default: {
      headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      };
      break;
    }
  }
  return {
    ...headers
  };
};

const transformRequestData = (
  apiDetails: apiInformationType,
  requestData: any,
  // basicAuth: IBasicAuth
) => {
  let transformedRequestData: any = {};

  let formData = new FormData();
  for (let data in requestData) {
    formData.append(data, requestData[data]);
  }

  switch (apiDetails.actionName) {
    // case "TOKEN":
    //   let grant_type = getGrantType();
    //   formData.append(grant_type.key, grant_type.value);
    //   transformedRequestData.auth = basicAuth;
    //   transformedRequestData.data = formData;
    //   break;

    case "SAVE_PROFILE":
    case "UPDATE_PROFILE":
      transformedRequestData.data = formData;
      break;
    default:
      transformedRequestData.data = requestData;
      break;
  }

  return transformedRequestData;
};

let manageErrorResponse = (error: AxiosError) => {
  let errorResponse: any = {
    message: "Error",
    data: null,
    status: false,
  };

  if (error.response) {
    errorResponse.message = error.response.status; // The server responded with a status code
    errorResponse.data = error.response.data; // The server responded with a status code and data
  } else if (error.request) {
    errorResponse.message = "Server could not be reached.";
  } else {
    errorResponse.message = error.message; // Something happened in setting up the request that triggered an Error
  }
  errorResponse.config = error.config; // Request Params Configs

  return errorResponse;
};
