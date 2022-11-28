import React from 'react';
import { render, screen, fireEvent, waitFor, getByText, findByText, findByTestId } from '@testing-library/react';
import App from '../App';
import mockData from './mock';
import userEvent from '@testing-library/user-event';

describe('Teste se os componentes estão sendo redenizados', () => {
  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData)
  }))
  test('Teste Home', () => {

    render(<App />);
    const inputSearch = screen.getByPlaceholderText(/search/i)
    expect(inputSearch).toBeInTheDocument()
    const columnFilter = screen.getByDisplayValue(/population/i)
    expect(columnFilter).toBeInTheDocument()
    const compMaior = screen.getByDisplayValue(/maior que/i)
    expect(compMaior).toBeInTheDocument()
    const filteButton = screen.getByRole('button', {
      name: /filtrar/i
    })
    expect(filteButton).toBeInTheDocument()
    const removeAllBtn = screen.getByRole('button', {
      name: /remove all filter/i
    })
    expect(removeAllBtn).toBeInTheDocument()
  });
  test('Teste Table', () => {
    render(<App />);
    const columnName = screen.getByRole('columnheader', {
      name: /name/i
    })
    expect(columnName).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
  test('Teste se Aplicação ta buscando por nome', async () => {
    render(<App />);
    const search = screen.getByPlaceholderText(/search/i)
    userEvent.type(search, 'tatooine')
    const filteButton = screen.getByRole('button', {
      name: /filtrar/i
    })
    userEvent.click(filteButton)
    const filter = screen.getByText('population maior que 0')
    expect(filter).toBeInTheDocument()
    const btnDelete = screen.getByRole('button', {
      name: /x/i
    })
    expect(btnDelete).toBeInTheDocument()
  })
  test('Teste se tabela ta sendo redenizada', async () => {
    render(<App />);
    const tatooine = await screen.findByText(/304/i)
    expect(tatooine).toBeInTheDocument()
    const input = screen.getByPlaceholderText(/search/i)
    userEvent.type(input, 'Tatooine')
    // const filteButton = screen.getByRole('button', {
    //   name: /filtrar/i
    // })
    // userEvent.click(filteButton)
    const tatoo = await screen.findByText(/10465/i)
    expect(tatoo).toBeInTheDocument()

  })
  test('Testa surface water igual a 12', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />)
    await screen.findByText('Tatooine')
    const select = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(select, ['igual a'])

    const select2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(select2, ['surface_water'])

    const valueInput = screen.getByTestId('value-filter')
    // userEvent.clear(valueInput)
    userEvent.type(valueInput, '12')
    const buttonFilter = screen.getByTestId("button-filter")
    userEvent.click(buttonFilter)
    screen.logTestingPlaygroundURL();
    expect(await screen.findByText('Naboo')).toBeInTheDocument()
  })
  test('Testa Surface water menor que 2', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />)
    await screen.findByText('Tatooine')
    const select = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(select, ['menor que'])

    const select2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(select2, ['surface_water'])

    const valueInput = screen.getByTestId('value-filter')
    // userEvent.clear(valueInput)
    userEvent.type(valueInput, '2')
    const buttonFilter = screen.getByTestId("button-filter")
    userEvent.click(buttonFilter)
    screen.logTestingPlaygroundURL();
    expect(await screen.findByText('Bespin')).toBeInTheDocument()
  })

  test('Testa population maior que 4500000000', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<App />)
    await screen.findByText('Tatooine')
    const select = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(select, ['maior que'])

    const select2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(select2, ['population'])

    const valueInput = screen.getByTestId('value-filter')
    // userEvent.clear(valueInput)
    userEvent.type(valueInput, '4500000000')
    const buttonFilter = screen.getByTestId("button-filter")
    userEvent.click(buttonFilter)
    screen.logTestingPlaygroundURL();
    expect(await screen.findByText('Coruscant')).toBeInTheDocument()
  })
})
