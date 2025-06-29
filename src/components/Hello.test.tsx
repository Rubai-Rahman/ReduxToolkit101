import { render, screen } from '@testing-library/react';

function Hello() {
  return <h1>Hello World</h1>;
}

describe('Hello component', () => {
  it('render correctly with snapshot', () => {
    render(<Hello />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
