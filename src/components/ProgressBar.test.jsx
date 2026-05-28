import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('renders the "Question N of M" label inline with the bar', () => {
    render(<ProgressBar current={2} total={5} />);

    const textElement = screen.getByText(/Question 2 of 5/i);
    expect(textElement).toBeInTheDocument();
  });

  it('does not render a numeric percentage label', () => {
    render(<ProgressBar current={2} total={5} />);

    expect(screen.queryByText('40%')).toBeNull();
  });
});
