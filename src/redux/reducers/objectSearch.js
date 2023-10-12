import { SET_OBJECT_SEARCH } from "../../constants";

const initialState = {
  isQuerySearch: false,
  searchData: [],
};

const objectSearchState = (state = initialState, action) => {
  switch (action.type) {
    case SET_OBJECT_SEARCH:
      const plugState = [
        {
          data: [
            {
              date: "2023-09-27T10:15:14.524Z",
              value: 5
            },
            {
              date: "2023-09-28T10:15:14.524Z",
              value: 3
            },
            {
              date: "2023-09-29T10:15:14.524Z",
              value: 10
            },
            {
              date: "2023-09-30T10:15:14.524Z",
              value: 10
            },
            {
              date: "2023-10-01T10:15:14.524Z",
              value: 17
            },
            {
              date: "2023-10-02T10:15:14.524Z",
              value: 7
            },
            {
              date: "2023-10-03T10:15:14.524Z",
              value: 2
            },

            {
              date: "2023-10-04T10:15:14.524Z",
              value: 2
            },
            {
              date: "2023-10-05T10:15:14.524Z",
              value: 2
            },
            {
              date: "2023-10-06T10:15:14.524Z",
              value: 2
            }
          ],
          histogramType: "totalDocuments"
        },
      ];

      return {
        ...state,
        searchData: action.payload.data.length === 0 ? plugState : action.payload,
        isQuerySearch: true,
      };

    default:
      return state;
  }
};

export default objectSearchState;
