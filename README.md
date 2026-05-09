# URBAN V — Site Streetwear Premium

**Vista a rua. Carregue presença.**

Site completo da marca Urban V. Drops limitados, carrinho funcional, checkout via WhatsApp e experiência cinematográfica.

---

## Estrutura de arquivos

```
urbanv/
├── index.html          ← HTML principal
├── css/
│   └── style.css       ← Todos os estilos
├── js/
│   └── script.js       ← Toda a lógica JS
├── products.json       ← Catálogo de produtos (edite aqui)
└── README.md
```

---

## Como editar produtos

Abra `products.json` e edite ou adicione itens seguindo o padrão:

```json
{
  "id": 7,
  "name": "Nome do Produto",
  "price": 99.90,
  "category": "Camisetas",
  "description": "Descrição curta da peça.",
  "badge": "NOVO",
  "accent": "#39FF14"
}
```

**Categorias aceitas:** `Camisetas`, `Moletons`, `Calças`, `Bonés`, `Acessórios`

**Badges aceitos:** `NOVO`, `DROP 01`, `DROP 02`, `LIMITADO`, `CLÁSSICO`, `EXCLUSIVO`

---

## Como trocar o número de WhatsApp

No arquivo `js/script.js`, na linha:

```js
const WPP_NUMBER = '5511919730067';
```

Substitua pelo número da loja no formato: `55` + DDD + número, sem espaços ou símbolos.

---

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex: `urbanv-site`)
2. Faça upload de todos os arquivos (mantendo a estrutura de pastas)
3. Vá em **Settings → Pages**
4. Em **Source**, selecione `main` e pasta `/ (root)`
5. Clique em **Save**
6. Acesse: `https://seu-usuario.github.io/urbanv-site`

> ⚠️ O arquivo `products.json` deve estar na raiz para funcionar corretamente no GitHub Pages.

---

## Tecnologias usadas

- HTML5 semântico com SEO básico
- CSS3 moderno com variáveis, Grid e Flexbox
- JavaScript puro (sem frameworks, sem npm)
- GSAP 3 + ScrollTrigger (via CDN)
- Canvas API para partículas e efeito V
- localStorage para persistência do carrinho
- WhatsApp API para checkout

---

## Funcionalidades

- ✅ Intro cinematográfica com canvas de partículas
- ✅ Header glassmorphism com scroll
- ✅ Menu mobile fullscreen animado
- ✅ Hero com partículas interativas e efeito V
- ✅ Seção de Drops com cards 3D
- ✅ Catálogo com filtros por categoria
- ✅ Carrinho lateral funcional + localStorage
- ✅ Checkout com envio automático via WhatsApp
- ✅ Lookbook editorial
- ✅ Depoimentos em carrossel com touch
- ✅ Animações GSAP + ScrollTrigger
- ✅ Cursor customizado (desktop)
- ✅ Toast de notificações
- ✅ Responsivo: mobile, tablet e desktop
- ✅ Acessibilidade básica (aria, roles, keyboard)
