import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Teste o App', () => {
  test('Teste Home', () => {
    render(<App />);
    screen.logTestingPlaygroundURL();
    const inputSearch = screen.getByPlaceholderText(/search/i)
    expect(inputSearch).toBeInTheDocument()
  });
})
