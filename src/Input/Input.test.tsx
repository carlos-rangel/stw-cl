import React from 'react';
import { render, screen } from '@testing-library/react';

import Input from './index';

describe('Input Component', () => {
  it('renders a className', () => {
    render(
      <Input className="test-class-name" value='Click Me' />
    );
    const input = screen.getByRole('textbox')
    expect(input?.classList).toContain('test-class-name')
  })
});
