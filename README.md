# Projeto

## useProducts Hook

`useProducts` é um hook customizado em React que facilita a busca de produtos a partir de uma API. Este hook pode ser reutilizado em qualquer componente para obter a lista de produtos.

### Instalação

1. Certifique-se de que seu projeto está configurado com React.
2. Adicione o arquivo `useProducts.js` ao seu projeto.

### Exemplo de `useProducts.js`

```javascript
import { useState, useEffect } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return { products };
};

export default useProducts;
```

## useDeals Hook

`useDeals` é um hook customizado em React que facilita a busca de ofertas a partir de uma API. Este hook pode ser reutilizado em qualquer componente para obter a lista de ofertas disponíveis.

### Instalação

1. Certifique-se de que seu projeto está configurado com React.
2. Crie um arquivo `useDeals.js` ou similar e adicione o código abaixo:

### Exemplo de `useDeals.js`

```javascript
import { useState, useEffect } from "react";

const useDeals = () => {
  const [deals, setDeals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/ofertas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDeals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching deals:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { deals, loading, error };
};

export default useDeals;
```

## Testes dos Componentes

### `Image` Component

O componente `Image` tem os seguintes testes:

```tsx
// src/components/Image/Image.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Image from './Image';

// Teste de Snapshot
it('deve corresponder ao snapshot', () => {
  const { asFragment } = render(<Image src="image.jpg" alt="Test Image" />);
  expect(asFragment()).toMatchSnapshot();
});

// Teste do Caminho Feliz
it('deve renderizar a imagem corretamente', () => {
  render(<Image src="image.jpg" alt="Test Image" />);
  const img = screen.getByAltText('Test Image');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'image.jpg');
});

// Teste quando `src` está ausente
it('deve renderizar a imagem, mas sem o src se src estiver ausente', () => {
  render(<Image alt="Test Image" />);
  const img = screen.getByAltText('Test Image');
  expect(img).toBeInTheDocument();
  expect(img).not.toHaveAttribute('src');
});

// Teste quando `alt` está ausente
it('deve renderizar a imagem, mas sem alt se alt estiver ausente', () => {
  render(<Image src="image.jpg" />);
  const img = screen.getByRole('img');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'image.jpg');
  expect(img).not.toHaveAttribute('alt');
});

// Teste de Comportamento com `className`
it('deve aplicar a className corretamente', () => {
  render(<Image src="image.jpg" alt="Test Image" className="test-class" />);
  const img = screen.getByAltText('Test Image');
  expect(img).toHaveClass('test-class');
});
```

### Critérios de Aceitação

- **Testes bem escritos e descritivos**: Descrições claras e informativas para cada teste.
- **Testes do "caminho feliz"**: Garantia de que o componente funciona como esperado na situação ideal.
- **Testes que resultam em erros**: Verificação de como o componente se comporta em situações de erro.
- **Testes de Snapshot**: Registro e comparação de snapshots para garantir que o componente não tenha alterações inesperadas.
- **Testes de Comportamento**: Verificação de comportamentos específicos do componente.
- **Testes com `useEffect`**: Garantia de que não há problemas com testes que envolvem o hook `useEffect`.

