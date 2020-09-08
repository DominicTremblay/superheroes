import React, { useState, useEffect, useContext } from 'react';
import useSearch from './hooks/useSearch';
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import './Search.scss';
import { ADD_SUPERHERO } from './reducers/dataReducer';
import DispatchContext from './DispatchContext';

export default function Search() {
  const [searchContent, setSearchContent] = useState('');

  const dispatch = useContext(DispatchContext);

  const history = useHistory();

  const { path } = useRouteMatch();

  const { search } = useLocation();
  const { name } = queryString.parse(search);

  const SearchResult = ({ name }) => {
    const { heroDetails, loading, error } = useSearch(name);

    return (
      <div>
        <h3>Search for: {name}</h3>
        {loading && <p>loading...</p>}
        {heroDetails && (
          <div className="search-result">
            <ul>
              {heroDetails.results.map((hero) => (
                <li key={hero.id}>
                  {hero.name}{' '}
                  <button
                    onClick={() =>
                      dispatch({ type: ADD_SUPERHERO, superhero: hero })
                    }
                  >
                    Add to List
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`${path}?name=${searchContent}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="search"
          value={searchContent}
          onChange={(event) => setSearchContent(event.target.value)}
        />

        <input type="submit" value="Search" />
      </form>

      {name && <SearchResult name={name} />}
    </>
  );
}
