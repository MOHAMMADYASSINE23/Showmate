import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Header';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>{component}</BrowserRouter>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    mockNavigate.mockClear();
  });

  test('renders logo and navigation links', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Showmate')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByText('Top Rated')).toBeInTheDocument();
    expect(screen.getByText('Upcoming')).toBeInTheDocument();
  });

  test('toggles dark mode', () => {
    renderWithRouter(<Header />);
    const toggleButton = screen.getByRole('button', { name: '' }); // The dark mode button has no name
    fireEvent.click(toggleButton);
    expect(document.documentElement).toHaveClass('dark');
    fireEvent.click(toggleButton);
    expect(document.documentElement).not.toHaveClass('dark');
  });

  test('submits search form and navigates', () => {
    renderWithRouter(<Header />);
    const toggleButton = screen.getByTestId('mobile-search-toggle');
    fireEvent.click(toggleButton);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test movie' } });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/search?q=test%20movie');
  });

  test('does not navigate on empty search', () => {
    renderWithRouter(<Header />);
    const submitButton = screen.getAllByRole('button', { name: 'Search' })[0];
    fireEvent.click(submitButton);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});