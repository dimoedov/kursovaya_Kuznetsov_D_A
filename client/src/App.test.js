import React from 'react';
import { render } from '@testing-library/react';
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";

test('renders learn react link', () => {
  const { getByText } = render(<Auth />);
  const linkElement = getByText(/Email address/i);
  expect(linkElement).toBeInTheDocument();
});
