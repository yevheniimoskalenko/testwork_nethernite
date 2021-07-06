import createApi from "@/api";
import { JSDELIVR_API_URL, NPM_API_URL, PACKAGES_PER_PAGE } from "@/constants";

const jsDelivrApi = createApi(JSDELIVR_API_URL);
const npmApi = createApi(NPM_API_URL);

const searchCache = new Map();
const packageCache = new Map();

export default {
  state: {
    listResult: [],
    page: 1,
    perPage: 10,
    total: null,
    currentPackage: null,
  },
  getters: {
    tableItems: (state) => state.listResult,
    total: ({ total, perPage }) => {
      const lastPage = Math.ceil((total || 0) / perPage);
      if (lastPage > 100) {
        return 100;
      }
      return lastPage;
    },
    viewDetail: (state) => state.currentPackage,
  },
  mutations: {
    SET_LIST(state, payload) {
      state.listResult = payload;
    },
    SET_TOTAL(state, payload) {
      state.total = payload;
    },
    SET_SEARCH(state, payload) {
      state.total = payload;
    },
    SET_CURRENT_PACKAGE(state, payload) {
      state.currentPackage = payload;
    },
  },
  actions: {
    async search({ commit }, { text = "", page = 1, reset = false }) {
      if (reset) {
        searchCache.clear();
      }

      const searchKey = `${text}@${page}`;
      const cached = searchCache.get(searchKey);
      if (cached) {
        commit("SET_LIST", cached);
        return;
      }
      const from = (page - 1) * PACKAGES_PER_PAGE;
      const searchResult = await npmApi.get("/-/v1/search", {
        text,
        size: PACKAGES_PER_PAGE,
        from,
      });
      const searchResults = await searchResult.objects.reduce(
        (result, item) => {
          return result.concat(item.package);
        },
        []
      );
      commit("SET_LIST", searchResults);
      commit("SET_TOTAL", searchResult.total);
      searchCache.set(searchKey, searchResults);
    },

    async fetchPackage(
      { commit },
      { name, version, description, links, author }
    ) {
      const packageKey = `${name}@${version}`;

      const cached = packageCache.get(packageKey);
      if (cached) {
        commit("SET_CURRENT_PACKAGE", cached);
        return;
      }

      try {
        const promises = [
          jsDelivrApi.get(`/package/npm/${name}`),
          jsDelivrApi.get(`/package/npm/${name}@${version}`),
          jsDelivrApi.get(`/package/npm/${name}/stats`),
        ];
        const result = await Promise.all(promises);
        const packageData = {
          name,
          version,
          versionsData: result[0],
          filesData: result[1],
          statsData: result[2],
          badge: `https://data.jsdelivr.com/v1/package/npm/${name}/badge`,
        };
        await commit("SET_CURRENT_PACKAGE", {
          packageData,
          description,
          links,
          author,
        });
        packageCache.set(packageKey, packageData);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
