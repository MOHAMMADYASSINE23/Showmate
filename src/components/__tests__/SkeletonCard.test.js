import { render, screen } from '@testing-library/react';

import { SkeletonCard } from '../SkeletonCard';

describe('SkeletonCard Component', () => {
  test('renders skeleton structure', () => {
    render(<SkeletonCard />);
    // Check for the main container with animate-pulse
    const container = screen.getByTestId('skeleton-card');
    expect(container).toHaveClass('animate-pulse');
  });
});