# Privacidade e armazenamento

Estas são as medidas técnicas do front-end em desenvolvimento, não uma certificação de conformidade com a LGPD. Elas precisam ser revistas antes de uso comercial, junto com os serviços, finalidades, bases legais, retenção e direitos dos titulares.

## Dados e duração

| Dado | Onde fica | Quando é apagado |
| --- | --- | --- |
| Carrinho e CEP informado | `sessionStorage` da aba, com prefixo por identidade autenticada; visitante tem área própria da aba | Sair, trocar de conta, usar “Sair e apagar meus dados desta aba” ou encerramento normal da sessão da aba |
| Etapa, conversa e rascunho de CEP da compra | Mesma área privada da aba | A cada nova carga normal/recarregamento da página. Retorno deliberado do login preserva o progresso; recarregar remove mesmo nessa situação |
| Token e verificador de autenticação, após ativação do login | SDK Supabase, usando armazenamento da aba e chave própria `pm_auth_session_v2` | Saída da conta, limpeza explícita ou encerramento normal da sessão da aba |
| Senha | Não é persistida pelo código do site; enviada ao serviço de autenticação quando configurado e usada no formulário | Campo limpo na saída/troca; retenção do provedor e do gerenciador de senhas do navegador é independente |
| Preferências de acessibilidade | `localStorage` no navegador | Limpeza dos dados do site pelo usuário; não contêm CEP, login ou conversa |
| Voz | Reconhecimento/síntese oferecidos pelo navegador | O site não grava arquivos de áudio; transcrição pode envolver o serviço do navegador, conforme suas permissões e política |

O estado inicial do produto entregue não contém carrinho, CEP ou conversa de um cliente de exemplo. Os produtos e CEP fictícios dos testes existem somente em `tests/`.

`privacy.js` fornece o armazenamento privado antes de carregar os outros scripts. Valores antigos sem identificação de dono são descartados, sem migração. Ao entrar, a compra do próprio visitante da aba pode acompanhar seu login. Uma troca entre contas autenticadas ou uma saída limpa o contexto anterior em memória, no DOM e no armazenamento. Dados privados de uma identidade anterior não são renderizados antes da verificação da sessão. A sessão antiga do SDK em `localStorage`, se existente para o projeto configurado, é removida; o novo SDK usa a aba.

Não existe mecanismo de sincronização de compras entre visitantes, arquivos do projeto ou outros navegadores. `sessionStorage` não é criptografia nem autorização: uma pessoa com acesso ao mesmo perfil do navegador e à sessão aberta pode ler seus dados; abas duplicadas ou restauradas podem ter o armazenamento copiado/restaurado pelo navegador. Por isso há orientação sobre aparelho compartilhado e controle explícito para sair e limpar. Não se promete exclusão de conta ou de registros nos provedores ao limpar dados locais.

## Ajuda sem coleta desnecessária

Os atalhos de rastreamento, regras de medicamentos, regras do pedido e produto violado têm respostas próprias. O site não solicita CPF/número de pedido para oferecer orientações e não afirma ter rastreado, registrado reclamação ou aprovado troca. A política e o atendimento oficiais são apresentados como destinos externos. Não há transferência automática da conversa para eles.

A integração do front-end com pedidos e com um modelo de IA generativa está pendente. Dados de autenticação vão ao Supabase/Google apenas quando o login estiver configurado e for utilizado; a fala pode envolver serviços do navegador. Fotos e bibliotecas/fontes externas têm suas próprias requisições, sem envio do CEP ou conversa pelo código do site.

## Antes da produção

- Implementar autorização no servidor: cada consulta ou alteração de pedido deve validar o token e a propriedade do recurso. Prefixos no navegador não substituem isso.
- Validar HTTPS, proteção contra XSS, expiração/revogação da sessão, política de segurança de conteúdo e dependências.
- Definir controlador, canal de privacidade, bases legais, operadores, finalidade e prazos de retenção; avaliar tratamento de dados de saúde e transferências internacionais.
- Publicar aviso adequado ao serviço real e mecanismos para os direitos dos titulares. Não reutilizar este aviso de desenvolvimento como política final sem revisão.
- Validar em navegador real entrada/saída/troca de contas, recarregamento, fechamento/restauração/duplicação de abas, retorno OAuth e leitura dos avisos por tecnologia assistiva.

## Referências

- [LGPD — texto oficial](https://www.presidencia.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm).
- [Princípios de necessidade, segurança e prevenção](https://www.gov.br/saude/pt-br/acesso-a-informacao/lgpd/principios).
- [Política oficial da farmácia para trocas e devoluções](https://www.paguemenos.com.br/politica-troca-devolucao).
- [Inicialização do SDK Supabase e armazenamento de sessão](https://supabase.com/docs/reference/javascript/initializing).
