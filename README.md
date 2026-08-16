# 🛒 Rosa Online Shop (React E-Commerce App)

A modern, full-featured e-commerce front end built with **React**, demonstrating real-world patterns for state management (**Context API, Redux Toolkit, React Query**), a complete multi-step checkout flow, product discovery (search, filtering, sorting, pagination), a persistent wishlist, and performance/SEO best practices.

---

## 🚀 Features

### 🧠 State Management

- **Context API + useReducer**
  - Theme toggle (Dark / Light mode)
  - Layout switch (Grid / List view)

- **Redux Toolkit**
  - Cart: add, remove, increase/decrease quantity, clear cart, total price & item count tracking
  - Wishlist: add, remove, toggle, clear — persisted to `localStorage`

- **React Query** (`@tanstack/react-query`)
  - Fetch products from the API (cached, shared across pages — e.g. Home and the search bar reuse the same cache)
  - Fetch a single product by ID (Product Details page)
  - Built-in loading and error states, retry on demand

---

## 📦 Pages

- **Home** — product listing with search, filters, sorting, and pagination
- **Product Details** — full product info, add to cart, add to wishlist
- **Cart** — review items, adjust quantities, proceed to checkout
- **Checkout** — 5-step guided flow (new)
- **Order Confirmation** — post-checkout summary and mock tracking (new)
- **Wishlist** — saved products with quick actions (new)

---

## 🧾 Multi-Step Checkout (new)

A 5-step guided checkout, each step validated before the user can continue:

1. **Contact Information** — email, phone
2. **Shipping** — first/last name, address, city, province, postal code, country
3. **Delivery** — Standard (Free), Express ($12), Next Day ($25), with dynamic delivery-time estimates
4. **Payment** — mock payment form (card number, MM/YY, CVC, name on card) with a live card preview, input auto-formatting, and card-brand detection. **This is frontend-only — no real payment is ever processed, transmitted, or stored.**
5. **Review** — full order summary, shipping address, delivery method, masked payment method, and total, before placing the order

Extras:
- Form progress is cached in `sessionStorage`, so an accidental page refresh mid-checkout won't wipe out what the user already typed
- Redirects back to the cart automatically if checkout is reached with an empty cart

### ✅ Order Confirmation 

After a mock order is placed:
- Success screen with a generated order ID (e.g. `#ORD-2026-84721`)
- Dynamically estimated delivery window based on the chosen delivery method
- **Track Order** — opens a mock shipment-status timeline
- **Continue Shopping** — returns to the catalog

---

## 🔍 Product Discovery

- View all products from the API
- Filter by category (chip selector)
- **Search**  — live suggestions dropdown as you type, recent search history saved to `localStorage`, a "Clear history" action, and a friendly no-results state
- **Advanced Filtering**  — price range slider, minimum rating, brand (multi-select), and "in stock only" availability toggle, available as a sidebar on desktop and a slide-out drawer on mobile
- **Advanced Sorting**  — Newest, Price: Low → High, Price: High → Low, Rating
- **Pagination**  — product grid/list is paginated instead of rendering everything at once
- View full product details
- Add products to cart directly from a card or the details page

---

## ❤️ Wishlist 

- Add/remove products via a heart icon on product cards and the details page
- Dedicated **Wishlist** page listing all saved items
- **Move to Cart** — moves an item from the wishlist straight into the cart
- **Remove** individual items or **Clear Wishlist** entirely
- Live wishlist count badge in the navbar
- Persisted to `localStorage`, so it survives page refreshes and browser restarts

---

## 🎨 UI Features

- Responsive design (mobile + desktop)
- Grid / List view toggle
- Dark / Light mode
- Modern Material UI design
- Consistent **loading**, **error**, and **empty** states across every page (product grid, cart, wishlist, product details, search) instead of blank screens or silent failures

---

## ⚡ Performance & SEO

