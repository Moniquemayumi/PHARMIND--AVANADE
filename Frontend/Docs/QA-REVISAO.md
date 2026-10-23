# Revisão de QA — experiência de compra e acessibilidade

Data: 22 de outubro de 2026. Escopo: análise do código e testes locais dos fluxos de busca, assistente, carrinho, login, navegação e temas. Nenhum navegador estava conectado à sessão, portanto esta revisão não inclui inspeção visual renderizada ou teste com leitor de tela real. Não representa certificação de conformidade.

## Correções

| Problema identificado | Correção e efeito para o cliente |
| --- | --- |
| Busca substituía fotos por um ícone e mantinha produtos antigos quando não encontrava nada. | Unificação com os cartões do catálogo, fotos correspondentes, busca sem distinção de acentos e estado vazio com instrução. |
| Detalhes de produtos dependiam de clique e alguns elementos fingiam ser botões. | Botões HTML nativos nos nomes e nas imagens; favoritos com estado pressionado. Removido papel de menu de aplicação de uma navegação que não implementava as teclas desse padrão. |
| Nome desconhecido abria silenciosamente o primeiro medicamento. | Produto inexistente apresenta orientação e não abre outro produto. |
| A opção Todas mostrava apenas destaques. | Passou a mostrar o catálogo completo. |
| CEP digitado no chat era tratado como busca de produto. | CEP pode ser confirmado por mensagem na etapa de entrega; também há aviso persistente para CEP inválido no seletor da página. |
| Resposta inesperada durante o pagamento podia mudar para a busca e perder o contexto. | Mantém a etapa e explica a ação pendente. Voltar funciona também por texto. |
| O cliente não conseguia solicitar adição/remoção diretamente pelo nome. | Comandos explícitos funcionam quando há um único produto correspondente. Ambiguidades pedem esclarecimento; nunca escolhem um produto arbitrário. |
| Quantidades acima do limite podiam ser perdidas ao restaurar a sessão. | Limite consistente de 99 unidades por item; validação em adicionar, alterar e desfazer, sem anunciar adição que não aconteceu. |
| A interface tinha grades rígidas e cabeçalho sem adaptações para celular. | Refluxo em telas menores, colunas únicas quando necessário, cabeçalho sem fixação no celular, textos quebráveis, diálogos alcançáveis e alvos de interação maiores. Inspeção visual pendente. |
| Texto ampliado era limitado a 145%; preferência inválida podia produzir NaN. | Ajuste de fonte até 200%, validação dos valores salvos e tratamento de armazenamento bloqueado. |
| Preferência de leitura simplificada não era persistida. | Preferência salva no navegador; aplicação considera o estado escolhido pelo cliente. |
| Microfone na busca/chat da página enviava automaticamente o texto reconhecido. | A transcrição fica no campo para revisão antes de Buscar/Enviar. O chat de compra mantém o mesmo princípio. |
| Leitura do produto/pagamento não oferecia parada explícita; falha da API podia interromper a ação. | Controle Parar leitura, cancelamento ao fechar detalhes/pagamento e tratamento de falha sem perder acesso ao texto. |
| Cartão de produto apresentava doses sem validação editorial como informação oficial. | Removida a exibição dessas doses; orientações de medicamentos remetem à bula/prescrição e ao farmacêutico. A assistente organiza a compra, sem definir tratamentos. |
| Acompanhar pedido abria pagamento e Nossas lojas apontava para âncora inexistente. | Links corrigidos para ajuda e localizador oficial. |
| Avisos comuns interrompiam o leitor de tela como alertas urgentes. | Notificações comuns usam a região de status compartilhada; erros e ações pendentes mantêm avisos específicos. |
| Login impedia senhas existentes com menos de 8 caracteres antes de consultar o provedor. | O limite mínimo fica no cadastro/nova senha; entrada usa a validação do serviço de autenticação. |
| Link de declaração afirmava conformidade não comprovada. | Direciona ao guia de uso, sem anunciar certificação. |

## Testes

Execute `node --test tests/contrast.test.cjs tests/purchase-flow.test.cjs`.

Os testes exercitam código de produção com DOM e autenticação simulados, além de calcular contraste dos pares de cores selecionados. Incluem busca, produtos inexistentes, confirmação de CEP por conversa, adição/remoção, ambiguidade, preservação de etapas, armazenamento bloqueado, ampliação, revisão de voz, limites de quantidade, privacidade, retorno do login e ausência de sucesso artificial sem backend.

## Pendências antes da liberação

1. Inspecionar em navegador a largura de 320 pixels, texto e zoom a 200%, navegação por teclado e foco após mudanças dinâmicas; conferir que cabeçalho, resumo e avisos não encobrem controles.
2. Percorrer a compra e a ajuda com NVDA/VoiceOver, incluindo estados vazios, erros, voz desligada, leitor de tela ativo e áudio interrompido.
3. Testar contraste computado e modo de cores forçadas, além dos pares declarados medidos automaticamente.
4. Validar OAuth/e-mail/recuperação com o serviço configurado e transcrição em dispositivos com microfone permitido, recusado ou indisponível.
5. Integrar o backend para preços, descontos, estoque, endereço completo, frete/prazo real, pedidos, autorização, pagamento e rastreamento. O front-end não deve confirmar essas operações sem resposta válida dos serviços.
6. Revisar dados de catálogo e conteúdo de saúde com fontes e responsáveis adequados antes de publicação comercial.

Referências: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [refluxo do conteúdo](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [foco não encoberto](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html). Ver também [ACESSIBILIDADE.md](ACESSIBILIDADE.md) e [PRIVACIDADE.md](PRIVACIDADE.md).
