# PassaTap - Estrutura de Código

Esta é a estrutura organizacional do código fonte do PassaTap, seguindo as melhores práticas de arquitetura para aplicações React Native empresariais.

## 📁 Estrutura de Diretórios

```
src/
├── assets/                 # Recursos estáticos (imagens, ícones, etc.)
├── components/            # Componentes reutilizáveis
│   ├── common/           # Componentes comuns
│   │   ├── layout/       # Componentes de layout
│   │   └── navigation/   # Componentes de navegação
│   ├── forms/            # Componentes de formulários
│   └── ui/               # Componentes de interface
├── config/               # Configurações da aplicação
├── features/             # Funcionalidades organizadas por domínio
│   ├── auth/            # Autenticação e onboarding
│   ├── business/        # Funcionalidades de negócio
│   ├── dashboard/       # Dashboard individual
│   └── profile/         # Perfil do usuário
├── hooks/               # Hooks personalizados
├── services/            # Serviços e APIs
├── store/              # Gerenciamento de estado
├── types/              # Definições de tipos TypeScript
└── utils/              # Utilitários e funções auxiliares
```

## 🏗️ Arquitetura

### Features (Funcionalidades)
Cada funcionalidade é organizada em seu próprio diretório contendo:
- `screens/` - Telas da funcionalidade
- `components/` - Componentes específicos da funcionalidade
- `services/` - Serviços específicos da funcionalidade
- `types/` - Tipos específicos da funcionalidade
- `hooks/` - Hooks específicos da funcionalidade

### Componentes
- **UI**: Componentes básicos de interface (Button, Input, etc.)
- **Forms**: Componentes específicos para formulários
- **Common**: Componentes compartilhados (Layout, Navigation)

### Configuração
- **colors.ts**: Paleta de cores e temas
- **styles.ts**: Estilos globais e utilitários
- **constants.ts**: Constantes da aplicação

### Utilitários
- **validation.ts**: Funções de validação
- **formatting.ts**: Formatação de dados
- **storage.ts**: Gerenciamento de armazenamento local
- **helpers.ts**: Funções auxiliares

### Hooks
- **useAuth**: Gerenciamento de autenticação
- **useStorage**: Armazenamento local
- **useDebounce**: Debounce para inputs
- **useAsync**: Operações assíncronas

## 📋 Convenções

### Nomenclatura
- **Arquivos**: PascalCase para componentes, camelCase para utilitários
- **Diretórios**: lowercase com hífens se necessário
- **Variáveis**: camelCase
- **Constantes**: UPPER_SNAKE_CASE

### Imports
```typescript
// Importações relativas para arquivos próximos
import { Button } from '../components/ui';

// Importações absolutas para arquivos distantes
import { colors } from '@/config';
import { useAuth } from '@/hooks';
```

### Estrutura de Componentes
```typescript
// 1. Imports externos
import React from 'react';
import { View, Text } from 'react-native';

// 2. Imports internos
import { colors } from '@/config';
import { Button } from '@/components';

// 3. Tipos
interface Props {
  // ...
}

// 4. Componente
export const MyComponent: React.FC<Props> = ({ ... }) => {
  // ...
};

// 5. Estilos
const styles = StyleSheet.create({
  // ...
});
```

## 🚀 Benefícios

1. **Escalabilidade**: Estrutura preparada para crescimento
2. **Manutenibilidade**: Código organizado e fácil de encontrar
3. **Reutilização**: Componentes e utilitários bem estruturados
4. **Testabilidade**: Separação clara de responsabilidades
5. **Colaboração**: Estrutura padronizada para equipes

## 📚 Próximos Passos

1. Implementar gerenciamento de estado (Redux/Zustand)
2. Adicionar testes unitários
3. Configurar CI/CD
4. Implementar logging e analytics
5. Adicionar documentação de API
