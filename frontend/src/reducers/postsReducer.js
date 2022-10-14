import { selectorFamily } from "recoil";
import apiCaller from "../core/api";

export const postState = selectorFamily({
  key: "postState",
  get: (id) => async () => {
    const item = await apiCaller(`posts/${id}`, "GET");
    return item.results ? item.results.data : null;
  },
  cachePolicy_UNSTABLE: {
    eviction: "most-recent",
  },
});

export const postsState = selectorFamily({
  key: "postsState",
  get:
    ({ page, page_size }) =>
    async () => {
      const item = await apiCaller("posts", "GET", {
        params: { page, pageSize: page_size },
      });
      return item.results ? item.results.data : null;
    },
  cachePolicy_UNSTABLE: {
    eviction: "most-recent",
  },
});
