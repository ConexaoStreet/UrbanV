# Fase 00 — Governança

## Objetivo
Construir a VT Store como comércio digital mobile-first, acessível, seguro, observável e operável, sem copiar identidade de terceiros.

## Fontes de verdade
1. Shopify: comércio.
2. GitHub: código e histórico de engenharia.
3. Google Drive: documentos, evidências e ativos.
4. Supabase: dados auxiliares sem duplicar pedidos/pagamentos.

## Gates obrigatórios
1. Gate funcional: navegação, PLP, PDP, carrinho, checkout e conta operáveis.
2. Gate de dados: integrações com contratos de dados definidos, RLS e retenção.
3. Gate de segurança: headers, auth, webhooks, secrets, rate limit e auditoria.
4. Gate de qualidade: WCAG 2.2 AA como meta, Core Web Vitals e E2E.
5. Gate de branding: somente após 1–4.
6. Gate de lançamento: preview validado, rollback documentado e observabilidade ativa.

## Proibições
- Não duplicar pedidos ou pagamentos fora do Shopify.
- Não armazenar cartão.
- Não colocar PII desnecessária em analytics.
- Não publicar segredos.
- Não comprar domínio, contratar plano, ativar mídia paga ou fazer envio em massa sem autorização explícita.
- Não usar produto fictício como solução final.

## Definition of Done
Uma fase só é concluída quando existe artefato observável: código, configuração, teste, dashboard, documento ou evidência de integração.

## Rollback
Toda mudança de produção deve ser reversível por commit/deployment anterior, flag, desativação de integração ou restauração documentada.
