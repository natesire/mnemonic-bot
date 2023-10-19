import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Anagram } from './Anagram';

it('new .Anagram', () => {
  let anagram = new Anagram();
  expect(anagram.anagramMap.has('ags')).toBe(true);
});

it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/react/i);
  expect(linkElement).toBeInTheDocument();
});

it('renders search for anagrams', () => {
  render(<App />);
  const searchBtn = screen.getByText('Search');
  fireEvent.click(searchBtn);
});

it('renders search results for anagrams', () => {
  render(<App />);
  const searchBtn = screen.getByText('Search');
  fireEvent.click(searchBtn);
});

it('gets map', () => {
  let anagram = new Anagram();
  expect(anagram.anagramMap.get("ags")).toMatch('gas,');
});

it('searches for anagrams', () => {
  let anagram = new Anagram();
  let search = anagram.search('dusty');
  expect(search).toBe('dusty, study');
});

it('searches for unknown anagrams', () => {
  let anagram = new Anagram();
  let search = anagram.search('abcd');
  expect(search).toMatch(/found/i);
});