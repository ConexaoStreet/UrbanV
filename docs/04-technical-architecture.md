# Fase 04 — Arquitetura técnica

## Storefront
Next.js App Router + TypeScript, server-first, hospedagem Vercel.

## Commerce
Shopify Storefront/Admin conforme responsabilidade:
- catálogo, preço, variantes, estoque
- cart/checkout
- pedidos, descontos e devoluções
- dados estruturados derivados do catálogo real

## Dados auxiliares
Supabase:
- wishlist de usuário
- back-in-stock subscriptions
- preferências
- quiz de estilo
- consentimentos operacionais quando aplicável
- audit trail das próprias funções auxiliares

Nunca espelhar cartão ou transformar Supabase em sistema de pedidos paralelo.

## Analytics
PostHog para eventos de produto e funis com consentimento. Dados sensíveis e PII ficam fora dos eventos por padrão.

## Observabilidade
Datadog/Vercel para erros, logs, tracing e uptime. IDs técnicos podem ser correlacionados; payloads de checkout e dados pessoais não.

## E-mail
Resend: transacional permitido.
Gmail/Outlook: atendimento humano e B2B.

## Segurança
- CSP
- HSTS
- secure/SameSite cookies
- proteção CSRF quando aplicável
- validação de entrada
- assinatura de webhook
- idempotência
- rate limit
- RLS
- segredo somente server-side
- dependency scanning / CI

## Deploy
1. branch/PR
2. checks
3. preview
4. E2E
5. promoção controlada
6. observação pós-deploy
7. rollback por deployment anterior
