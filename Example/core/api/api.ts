import axios from "axios";
import { defaults } from "lodash";
import qs from "qs";

import { CORE_CONFIG, SERVICE_CONFIG } from "@core/core/config";

const axiosInstance = axios.create();

/**
 * Don't use default axios' serializer because it's behaviour is non-standard.
 * @see https://github.com/axios/axios/issues/1111
 */
axiosInstance.defaults.paramsSerializer = qs.stringify;

axiosInstance.interceptors.request.use((request) => {
  // Allow for particular request to explicitly override service api namespace –
  // in case you need to call resource from another service.
  const namespace = request.baseURL ?? SERVICE_CONFIG.serviceApiBaseUrl;
  request.baseURL = `${SERVICE_CONFIG.baseUrl}/${namespace}`.replace(
    /([^:])(\/)+/g,
    "$1/"
  );

  // temporary fix for spaces, if base url uses api/v2
  if (request.baseURL?.includes("space")) {
    request.baseURL = request.baseURL.replace("v2", "v1");
  }

  defaults(request.headers, {
    Authorization: `Bearer ${localStorage.getItem(
      CORE_CONFIG.authTokenStorageKeyName
    )}`,
    Accept: "application/json; charset=UTF-8",
    "Content-Type": "application/json; charset=UTF-8",
  });

  // Only add SpaceId header to requests to current service API (if it supports it).
  if (
    SERVICE_CONFIG.enableSpaceIdHeader &&
    namespace === SERVICE_CONFIG.serviceApiBaseUrl
  ) {
    defaults(request.headers, {
      SpaceId: localStorage.getItem(CORE_CONFIG.activeSpaceStorageKeyName),
    });
  }

  return request;
});

export default axiosInstance;
