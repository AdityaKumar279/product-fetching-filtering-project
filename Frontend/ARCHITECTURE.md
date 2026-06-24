# CodeVector Frontend Architecture

## 🏗️ Project Structure

```
src/
├── context/
│   └── ProductContext.jsx      # Global state & API logic (Axios)
├── components/
│   ├── FilterBar.jsx           # Category filter dropdown
│   ├── ProductCard.jsx         # Reusable product card component
│   └── ProductList.jsx         # Grid + Load More + States
├── hooks/
│   └── useProducts.js          # Custom hook for ProductContext
├── App.jsx                     # App wrapper with Provider
├── main.jsx                    # React DOM entry
└── index.css                   # Tailwind imports
```

## 📋 Component Breakdown

### ProductContext.jsx
**Role**: Global state management & API integration using React Context API

**State**:
- `products` - Array of product objects
- `loading` - Boolean for API call state
- `error` - Error message string
- `hasMore` - Boolean indicating more products available
- `nextCursor` - Cursor string for next pagination
- `selectedCategory` - Currently selected category filter

**Functions**:
- `fetchProducts(category, cursor)` - Axios call with smart append/replace logic
  - If `cursor` provided → append products (pagination)
  - If `cursor` null → replace products (category change)
- `handleCategoryChange(newCategory)` - Reset cursor and fetch new category
- `handleLoadMore()` - Fetch next batch using `nextCursor`

### FilterBar.jsx
**Role**: Category filter UI component

**Features**:
- Dropdown with 10 product categories
- Consumes `selectedCategory` and `handleCategoryChange` from context
- Displays active filter indicator
- Responsive design

### ProductCard.jsx
**Role**: Reusable product display component

**Props**:
- `product` - Single product object with `_id`, `name`, `price`, `category`

**Features**:
- Gradient background placeholder
- Product name with line clamping
- Category badge
- Price display with gradient text
- Hover effects for interactivity

### ProductList.jsx
**Role**: Grid layout with pagination & state handling

**Features**:
- Responsive CSS Grid (1→4 columns)
- Loading spinner during API calls
- Error alert display
- Empty state when no products
- "Load More" button (visible only if `hasMore`)
- Product count display
- End-of-data message

### useProducts.js
**Role**: Custom hook for easy context consumption

**Usage**:
```javascript
const { products, loading, error, handleLoadMore } = useProducts();
```

### App.jsx
**Role**: Root component with Provider wrapper

**Features**:
- Wraps app in `ProductProvider`
- Modern header with gradient
- Renders `FilterBar` + `ProductList`
- Clean footer
- Responsive layout

## 🔄 Data Flow

```
App (Provider wrapper)
  ↓
ProductContext (State + API)
  ↓
FilterBar → triggers handleCategoryChange
  ↓
ProductList → consumes products, loading, error, hasMore
  ↓
ProductCard × N → renders each product
```

## 📡 API Integration (Axios)

### Base URL
```
http://localhost:5000/api/products
```

### Request Format
```javascript
GET /api/products?category=Electronics&limit=20&cursor=base64string
```

### Response Format
```json
{
  "success": true,
  "data": [{ "_id": "...", "name": "...", "price": 100, "category": "Electronics" }],
  "nextCursor": "base64string",
  "hasMore": true,
  "count": 20
}
```

### Axios Implementation
- **GET request** with query parameters
- **Error handling** with try-catch
- **Smart append logic**: Uses cursor to detect pagination vs category change
- **Request cancellation** ready for future optimization

## 🎨 Tailwind CSS Patterns

### Grid Responsive
```html
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

### Gradient Effects
```html
bg-gradient-to-r from-blue-500 to-purple-500  <!-- Horizontal -->
bg-gradient-to-b from-gray-50 to-white        <!-- Vertical -->
```

### Interactive Elements
```html
hover:shadow-xl transition-all duration-200   <!-- Smooth hover -->
transform hover:scale-105 active:scale-95      <!-- Click feedback -->
focus:ring-2 focus:ring-blue-200               <!-- Keyboard focus -->
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```

### 3. Verify Backend
Ensure backend is running on `http://localhost:5000/api/products`

### 4. Build for Production
```bash
npm run build
```

## 🔧 Key Design Patterns

### 1. Context API
- Eliminates prop drilling
- Centralized state management
- All API logic in one place

### 2. Custom Hooks
- `useProducts()` for easy context access
- Error boundary ready

### 3. Component Composition
- Small, focused components
- Reusable ProductCard
- Modular filtering & listing

### 4. Smart API Logic
- Append on cursor → pagination
- Replace on null cursor → category change
- Loading state prevents race conditions

## 📊 Performance Tips

1. **Use Axios** - Request cancellation, interceptors
2. **Lean Objects** - Backend uses `.lean()` for speed
3. **Pagination** - Limit 20 items per request
4. **Grid Optimization** - CSS Grid (native, fast)
5. **Memoization** - `useCallback` prevents unnecessary re-renders

## 🐛 Debugging

### Context Not Working?
```javascript
// Use custom hook instead of useContext directly
const { products } = useProducts(); // Better error message
```

### API Errors?
- Check backend logs
- Verify CORS is enabled
- Check network tab in DevTools

### Layout Issues?
- Check Tailwind imports in index.css
- Verify `content` paths in tailwind.config.js

## 🎯 Future Enhancements

- [ ] Add search functionality
- [ ] Sort by price/name
- [ ] Wishlist feature
- [ ] Product detail modal
- [ ] Infinite scroll alternative
- [ ] Request cancellation on unmount
- [ ] Optimistic updates
