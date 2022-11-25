import React, { useState, useContext, useEffect } from 'react';
import ContextWars from '../context/ContextWars';

function Table() {
  const [search, setSearch] = useState('');
  const { data } = useContext(ContextWars);
  const [resultSearch, setResultSearch] = useState([]);
  const [inputsFilter, setInputsFilter] = useState({
    column: 'population',
    operator: 'maior que',
    number: 0,
  });
  const [column, setColumn] = useState(['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const optionsColumn = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [stateAtt, setStateAtt] = useState(0);

  useEffect(() => {
    setResultSearch(data);
  }, [data]);
  const handleChange = ({ target }) => {
    setInputsFilter({
      ...inputsFilter,
      [target.name]: target.value,
    });
  };
  // const filterColumn = () => {

  // };

  const handleClick = () => {
    setFilterByNumericValues([...filterByNumericValues, inputsFilter]);
    setColumn(column.filter((el) => el !== inputsFilter.column));
  };

  const removeFilter = (item) => {
    setResultSearch(data);
    const filterDelet = filterByNumericValues.filter((ele) => ele.column !== item.column);
    console.log(filterDelet);
    const restoreOptions = optionsColumn.filter((el) => el === item.column);
    setFilterByNumericValues(filterDelet);
    setColumn([...column, restoreOptions]);
    setStateAtt(stateAtt + 1);
  };

  useEffect(() => {
    const resultFilterSearch = data.filter((elePlanet) => elePlanet.name.toLowerCase()
      .includes(search.toLowerCase()));
    setResultSearch(resultFilterSearch);
    filterByNumericValues.forEach((item) => {
      switch (item.operator) {
      case 'maior que':
        return setResultSearch(resultSearch
          .filter((el) => +el[item.column] > +item.number));
      case 'menor que':
        return setResultSearch(resultSearch
          .filter((el) => +el[item.column] < +item.number));
      case 'igual a':
        return setResultSearch(resultSearch
          .filter((el) => +el[item.column] === +item.number));
      default:
        break;
      }
    });
  }, [data, search, filterByNumericValues, stateAtt]);

  useEffect(() => {
    setInputsFilter({
      ...inputsFilter,
      column: column[0],
    });
  }, [column]);

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setColumn(optionsColumn);
  };

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
        <label htmlFor="column">
          Coluna
          <select
            data-testid="column-filter"
            id="column"
            value={ inputsFilter.column }
            onChange={ handleChange }
            name="column"
          >
            {column.map((el, index) => (
              <option key={ index }>{el}</option>
            ))}
          </select>
        </label>
        <label htmlFor="operator">
          <select
            data-testid="comparison-filter"
            id="operator"
            value={ inputsFilter.operator }
            onChange={ handleChange }
            name="operator"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          data-testid="value-filter"
          type="number"
          name="number"
          value={ inputsFilter.number }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar

        </button>
      </form>
      <div>
        {filterByNumericValues.map((ele, index) => (
          <div
            key={ index }
            data-testid="filter"
          >
            {`${ele.column} ${ele.operator} ${ele.number}`}
            <button
              type="button"
              onClick={ () => removeFilter(ele) }
            >
              X
            </button>
          </div>
        ))}
        <div>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ removeAllFilters }
          >
            Remove All Filter
          </button>
        </div>
      </div>
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
