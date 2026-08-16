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

<img width="1355" height="730" alt="1" src="https://github.com/user-attachments/assets/ec5253b8-185b-4cba-9f24-27a1af2bfe3a" />
<img width="1366" height="728" alt="6" src="https://github.com/user-attachments/assets/eca79937-e81d-4938-a86e-3518c9375f02" />
<img width="1366" height="599" alt="5" src="https://github.com/user-attachments/assets/5305169a-2ae2-4ce4-8390-be94b60b17bf" />
<img width="1292" height="601" alt="13" src="https://github.com/user-attachments/assets/ece7c7a4-b60d-4188-95f5-df0b67b515ca" />
<img width="1366" height="642" alt="4" src="https://github.com/user-attachments/assets/5c359058-bf91-4cdc-9a99-4370a79b7e9c" />
<img width="1366" height="736" alt="3" src="https://github.com/user-attachments/assets/665afbe9-a124-4a43-a4f4-37abdaa62b3a" />
<img width="1366" height="647" alt="11" src="https://github.com/user-attachments/assets/5b4722d6-74d3-4bfb-bde8-77cab35ef11d" />
<img width="1363" height="629" alt="10" src="https://github.com/user-attachments/assets/886cd87a-d365-4f6e-b642-ec61fbfa709d" />
<img width="1366" height="650" alt="9" src="https://github.com/user-attachments/assets/9a506005-b9e1-4b19-87b4-a2f06a234c6e" />
<img width="1349" height="630" alt="8" src="https://github.com/user-attachments/assets/0bca7c3a-a07f-438c-912b-17327d331f42" />
<img width="1366" height="600" alt="7" src="https://github.com/user-attachments/assets/e02e7412-d8c3-4028-bb6c-1be7b0a4aa76" />
<img width="1366" height="633" alt="6" src="https://github.com/user-attachments/assets/cc815888-b2ab-4497-8ccb-8e419022fd1b" />
<img width="1366" height="661" alt="5" src="https://github.com/user-attachments/assets/0229b655-68c3-4c3f-85a1-73a5f013f392" />
<img width="1320" height="656" alt="4" src="https://github.com/user-attachments/assets/c83336a9-4721-44df-ac92-bc7dcb18bdb5" />
<img width="1346" height="647" alt="3" src="https://github.com/user-attachments/assets/5bb32648-555d-4cec-8faf-d04c68fcb7ed" />
<img width="1366" height="686" alt="2" src="https://github.com/user-attachments/assets/8874f76c-d2ef-4d94-a4db-9e24a7fe9699" />
<img width="1353" height="696" alt="1" src="https://github.com/user-attachments/assets/c32e3257-664c-4d77-b892-d08cb678dede" />
<img width="1366" height="647" alt="12" src="https://github.com/user-attachments/assets/518bab06-374a-4828-b4ba-bd90e3ef918d" />


