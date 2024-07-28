import requests from "@/utils/requests";
export default {
  async MTest() {
    return requests
      .get<{ name: string }>({
        url: "/collection/list",
      })
      .then((res) => res.data.data);
  },
};
