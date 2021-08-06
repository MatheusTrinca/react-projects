import React, { useContext, useEffect, useReducer } from 'react';

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';
import reducer from './reducer';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
  isLoading: false,
  hits: [],
  page: 0,
  nbPages: 0,
  query: 'react',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async url => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: SET_STORIES,
        payload: { isLoading: false, hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeStory = id => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  const handleSearch = query => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  const handlePage = type => {
    dispatch({ type: HANDLE_PAGE, payload: type });
  };

  const { query, page } = state;

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${query}&page=${page}`);
  }, [query, page]);

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
