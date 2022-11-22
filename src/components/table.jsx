import React, { useState, useContext, useEffect } from 'react';
import ContextWars from '../context/ContextWars';

function Table() {
  const [search, setSearch] = useState('');
  const { data } = useContext(ContextWars);
  const [resultSearch, setResultSearch] = useState([]);

  useEffect(() => {
    const resultFilterSearch = data.filter((elePlanet) => elePlanet.name.toLowerCase()
      .includes(search.toLowerCase()));
    setResultSearch(resultFilterSearch);
  }, [data, search]);
  return (
    <div>
      <form>
        <input
          data-testid="name-filter"
          type="text"
          id="search"
          placeholder="Search"
          onChange={ ({ target }) => setSearch(target.value) }
        />
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gavity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>FIlmes</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            resultSearch.map((item) => (
              <tr key={ item.name }>
                <td>{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>
                  {item.films
                    .map((film, index) => <p key={ `${film}-${index}` }>{film}</p>)}
                </td>
                <td>{item.name}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
