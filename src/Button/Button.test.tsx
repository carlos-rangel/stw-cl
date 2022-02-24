import React from 'react';
import { render } from '@testing-library/react';

import Button from './index';

describe('Button Component', () => {
  it('renders a className', () => {
    const { container } = render(
      <Button className="test-class-name">Click Me</Button>,
    );
    expect(container.querySelector('.btn')?.classList).toContain('test-class-name')
  })
});