- **Code splitting** — Cart, Product Details, Wishlist, Checkout, and Order Confirmation are all lazy-loaded (`React.lazy` + `Suspense`), so the initial bundle only ships what's needed for the home page
- **Lazy-loaded images** (`loading="lazy"`, `decoding="async"`) across product cards, cart, wishlist, and product details
- **Memoization** — `ProductCard` is wrapped in `React.memo`; filtering/sorting/pagination results are memoized with `useMemo` to avoid unnecessary recalculation
- **Debounced search input** to avoid re-filtering on every keystroke
- **Cached API requests** via React Query, shared between the Home page and the search bar (no duplicate network calls)
- **Skeleton loading state** for the product grid on first load, avoiding layout jump
- **Dynamic SEO** — a lightweight custom `useSEO` hook sets a per-page document title, meta description, canonical URL, and Open Graph tags (no extra dependency required)

---

## 🛠️ Tech Stack

- React (Vite)
- React Router DOM
- Context API
- Redux Toolkit
- React Query (`@tanstack/react-query`)
- Material UI (MUI)
- DummyJSON API

---

## 🌐 API Used

- https://dummyjson.com/products

---

## 📂 Project Structure

```
src/
├── Api/
│   └── productApi.js              # Product fetch helpers (list, single)
├── App.jsx                        # Routes + lazy-loaded pages
├── Layout/
│   └── Layout.jsx                 # Shared layout (Navbar + <Outlet />)
├── components/
│   ├── NavBar.jsx                 # Search, wishlist, cart, theme/view toggles
│   ├── checkout/                  # One component per checkout step
│   │   ├── StepContact.jsx
│   │   ├── StepShipping.jsx
│   │   ├── StepDelivery.jsx
│   │   ├── StepPayment.jsx
│   │   └── StepReview.jsx
│   ├── common/                    # Shared UI states
│   │   ├── LoadingState.jsx
│   │   ├── ErrorState.jsx
│   │   └── EmptyState.jsx
│   ├── products/
│   │   ├── ProductCard.jsx
│   │   ├── ProductFilters.jsx     # Price, rating, brand, availability
│   │   ├── ProductSort.jsx
│   │   └── ProductPagination.jsx
│   ├── search/
│   │   └── SearchBar.jsx          # Suggestions + recent search history
│   └── wishlist/
│       └── WishlistButton.jsx
├── context/
│   └── ThemeContext.jsx           # Dark/light mode + grid/list view
├── features/
│   ├── cartSlice.js
│   ├── wishlistSlice.js
│   └── store.js
├── hooks/
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   ├── useSearchHistory.js
│   └── useSEO.js
├── pages/
│   ├── Home.jsx
│   ├── ProductDetails.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── OrderConfirmation.jsx
│   └── WishlistPage.jsx
└── utils/
    ├── checkoutValidation.js
    └── format.js                  # Currency, order IDs, delivery windows, card formatting
```

---

## ▶️ Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

---

## 📸 Screenshots

<img width="1366" height="674" alt="2" src="https://github.com/user-attachments/assets/7bd8baf1-c864-4353-8406-27838e0f1eb4" />
<img width="1355" height="730" alt="1" src="https://github.com/user-attachments/assets/ec5253b8-185b-4cba-9f24-27a1af2bfe3a" />
<img width="1359" height="727" alt="8" src="https://github.com/user-attachments/assets/d51c002f-d93d-4d7c-a9c2-df42adbd6c7c" />
<img width="1366" height="726" alt="7" src="https://github.com/user-attachments/assets/e5d9baec-d113-4225-bc27-234b98f0b3f1" />
<img width="1366" height="728" alt="6" src="https://github.com/user-attachments/assets/eca79937-e81d-4938-a86e-3518c9375f02" />
<img width="1366" height="599" alt="5" src="https://github.com/user-attachments/assets/5305169a-2ae2-4ce4-8390-be94b60b17bf" />
<img width="1366" height="642" alt="4" src="https://github.com/user-attachments/assets/5c359058-bf91-4cdc-9a99-4370a79b7e9c" />
<img width="1366" height="736" alt="3" src="https://github.com/user-attachments/assets/665afbe9-a124-4a43-a4f4-37abdaa62b3a" />

*(Screenshots reflect the original product catalog UI — new pages like Checkout, Order Confirmation, and Wishlist aren't pictured yet.)*
