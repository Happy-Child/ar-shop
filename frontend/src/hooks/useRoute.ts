import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

const useRoute = () => {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const [queryObject, setQueryObject] = React.useState<{ [key: string]: string }>({});

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
    const urlState = new URLSearchParams(search);
    const newQuery: { [key: string]: string } = {};

    urlState.forEach((value, key) => {
      if (!newQuery.hasOwnProperty(key)) {
        newQuery[key] = value;
      }
    });

    setQueryObject(newQuery);
  }, [search]);

  return {
    pathname,
    search,
    queryObject,
    pushRoute,
  };
};

export { useRoute };
