import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import ContextWars from './ContextWars';
import fetchApi from '../services/fetchApi';

function ContextWarsProvider({ children }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchWars() {
      setData(await fetchApi());
    }
    fetchWars();
  }, []);

  const value = useMemo(() => ({
    data,
  }), [data]);
  return (
    <ContextWars.Provider value={ value }>
      {children}
    </ContextWars.Provider>
  );
}

ContextWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextWarsProvider;
