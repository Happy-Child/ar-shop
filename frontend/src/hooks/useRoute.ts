import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

function getParsedQuery(queryString: string): { [key: string]: string } {
  const urlState = new URLSearchParams(queryString);
  const newQuery: { [key: string]: string } = {};

  urlState.forEach((value, key) => {
    if (!newQuery.hasOwnProperty(key)) {
      newQuery[key] = value;
    }
  });

  return newQuery;
}

const useRoute = () => {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const [queryObject, setQueryObject] = React.useState<{ [key: string]: string }>(getParsedQuery(search));

  const pushRoute = React.useCallback((pathname: string, newQuery: { [key: string]: any } = {}): void => {
    const query: { [key: string]: string } = { ...queryObject, ...newQuery };
    setQueryObject(query);

    let resultQuery = '';

    if (Object.keys(query).length) {
      resultQuery = `?${qs.stringify(query)}`;
    }

    history.push(`${pathname}${resultQuery}`);
  }, []);

  React.useEffect(() => {
    setQueryObject(getParsedQuery(search));
  }, [search]);

  return {
    pathname,
    search,
    queryObject,
    pushRoute,
  };
};

export { useRoute };
