# Login e compra acessível

Abra o projeto com Live Server ou outro servidor HTTP local. O Google OAuth precisa de uma URL HTTP em localhost ou HTTPS em produção; não funciona abrindo `login.html` com `file://`.

## Ativar o login real

1. Crie um projeto Supabase e ative autenticação por e-mail/senha. Mantenha a confirmação de e-mail habilitada.
2. Em Authentication → URL Configuration, configure a Site URL e permita o endereço exato de `login.html` em desenvolvimento e produção.
3. Em Authentication → Providers → Google, habilite Google e configure o cliente OAuth criado no Google Cloud. No Google Cloud, autorize a URL de callback indicada pelo Supabase (`https://SEU-PROJETO.supabase.co/auth/v1/callback`). O segredo do Google fica somente no painel Supabase.
4. Ative o vínculo manual de identidades nas configurações de Authentication para permitir “Vincular minha conta ao Google”.
5. Preencha apenas `supabaseUrl` e `supabasePublicKey` em `auth-config.js`. Use a chave publishable ou anon pública, nunca `service_role`, chave secreta ou segredo do Google.
6. Configure o envio de e-mail do projeto para confirmação de conta e recuperação de senha.

Sem essa configuração, a página informa que o login está em preparação e nenhuma compra é concluída. Não há login fictício ou senha armazenada pelo código do site. O SDK gerencia a sessão na aba (`sessionStorage`), e `getUser()` verifica a conta antes da confirmação. Carrinho e CEP ficam na aba, separados pela identidade; sair ou trocar de conta limpa os dados privados anteriores. Recarregar reinicia etapas e conversa; o retorno deliberado do login pode retomar a etapa. Consulte [PRIVACIDADE.md](PRIVACIDADE.md).

Referências oficiais: [Google OAuth](https://supabase.com/docs/guides/auth/social-login/auth-google), [vincular identidades](https://supabase.com/docs/reference/javascript/auth-linkidentity), [verificar usuário](https://supabase.com/docs/reference/javascript/auth-getuser).

## Compra guiada

Consulte também [ACESSIBILIDADE.md](ACESSIBILIDADE.md) para orientação contextual, desfazer remoção, resumo do carrinho, compra simplificada e ajuda consistente, com critérios e verificações pendentes.

O botão “Comprar pelo chat · texto ou voz” está na área da assistente e no carrinho. No card de pagamento, também há “Usar chat de compra guiada”. O fluxo permite buscar produtos do catálogo, adicionar/remover itens, revisar frete e total, confirmar o CEP, escolher Pix, cartão, boleto ou convênio e revisar antes de concluir.

O reconhecimento de voz só começa por ação do cliente; o texto transcrito precisa ser revisado e enviado. Há controles para interromper o microfone e a leitura, ouvir a última resposta e ativar leitura automática (desligada por padrão). Quando a API de voz não está disponível, o texto continua funcionando. O navegador pode exigir HTTPS/localhost e permissão para usar o microfone.

As respostas do novo chat seguem um roteiro local. Não há modelo de IA generativa, reconhecimento de receitas, aconselhamento médico, verificação real de CEP/estoque/convênio, cobrança ou registro de pedido em servidor. O front-end mantém a seleção e a revisão da compra; confirmação, cobrança e registro de pedidos aguardam a integração com o backend. Implemente um backend que valide o token, catálogo, preços, frete, benefícios e pagamento antes de registrar qualquer pedido; a proteção no navegador não substitui essa validação.

## Verificação

### Avisos de ação pendente

O chat mostra um card “Para continuar” ao tentar enviar sem mensagem, avançar sem produtos, confirmar um CEP inválido ou continuar sem completar a ação da etapa. Na etapa de pagamento, o aviso explica que o cliente deve escolher uma forma de pagamento ou digitar a opção. Na revisão, explica que Enviar não conclui o pedido.

O aviso não desaparece por tempo, não apaga o rascunho e não confirma nada automaticamente. Um botão leva o foco até a ação necessária. Uma região `role="alert"` anuncia a orientação sem exigir mudança de foco; se o áudio estiver ativado, a assistente também lê a mensagem. Campos inválidos recebem indicação programática. O card usa texto, borda e contraste herdado, sem depender apenas de cor. A seleção válida ou mudança de etapa limpa o aviso.

Referências: [WCAG 3.3.3 — sugestões para corrigir erros](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html) e [WCAG 4.1.3 — mensagens de estado](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html). Esses recursos devem ser verificados também com leitor de tela real; testes automatizados não comprovam conformidade integral.

Execute `node --test tests/purchase-flow.test.cjs` para conferir bloqueio sem login, restauração do carrinho, totais, fluxo do chat, confirmação explícita e transcrição sem envio automático. Os testes usam DOM e Supabase simulados; o OAuth real precisa ser conferido após configurar o projeto. Valide também manualmente Tab/Shift+Tab/Escape, leitor de tela, alto contraste, zoom de 200%, telas pequenas e permissões de microfone.
