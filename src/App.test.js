import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders search for anagrams', () => {
  render(<App />);
  const button = screen.getByText('Search');

  // Simulate a button click
  fireEvent.click(button);
});
