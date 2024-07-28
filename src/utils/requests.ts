import TsRequests from "@/utils/TsRequests";
export const requests = new TsRequests({
  baseURL: import.meta.env.VITE_BASE_URL,
});
export default requests;
requests.interceptors.request = (config) => {
  if (config.loading === undefined || config.loading === true) {
    uni.showLoading({
      title: "加载中",
    });
  }
  return config;
};

requests.interceptors.response = (response) => {
  if (response.config.loading != false) {
    uni.hideLoading();
  }
  if (response.isSuccess === true) {
    return response;
  } else {
    return response;
  }
};
