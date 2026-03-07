import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageGallery from '../ImageGallery';

describe('ImageGallery', () => {
  test('renders image using mocked asset path', () => {
    render(<ImageGallery title="Gallery" />);
    const img = screen.getByAltText('logo');
    expect(img).toBeInTheDocument();
    const src = img.getAttribute('src');
    expect(src).toBeTruthy();
    // Depending on your Jest transformer the import may be mapped to a stub
    // or to a generated path; assert we get a usable string src.
    expect(typeof src).toBe('string');
  });
});
