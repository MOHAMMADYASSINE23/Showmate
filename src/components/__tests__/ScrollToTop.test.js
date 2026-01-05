import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from '../ScrollToTop';

// Mock window methods
const mockScrollTo = jest.fn();
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
  writable: true,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true,
});

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ScrollToTop Component', () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
    mockAddEventListener.mockClear();
    mockRemoveEventListener.mockClear();
  });

  test('does not render button initially', () => {
    renderWithRouter(<ScrollToTop />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('renders button when scrolled down', () => {
    // Mock scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      writable: true,
    });

    renderWithRouter(<ScrollToTop />);

    // Simulate scroll event
    const scrollHandler = mockAddEventListener.mock.calls.find(call => call[0] === 'scroll')[1];
    act(() => {
      scrollHandler();
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('scrolls to top when button is clicked', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      writable: true,
    });

    renderWithRouter(<ScrollToTop />);

    const scrollHandler = mockAddEventListener.mock.calls.find(call => call[0] === 'scroll')[1];
    act(() => {
      scrollHandler();
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});