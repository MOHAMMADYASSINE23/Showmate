import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Cards } from '../Cards';

const mockMovie = {
  id: 1,
  original_title: 'Test Movie',
  overview: 'This is a test movie overview.',
  poster_path: '/testposter.jpg'
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Cards Component', () => {
  test('renders movie title', () => {
    renderWithRouter(<Cards movie={mockMovie} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  test('renders movie overview', () => {
    renderWithRouter(<Cards movie={mockMovie} />);
    expect(screen.getByText('This is a test movie overview.')).toBeInTheDocument();
  });

  test('renders movie poster image', () => {
    renderWithRouter(<Cards movie={mockMovie} />);
    const image = screen.getByAltText('');
    expect(image).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500//testposter.jpg');
  });

  test('renders backup image when poster_path is null', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    renderWithRouter(<Cards movie={movieWithoutPoster} />);
    const image = screen.getByAltText('');
    expect(image).toHaveAttribute('src', expect.stringContaining('backup.png'));
  });

  test('links to correct movie detail page', () => {
    renderWithRouter(<Cards movie={mockMovie} />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/movie/1');
    expect(links[1]).toHaveAttribute('href', '/movie/1');
  });
});