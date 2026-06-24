# CodeVector Frontend - Component-Based Architecture

A modern, modular React application featuring cursor-based pagination with React Context API for state management and Axios for API integration.

## 🏗️ Architecture Overview

This frontend uses a **Component-Based Architecture** with **React Context API** for centralized state management and **Axios** for API calls.

```
ProductProvider (Context)
  ├── FilterBar (Category Filter)
  ├── ProductList (Grid + Load More)
  │   └── ProductCard × N (Individual Products)
  └── Custom Hook: useProducts
```

## 📁 Project Structure

```
src/
├── context/
│   └── ProductContext.jsx      # Global state & Axios API
├── components/
│   ├── FilterBar.jsx           # Category dropdown filter
│   ├── ProductCard.jsx         # Reusable product card
│   └── ProductList.jsx         # Grid + pagination controls
├── hooks/
│   └── useProducts.js          # Custom hook for context
├── App.jsx                     # Root component with Provider
├── main.jsx                    # React entry point
└── index.css                   # Tailwind CSS imports
```

## 🚀 Features

- **React Context API**: Global state without prop drilling
- **Axios Integration**: Clean API calls with error handling
- **Smart Pagination**: Auto-append vs auto-replace logic
- **Responsive Grid**: 1→4 columns (mobile to desktop)
- **Category Filtering**: 10 product categories
- **Loading/Error States**: Professional UI feedback
- **Tailwind CSS**: Modern styling with gradients & animations

## ⚙️ Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
App opens at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## 📡 API Connection

**Backend URL**: `http://localhost:5000/api/products`

### Query Parameters
- `category` (optional): Filter by category
- `limit` (optional, default: 20): Items per request
- `cursor` (optional): For pagination

### Response Format
```json
{
  "success": true,
  "data": [{ "_id": "...", "name": "...", "price": 99, "category": "Electronics" }],
  "nextCursor": "base64string",
  "hasMore": true,
  "count": 20
}
```

## 📚 Component Documentation

### ProductContext.jsx
**Exports**: `ProductProvider`, `ProductContext`

**State Management**:
- `products` - Product array
- `loading` - API loading state
- `error` - Error message
- `hasMore` - Has more products?
- `nextCursor` - Next pagination cursor
- `selectedCategory` - Current filter

**Functions**:
- `fetchProducts(category, cursor)` - Axios GET with smart logic
- `handleCategoryChange(newCategory)` - Reset & fetch
- `handleLoadMore()` - Pagination trigger

### FilterBar.jsx
Dropdown menu with 10 categories. Triggers `handleCategoryChange` on selection.

### ProductCard.jsx
Displays single product: name, category badge, price with gradient effects.

### ProductList.jsx
Renders grid of ProductCards with:
- Loading spinner
- Error alerts
- Empty state
- "Load More" button
- End-of-data message

### useProducts() Hook
Custom hook for easy context consumption:
```javascript
const { products, loading, error, handleLoadMore } = useProducts();
```

## 🔄 Data Flow Example

1. **User selects category** → `FilterBar` calls `handleCategoryChange`
2. **Context fetches** → `ProductContext` runs `fetchProducts(category, null)`
3. **Products load** → `ProductList` receives new products array
4. **Cards render** → `ProductCard` × N display in grid
5. **User clicks "Load More"** → `ProductList` calls `handleLoadMore()`
6. **Pagination fetch** → `ProductContext` runs `fetchProducts(category, nextCursor)`
7. **Products append** → New items added to existing array

## 🎨 Styling Highlights

- **Gradient backgrounds**: Header, buttons, cards
- **Hover effects**: Shadow lift, color change, scale
- **Responsive breakpoints**: sm, lg, xl Tailwind classes
- **Loading animation**: Spinning gradient spinner
- **Icons**: Emojis for visual interest

## 🛠️ Key Technologies

| Technology | Purpose |
|-----------|---------|
| React 18 | UI library |
| Vite | Fast bundler |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| Context API | State management |

## 📋 How It Works

### Smart Append/Replace Logic
```javascript
if (cursor) {
  // Pagination: APPEND new products
  setProducts(prev => [...prev, ...data.data]);
} else {
  // Category change: REPLACE products
  setProducts(data.data);
}
```

This ensures clean pagination without duplicates.

### Cursor-Based Pagination
- Cursor = Base64 string of `createdAt` + `_id`
- No off-by-one errors
- Handles real-time data changes safely
- Works with compound MongoDB index

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend not found | Verify running on localhost:5000 |
| Empty product list | Run `npm run seed` on backend |
| Styling broken | Check `npm install` and index.css imports |
| Context error | Use `useProducts()` hook instead of `useContext` |

## 🎓 Learning Resources

- [React Context API](https://react.dev/reference/react/useContext)
- [Axios Documentation](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cursor-Based Pagination](https://en.wikipedia.org/wiki/Pagination)

## 📝 Next Steps

1. Verify backend is running: `npm run seed && npm start` (in Backend folder)
2. Start frontend: `npm install && npm run dev`
3. Browse products!

For detailed architecture info, see [ARCHITECTURE.md](./ARCHITECTURE.md)

