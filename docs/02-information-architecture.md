# Fase 02 — Arquitetura de informação

## Navegação principal
- Novidades
- Masculino
- Feminino
- Unissex
- Infantil
- Tênis
- Roupas
- Acessórios
- Streetwear
- Esportivo
- Casual
- Ofertas
- Drops
- Coleções
- Marcas

## Entidades de catálogo
Produto → opções → variantes → disponibilidade → coleção/taxonomia → mídia → conteúdo editorial.

## Atributos normalizados
- categoria
- subcategoria
- público/linha
- tamanho
- cor
- faixa de preço
- marca
- coleção
- estilo
- uso
- material
- novidade
- promoção
- disponibilidade

## Rotas funcionais
- `/`
- `/novidades`
- `/masculino`, `/feminino`, `/unissex`, `/infantil`
- `/tenis`, `/roupas`, `/acessorios`
- `/streetwear`, `/esportivo`, `/casual`
- `/ofertas`, `/drops`, `/colecoes`, `/marcas`
- `/buscar?q=`
- `/c/[handle]`
- `/p/[handle]`
- `/carrinho`
- `/conta/*`
- `/ajuda/*`
- `/politicas/*`

## Regras
Filtros só aparecem quando há dado confiável. URLs indexáveis não devem explodir por combinações de filtro. Categoria editorial terá canonical próprio; parâmetros de ordenação/filtro não criam páginas finas.
