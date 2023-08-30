import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders when "on" prop is true', () => {
    render(<Spinner on={true} />);
    const spinnerElement = screen.queryByText('Please wait...');
    expect(spinnerElement).tobeTruthy
  });

  it('does not render when "on" prop is false', () => {
    render(<Spinner on={false} />);
    const spinnerElement = screen.queryByText('Please wait...');
    expect(spinnerElement).toBeFalsy
  });
});
