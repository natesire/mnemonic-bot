import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Anagram } from './Anagram';

test('anagram', () => {
  let anagram = new Anagram();
  expect(anagram.anagramMap.has('ags')).toBe(true);
});

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
