import instance from "./interceptor/interceptor";

import { API_URL, LOGIN, INFO, SEARCH_HISTOGRAM, SEARCH } from "../constants";

// API
export const appAPI = {
  async authenticate(authData) {
    try {
      return await instance.post(`${API_URL}/${LOGIN}`, authData);
    } catch (err) {
      console.warn("Authenticated error", err);
      return err.response.status
    }
  },
  async getAccInfo() {
    try {
      return await instance.get(`${API_URL}/${INFO}`);
    } catch (err) {
      console.warn("Fetch accaunt info is failed", err);
    }
  },
  async fetchObjectSearch(searchData) {
    try {
      return await instance.post(`${API_URL}/${SEARCH_HISTOGRAM}`, searchData)
    } catch (error) {
      console.warn("Fetch object search error", error)
    }
  },
  async fetchObject(searchData) {
    const searchRequestObj = {
      limit: searchData.limit,
      sortType: searchData.sortType,
      sortDirectionType: searchData.sortDirectionType,
      dedupClusterId: "string",
      issueDateInterval: {
        startDate: searchData.issueDateInterval.startDate,
        endDate: searchData.issueDateInterval.endDate
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              sparkId: null,
              entityId: null,
              inn: searchData.searchContext.targetSearchEntitiesContext.targetSearchEntities[0].inn,
              maxFullness: searchData.searchContext.targetSearchEntitiesContext.targetSearchEntities[0].maxFullness,
              inBusinessNews: searchData.searchContext.targetSearchEntitiesContext.targetSearchEntities[0].excludeTechNews
            }
          ],
          onlyMainRole: searchData.searchContext.targetSearchEntitiesContext.onlyMainRole,
          tonality: "any",
          onlyWithRiskFactors: searchData.searchContext.targetSearchEntitiesContext.onlyWithRiskFactors,
          riskFactors: {
            and: [
              {
                id: 0
              }
            ],
            or: [
              {
                id: 0
              }
            ],
            not: [
              {
                id: 0
              }
            ]
          },
          themes: {
            and: [
              {
                tonality: "any",
                entityId: 0
              }
            ],
            or: [
              {
                tonality: "any",
                entityId: 0
              }
            ],
            not: [
              {
                tonality: "any",
                entityId: 0
              }
            ]
          }
        },
        searchEntitiesFilter: {
          and: [
            {
              type: "company"
            }
          ],
          or: [
            {
              type: "company"
            }
          ],
          not: [
            {
              type: "company"
            }
          ]
        },
        locationsFilter: {
          and: [
            {
              countryCode: "string",
              regionCode: 0
            }
          ],
          or: [
            {
              countryCode: "string",
              regionCode: 0
            }
          ],
          not: [
            {
              countryCode: "string",
              regionCode: 0
            }
          ]
        },
        themesFilter: {
          and: [
            {
              entityId: 0
            }
          ],
          or: [
            {
              entityId: 0
            }
          ],
          not: [
            {
              entityId: 0
            }
          ]
        }
      },
      searchArea: {
        includedSources: [
          0
        ],
        excludedSources: [
          0
        ],
        includedSourceGroups: [
          0
        ],
        excludedSourceGroups: [
          0
        ]
      },
      attributeFilters: {
        excludeTechNews: searchData.attributeFilters.excludeTechNews,
        excludeAnnouncements: searchData.attributeFilters.excludeAnnouncements,
        excludeDigests: searchData.attributeFilters.excludeDigests
      },
      similarMode: "none"
    }
    try {
      return await instance.post(`${API_URL}/${SEARCH}`, searchRequestObj)
    } catch (error) {
      console.warn("Fetch object search error", error)
    }
  }
};
