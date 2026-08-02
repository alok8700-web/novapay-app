import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Auth } from './main.jsx';

test('renders NovaPay login', () => {
  render(<Auth onAuthed={() => {}} />);
  expect(screen.getByRole('heading', { name: 'NovaPay' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
});
