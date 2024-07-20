import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Container from './Container';

it('deve corresponder ao snapshot padrão', () => {
    const { asFragment } = render(<Container>Default Container</Container>);
    expect(asFragment()).toMatchSnapshot();
});

it('deve corresponder ao snapshot com classes personalizadas', () => {
    const { asFragment } = render(<Container className="custom-class">Custom Class Container</Container>);
    expect(asFragment()).toMatchSnapshot();
});

it('deve renderizar corretamente com o texto dado', () => {
    render(<Container>Test Container</Container>);
    expect(screen.getByText('Test Container')).toBeInTheDocument();
});

it('deve aplicar classes personalizadas corretamente', () => {
    render(<Container className="custom-class">Custom Class Container</Container>);
    expect(screen.getByText('Custom Class Container')).toHaveClass('custom-class');
});

it('deve aplicar o ID corretamente', () => {
    render(<Container id="custom-id" data-testid="container-with-id">Container with ID</Container>);
    const containerElement = screen.getByTestId('container-with-id');
    expect(containerElement).toHaveAttribute('id', 'custom-id');
});

it('deve renderizar sem lançar erros', () => {
    render(<Container>Empty Container</Container>);
    expect(screen.getByText('Empty Container')).toBeInTheDocument();
});
