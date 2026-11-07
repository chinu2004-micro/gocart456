# VELLORA REST API CONTRACT SPECIFICATION
**Version:** 1.0.0 (Ready for Node.js / Java Spring / Go backend services)
**Currency & Money Standard:** Stored strictly as 64-bit integer minor units (INR Paise: ₹1.00 = 100 paise).

---

## 1. Authentication & User Profile
- `POST /api/v1/auth/register`
  - Body: `{ name, userId, email, contact, street, city, state, pincode, password }`
  - Response 201: `{ token, user: { id, userId, name, email } }`
- `POST /api/v1/auth/login`
  - Body: `{ identifier, password }` // identifier accepts userId or email
  - Response 200: `{ token, user }`
- `POST /api/v1/auth/forgot-password`
  - Body: `{ email }`
  - Response 200: `{ message: "Reset link dispatched" }`
- `GET /api/v1/user/profile` (Bearer Token)
  - Response 200: `{ id, userId, name, email, contact, addresses, preferences }`
- `PUT /api/v1/user/profile` (Bearer Token)
  - Body: `{ name, contact, preferences }`
- `POST /api/v1/user/addresses`
  - Body: `{ name, contact, street, city, state, pincode, isDefault }`

---

## 2. Catalog & Navigation
- `GET /api/v1/categories/tree`
  - Response 200: `CategoryNode[]` (Hierarchical multi-level categories)
- `GET /api/v1/products`
  - Query Params: `?search=&category=&subCategory=&clothingGender=&brand=&minPrice=&maxPrice=&minRating=&inStock=&sort=&page=&limit=`
  - Response 200: `{ products: Product[], total, page, totalPages }`
- `GET /api/v1/products/:slug`
  - Response 200: `Product` with variants, full specifications, ratings histogram, and reviews.
- `GET /api/v1/products/autocomplete?q=keyword`
  - Response 200: `{ items: { id, name, slug, image, price, category }[], suggestions: string[] }`

---

## 3. Cart & Promotional Discounts
- `POST /api/v1/coupons/validate`
  - Body: `{ code, cartSubtotalPaise }`
  - Response 200: `{ valid: true, discountPaise: number, coupon: Coupon }`
  - Response 400: `{ valid: false, message: string }`

---

## 4. Orders, Payments & Tracking
- `POST /api/v1/orders/checkout` (Bearer Token or Guest Session)
  - Body:
    ```json
    {
      "items": [{ "productId": "vel-prod-1", "quantity": 1, "variantId": "var-1-1" }],
      "deliveryAddressId": "addr-1",
      "deliveryOption": "Standard",
      "paymentMethod": "Card",
      "paymentToken": "tok_simulated_secure_success",
      "couponCode": "VELLORA10"
    }
    ```
  - Response 201: `{ orderId: "VEL-2611-000123", grandTotalPaise: 2972538, status: "PLACED" }`
- `GET /api/v1/orders` (Bearer Token)
  - Response 200: `Order[]`
- `GET /api/v1/orders/:orderId`
  - Response 200: `Order` with live tracking event timeline and itemized tax invoice.
- `POST /api/v1/orders/:orderId/cancel`
- `POST /api/v1/orders/:orderId/return`

