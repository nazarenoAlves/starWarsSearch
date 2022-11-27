import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import mockData from './mock';
import userEvent from '@testing-library/user-event';


describe('Teste o App', () => {
  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData)
  }))
  test('Teste Home', () => {

    render(<App />);
    screen.logTestingPlaygroundURL();
    const inputSearch = screen.getByPlaceholderText(/search/i)
    expect(inputSearch).toBeInTheDocument()
    const columnFilter = screen.getByRole('combobox', {
      name: /coluna/i
    })
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
    const filteButton = screen.getByRole('button', {
      name: /filtrar/i
    })
    userEvent.click(filteButton)
    const tatoo = await screen.findByText(/10465/i)
    expect(tatoo).toBeInTheDocument()
  })
  test('Teste se o filtro tras os planetas com sufarce-water menor que 40', async () => {
    render(<App />)
    const select = screen.getByTestId('comparison-filter');
    fireEvent.change(select, {
      target: { value: 'menor que' }
    })
    const select2 = screen.getByTestId('column-filter');
    fireEvent.change(select, {
      target: { value: 'surface_water' }
    })
    const valueInput = screen.getByTestId('value-filter')
    userEvent.clear(valueInput)
    userEvent.type(valueInput, '40')
    const filteButton = screen.getByRole('button', {
      name: /filtrar/i
    })
    userEvent.click(filteButton)
    const bespin = await screen.findByText(/118000/i)
    expect(bespin).toBeInTheDocument()
  })

})
