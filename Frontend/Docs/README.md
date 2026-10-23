# Pague Menos Acessível · Front-End Desktop

Front-end desenvolvido com foco em acessibilidade e meta de verificação **WCAG 2.2 nível AA**, baseado no design do Figma (**Pague Menos Acessível**, tela Desktop — Principal). A conformidade integral depende de auditoria e testes manuais. Consulte [ACESSIBILIDADE.md](ACESSIBILIDADE.md) para recursos, critérios, evidências e verificações pendentes.

---

## Design System e Tokens Extraídos do Figma
- **Azul de Identidade**: `#1427A0`
- **Azul Escuro Acessível**: `#102B73`
- **Azul de Ação**: `#0F5CC0`
- **Vermelho de Destaque**: `#D63B4D`
- **Texto Principal**: `#1F2A37`
- **Texto Auxiliar**: `#5B6B7F`
- **Fundo da Página**: `#F5F5F5`
- **Superfície dos Cards**: `#FFFFFF`
- **Borda**: `#E5E7EB`
- **Azul Suave**: `#EAF3FF`

---

## Recursos de Acessibilidade Implementados

1. **Ajuste Dinâmico de Tamanho de Texto (`A-` / `A+`)**:
   - Controle direto no banner principal e na Central de Acessibilidade.
   - Ajusta a raiz `rem` proporcionalmente em toda a interface sem quebrar o layout.
2. **Modo Alto Contraste**:
   - Alternância em tempo real para a paleta de fundo azul marinho e texto marfim. O contraste deve ser validado na auditoria visual.
   - Mantém as preferências salvas no `localStorage`.
3. **Leitura Simplificada**:
   - Utiliza a tipografia otimizada `Lexend`, espaçamento entrelinhas aumentado (1.7x) e kerning aprimorado para pessoas com dislexia e baixa visão.
4. **Skip Link ("Pular para o conteúdo principal")**:
   - Navegação facilitada por teclado (`Tab`).
5. **Navegação por Teclado e Foco Visível Reforçado**:
   - Indicador de foco com anel duplo de contraste em todos os botões, links e inputs interativos.
6. **Leitor de Tela / ARIA-Live Regions**:
   - Anúncios dinâmicos para tecnologias assistivas em cada ação realizada (adicionar ao carrinho, ajuste de fonte, ativação de alto contraste).
7. **Busca por Voz com Web Speech API**:
   - Microfone interativo no campo de busca do header e no chatbot.
8. **Assistente Virtual Interativo com IA**:
   - Chatbot acessível com sugestões rápidas, busca guiada e orientações por assunto e fluxo de compra guiado.

---

## Estrutura do Projeto

O projeto está organizado na seguinte estrutura:

```
Frontend/
├── html/         # Arquivos HTML da aplicação (index.html, login.html, ajuda.html, sobre.html)
├── css/          # Folhas de estilo (styles.css, accessible-flows.css)
│   └── assets/   # Imagens, logotipos, ícones e fotos de produtos
├── js/           # Scripts JavaScript (script.js, purchase-chat.js, auth.js, etc.)
├── Docs/         # Documentações do projeto em Markdown
└── tests/        # Testes automatizados de contraste e fluxo de compra
```

