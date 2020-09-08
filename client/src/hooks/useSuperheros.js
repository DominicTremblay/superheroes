import { useState, useEffect, useReducer } from 'react';
import dataReducer, { ADD_SUPERHERO } from '../reducers/dataReducer';

import axios from 'axios';

const baseUrl = `/api/${process.env.REACT_APP_API_TOKEN}/`;

const useSuperheros = () => {
  const [superherosIds, setSuperherosIds] = useState([25,50,115,213, 214, 216,230,240,250,260,270,280,300,340,360]);
  const [state, dispatch] = useReducer(dataReducer, {
    superheros: [],
    loading: true,
  });

  const promises = superherosIds.map((id) =>
    axios({ method: 'GET', url: `${baseUrl}/${id}` })
  );

  useEffect(() => {
    Promise.all(promises)
      .then((result) => {
        result.forEach(({ data: superhero }) =>
          dispatch({type: ADD_SUPERHERO, superhero})
        );
      })
      .catch((err) => console.log(err.message));
  }, []);

  return { state, dispatch };
};

export default useSuperheros;
