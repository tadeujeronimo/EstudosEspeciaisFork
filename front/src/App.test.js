import { render, screen } from '@testing-library/react';
import App from './App';

test('renders café gourmet title', () => {
  render(<App />);
  const elements = screen.getAllByText(/café gourmet/i);
  expect(elements[0]).toBeInTheDocument();
});
