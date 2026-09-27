# VT Store — Execução enterprise

Esta branch é a implementação isolada da VT Store. O `main` legado da UrbanV permanece intacto.

## Princípios
- Shopify é a fonte de verdade para catálogo, variantes, preços, estoque, carrinho, checkout, pedidos, descontos e devoluções.
- Supabase guarda somente dados auxiliares (wishlist, back-in-stock, preferências, quiz e trilhas operacionais permitidas).
- Nenhum dado de cartão é armazenado fora do provedor de pagamento.
- Branding final só entra depois do gate funcional, de segurança, acessibilidade e performance.
- Nenhuma integração paga, compra de domínio, campanha com gasto ou disparo em massa é ativada sem autorização explícita.
- Todo segredo fica fora do Git; apenas nomes de variáveis entram no repositório.

## Fases
- [x] 00 Governança inicial e critérios de pronto
- [x] 01 Benchmark funcional (Drive)
- [x] 02 Arquitetura de informação e taxonomia
- [x] 03 UX neutra e design system funcional
- [x] 04 Arquitetura técnica e fundações
- [ ] 05 Shopify commerce — depende de loja Shopify conectada/dedicada
- [ ] 06 Dados auxiliares/CRM/suporte — implementação técnica em andamento
- [ ] 07 SEO/analytics/observabilidade/segurança — implementação técnica em andamento
- [ ] 08 QA/a11y/performance/E2E — após preview implantado
- [ ] 09 Pré-lançamento/contingência
- [ ] 10 Branding FINAL
- [ ] 11 Lançamento controlado
- [ ] 12 Growth e operação contínua

## Evidência
Cada fase tem um documento próprio em `docs/`. O código é construído em branch isolada para impedir impacto em projetos legados.
