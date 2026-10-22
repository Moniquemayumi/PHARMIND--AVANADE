# Acessibilidade da compra

A revisão de QA de 22/10/2026, com correções e limitações verificadas, está em [QA-REVISAO.md](QA-REVISAO.md).

Meta de verificação: WCAG 2.2 nível AA. Este documento descreve implementação e evidências; não é certificado de conformidade ou auditoria jurídica. Recursos opcionais de voz e aparência não substituem a acessibilidade do fluxo por teclado e leitor de tela.

## Melhorias implementadas

| Recurso | Comportamento | Teclado, leitor de tela e áudio | Referência WCAG |
| --- | --- | --- | --- |
| O que faço agora? | Explica a ação da etapa, sem modificar dados ou confirmar nada. Um botão leva ao controle necessário. | Botão nativo, Enter/Espaço. Orientação solicitada usa `role=status`; erros usam `role=alert`. Leitura respeita a preferência de áudio. | 3.3.2, 3.3.3, 4.1.3 |
| Desfazer remoção | Restaura produto, quantidade e posição. Soma à quantidade existente se o produto foi adicionado novamente. Não tem temporizador. Remoções são desfeitas da mais recente à mais antiga. | Aviso e botão no carrinho e no chat. O foco fica em controle disponível após restaurar. Válido enquanto a página permanece aberta, até desfazer ou concluir o pedido. | 2.1.1, 3.3.4, 4.1.3 |
| Resumo acessível | Quantidade de itens, subtotal, frete e total. Ouvir meu carrinho lê nomes e valores mesmo com leitura automática desligada. Editar abre controles de quantidade e remoção. | Estado anunciado; detalhes nativos expansíveis. Botões identificam o produto. Resumo deixa de ser fixo em telas baixas para não cobrir o conteúdo. | 1.3.1, 2.4.7, 2.4.11, 4.1.3 |
| Compra simplificada | Um produto por vez com próximo/anterior. Histórico e detalhes do carrinho começam recolhidos, mas podem ser abertos. Última resposta continua visível. | Alternância com `aria-pressed`; preferência salva no aparelho quando permitido. Nenhuma compra ocorre por navegar. Preserva CEP e rascunho. | 2.1.1, 3.2.2, 3.3.7, 4.1.2 |
| Preciso de ajuda | Mesmo local após o cabeçalho na loja, Sobre, Ajuda e Login; acesso equivalente dentro do chat. | Expansão nativa por Enter/Espaço. Não abre sozinha nem sobrepõe o conteúdo. | 3.2.6, 2.1.1 |

Botões novos têm alvos com pelo menos 44 pixels de altura, foco visível e texto descritivo. Cores herdam o tema e o alto contraste. Avisos não dependem apenas de cor.

O guia em `ajuda.html` explica compra, teclado, microfone, leitura e recuperação de erros. O atendimento humano ainda não está integrado ao front-end: o link leva à central oficial da Pague Menos e informa o destino externo. Nenhuma conversa é transferida automaticamente.

## Evidências

### Cores no alto contraste

Os atalhos do cabeçalho, campos de entrada, conversa, controles do carrinho e botões secundários usam texto marfim sobre superfícies escuras. Ações principais usam texto escuro sobre fundo marfim, inclusive nos estados de hover. Os títulos, links, placeholders e contadores também têm cores definidas para o tema; o fundo claro e o gradiente dos atalhos deixam de ser usados nesse modo.

Execute `node --test tests/contrast.test.cjs tests/purchase-flow.test.cjs`. Os testes de contraste calculam a razão de luminância dos pares de cores declarados nos grupos verificados e exigem pelo menos 7:1. Isso não verifica o CSS computado no navegador, sobreposições, imagens, todos os componentes ou conformidade integral; a revisão visual e os testes de tecnologia assistiva continuam necessários.

Execute `node --test tests/purchase-flow.test.cjs`. Os testes usam DOM mínimo e autenticação simulada, sem rede ou contas reais. Cobrem compra, avisos, restauração, cálculos, leitura, modo simplificado e ajuda nas quatro páginas. Não avaliam layout real, fala do sistema operacional ou tecnologias assistivas reais.

## Verificação manual pendente

1. Percorrer tudo com Tab/Shift+Tab; ativar por Enter/Espaço; fechar por Escape. Conferir foco após remover/restaurar, paginar e voltar etapas.
2. Usar NVDA ou outro leitor de tela para validar nomes, estados expandidos/pressionados, etapas e avisos. Conferir o processo inteiro com voz da assistente desligada.
3. Medir contraste dos temas e foco; testar alto contraste do sistema, texto a 200% e largura de 320 pixels sem perda de controles.
4. Conferir que o resumo não cobre campos e botões, há uma rolagem no card e nenhuma ação ocorre apenas por receber foco.
5. Negar o microfone e testar navegador sem reconhecimento de voz; confirmar alternativa textual. Ativar/desativar áudio e interromper a leitura.
6. Conferir Desfazer com várias remoções e com a última unidade removida pelo botão Diminuir. Concluir pedido deve eliminar remoções pendentes.
7. Configurar autenticação para verificar e-mail, Google, sessão expirada e retorno à compra. Pedidos e pagamentos dependem do backend; não há confirmação de sucesso sem resposta do serviço.

## Referências

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- [Ajuda consistente — 3.2.6](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html).
- [Evitar repetição de dados — 3.3.7](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html).
- [Prevenção de erros — 3.3.4](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html).
- [Mensagens de estado — 4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).
- [Lei Brasileira de Inclusão, art. 63](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm).
