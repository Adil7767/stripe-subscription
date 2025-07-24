import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Stripe Subscription Demo title and subscribe button', () => {
  render(<App />);
  expect(screen.getByText(/Stripe Subscription Demo/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /subscribe for \$5\/month/i })).toBeInTheDocument();
});
