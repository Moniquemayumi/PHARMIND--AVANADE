# Pharmind

> **IA Commerce acessível para farmácias: do prompt à compra, com segurança.**
> Hacka Business Avanade 2026 · Desafio Pague Menos

---

## O que é

A **Pharmind** é uma experiência de comércio conversacional para farmácias. O cliente descreve o que precisa em linguagem natural, e a IA conduz toda a jornada: entende a necessidade, considera o perfil de saúde, recomenda produtos reais do catálogo, sugere complementos e coloca os itens escolhidos no carrinho do site.

Não é um chatbot que apenas responde perguntas. É um assistente que **conduz da conversa até a compra**, com responsabilidade.

---

## O problema

- Os consumidores mudaram de comportamento: a jornada de compra já começa em um prompt.
- Chatbots comuns apenas respondem e não levam o cliente à compra.
- Em saúde, idade, alergias, gestação e comorbidades mudam o que pode ou não ser recomendado.
- Recomendar medicamentos sem esse cuidado é arriscado e inviável.

**Pergunta central:** como transformar uma conversa em compra, com segurança?

---

## Nosso diferencial: acessibilidade

O site foi pensado para pessoas que enfrentam barreiras nos e-commerces tradicionais:

- **Baixa visão:** modo de alto contraste, com paleta marinho e marfim no padrão WCAG AAA
- **Dislexia:** leitura facilitada
- **Daltonismo:** paleta e contraste planejados
- **Limitações motoras:** navegação guiada e apoio por voz
- **Para todos:** conversa simples no lugar de filtros e formulários complexos

Quem tem dificuldade para navegar num e-commerce comum consegue comprar com autonomia e segurança, apenas conversando.

---

## Como funciona a jornada

1. **Descobre a necessidade:** o cliente fala como quiser, por exemplo "estou com gripe e febre".
2. **Conhece o cliente:** consulta alergias, condições de saúde e histórico, sem formulários.
3. **Recomenda com segurança:** sugere apenas produtos do catálogo e filtra as contraindicações.
4. **Sugere complementos:** oferece um item relacionado, com justificativa, por exemplo vitamina C junto com um antigripal. Se o cliente recusar, a IA não insiste.
5. **Leva à compra:** os produtos confirmados entram direto no carrinho do site.

---

## Motor de recomendação

A recomendação considera três fatores:

- **Intenção:** o que o cliente pediu, em linguagem natural.
- **Perfil e histórico:** alergias, comorbidades e padrão de compra.
- **Adequação:** filtro de contraindicações antes de qualquer sugestão.

Exemplo: uma cliente gestante e alérgica a dipirona pede algo para dor de cabeça. A Pharmind **não oferece dipirona** e indica uma opção segura para o perfil dela.

---

## Segurança em saúde

- **Emergência por regra:** mensagens como dor forte no peito ou falta de ar são bloqueadas antes da IA e orientam o cliente a ligar para o **SAMU (192)**.
- **Não diagnostica nem prescreve.**
- **Recomenda somente produtos do catálogo.** Não inventa produtos.
- **Perfil e bula:** alergias, condições e contraindicações são verificadas.
- **Medicamentos com receita:** orienta o cliente a procurar atendimento especializado.
- **Resiste a manipulação:** instruções maliciosas (prompt injection) não alteram as regras de segurança.

> A Pharmind é um protótipo e não substitui a orientação de médicos ou farmacêuticos.

---

## Demonstração

| Cenário | O que mostra |
|---|---|
| **Jornada completa** (cliente com gripe) | Descoberta → recomendação → complemento → carrinho |
| **Personalização e segurança** (cliente gestante e alérgica) | Evita o produto contraindicado e indica uma opção segura |
| **Emergência e limites** | Bloqueio da IA e orientação ao SAMU; recusa de prescrição |

---

## Dados e premissas

Em conformidade com o desafio, **nenhum dado real do cliente foi usado**:

- Catálogo de 25 produtos baseado na estrutura do catálogo público, com indicações e contraindicações fictícias.
- Clientes e históricos simulados.
- A compra termina no carrinho, sem pagamento real.

---

## Integração proposta

Cada parte do protótipo pode ser substituída por um sistema real, sem refazer a experiência:

| Protótipo | Produção |
|---|---|
| Catálogo sintético | API do e-commerce Pague Menos |
| Indicações e contraindicações simuladas | Base pública da Anvisa |
| Clientes simulados | CRM e histórico real, com LGPD |
| Carrinho do site | Checkout e pagamento reais |

---

## Equipe

- Monique Mayumi Yazawa
- João Pedro Pereira Barbosa
- Garret Leonardo da Silva
- Thomas Anderson de Melo Silva

---

*Projeto desenvolvido para o Hacka Business Avanade 2026. Repositório privado. Sem dados reais de clientes.*
