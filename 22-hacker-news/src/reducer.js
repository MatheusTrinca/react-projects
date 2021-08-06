import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_STORIES:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter(story => story.objectID !== action.payload),
      };
    case HANDLE_SEARCH: {
      return {
        ...state,
        query: action.payload,
        page: 0,
      };
    }
    case HANDLE_PAGE: {
      let page;
      if (action.payload === 'prev') {
        page = state.page - 1;
        page = page < 0 ? state.nbPages - 1 : page;
      } else {
        page = state.page + 1;
        page = page > state.nbPages - 1 ? 0 : page;
      }
      return {
        ...state,
        page: page,
      };
    }
    default:
      throw new Error(`Invalid "${action.type} action type"`);
  }
};
export default reducer;
