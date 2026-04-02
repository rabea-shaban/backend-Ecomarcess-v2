# 🛒 Exclusive E-Commerce — Backend API

> REST API كامل لمتجر إلكتروني مبني بـ Node.js + Express + MongoDB مع Google OAuth و JWT Authentication

---

## 📁 هيكل المشروع

```
back/
├── src/
│   ├── config/
│   │   ├── db.js              → الاتصال بقاعدة البيانات MongoDB
│   │   ├── passport.js        → إعداد Google OAuth Strategy
│   │   └── swagger.js         → إعداد Swagger API Documentation
│   │
│   ├── controllers/
│   │   ├── auth.controller.js      → منطق Register / Login / Profile
│   │   ├── category.controller.js  → منطق CRUD للكاتيجوريز
│   │   ├── product.controller.js   → منطق CRUD للمنتجات
│   │   └── order.controller.js     → منطق إنشاء وجلب وإلغاء الأوردرات
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js      → التحقق من JWT Token
│   │   ├── role.middleware.js      → التحقق من صلاحية الـ Admin
│   │   ├── upload.js              → رفع الصور بـ Multer
│   │   └── validate.middleware.js  → Validation بـ Joi
│   │
│   ├── models/
│   │   ├── User.Model.js      → Schema بيانات المستخدم
│   │   ├── category.model.js  → Schema الكاتيجوري
│   │   ├── product.model.js   → Schema المنتج
│   │   └── order.model.js     → Schema الأوردر
│   │
│   ├── routes/
│   │   ├── auth.routes.js      → Routes الـ Authentication
│   │   ├── category.routes.js  → Routes الكاتيجوريز
│   │   ├── product.routes.js   → Routes المنتجات
│   │   └── order.routes.js     → Routes الأوردرات
│   │
│   ├── validators/
│   │   ├── users.validation.js    → Joi Schema للـ Register
│   │   ├── category.validation.js → Joi Schema للكاتيجوري
│   │   └── product.validation.js  → Joi Schema للمنتج
│   │
│   ├── uploads/               → مجلد الصور المرفوعة
│   └── App.js                 → إعداد الـ Express App
│
├── server.js                  → نقطة البداية — بيشغل السيرفر
├── .env                       → المتغيرات البيئية
└── package.json
```

---

## ⚙️ التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|-----------|
| **Node.js** | بيئة تشغيل الـ JavaScript على السيرفر |
| **Express.js v5** | Framework لبناء الـ REST API |
| **MongoDB** | قاعدة البيانات NoSQL |
| **Mongoose** | ODM للتعامل مع MongoDB |
| **JWT (jsonwebtoken)** | توليد والتحقق من الـ Tokens |
| **bcrypt** | تشفير كلمات المرور |
| **Passport.js** | إدارة الـ Authentication Strategies |
| **passport-google-oauth20** | تسجيل الدخول بحساب Google |
| **Multer** | رفع الصور والملفات |
| **Joi** | Validation بيانات الـ Request |
| **CORS** | السماح للفرونت بالتواصل مع الباك |
| **Morgan** | Logging الـ HTTP Requests |
| **dotenv** | إدارة المتغيرات البيئية |
| **swagger-ui-express** | عرض الـ API Documentation |
| **swagger-jsdoc** | توليد الـ Swagger Spec |

---

## 🚀 طريقة التشغيل

### 1. تثبيت الـ Dependencies
```bash
npm install
```

### 2. إعداد ملف `.env`
```env
PORT=5000
DB_URL=mongodb://127.0.0.1:27017/Ecommerce
JWT_SECRET=mysupersecret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. تشغيل السيرفر
```bash
# Development
npm run dev

# Production
node server.js
```

### 4. فتح الـ API Docs
```
http://localhost:5000/api-docs
```

---

## 🔐 نظام الـ Authentication

### العادي (Email & Password)
```
POST /auth/register  →  تسجيل حساب جديد
POST /auth/login     →  تسجيل دخول وإرجاع JWT Token
```

**الـ Flow:**
1. المستخدم بيبعت name + email + password
2. السيرفر بيتحقق إن الإيميل مش موجود
3. بيعمل hash للباسورد بـ bcrypt (10 rounds)
4. بيحفظ المستخدم في قاعدة البيانات
5. عند الـ Login بيرجع JWT Token صالح لمدة 1 يوم

### Google OAuth 2.0
```
GET /auth/google           →  بيعمل Redirect لـ Google
GET /auth/google/callback  →  Google بيرجع هنا بعد الموافقة
```

**الـ Flow:**
1. المستخدم بيضغط "Sign in with Google"
2. بيتحول لصفحة Google OAuth
3. بعد الموافقة Google بيبعت الـ profile للـ callback
4. السيرفر بيدور على المستخدم بالـ googleId أو الإيميل
5. لو موجود بالإيميل بس → بيربط الـ googleId بحسابه
6. لو مش موجود خالص → بيعمل حساب جديد تلقائي
7. بيولد JWT Token ويعمل Redirect للفرونت مع الـ Token في الـ URL

### حماية الـ Routes
كل route محتاج تسجيل دخول لازم يبعت الـ Token في الـ Header:
```
Authorization: Bearer <token>
```

---

## 👤 User Model

```js
{
  name:      String (required)
  email:     String (required, unique)
  password:  String (optional — مش مطلوب لو Google)
  googleId:  String (optional — بيتحط لو سجل بـ Google)
  address:   String (default: "")
  role:      String (enum: ["user", "admin"], default: "user")
  createdAt: Date
}
```

---

## 📦 Category Model

```js
{
  name:        String (required, min: 3, max: 50)
  description: String (required, min: 5, max: 200)
  image:       String (اسم الملف المرفوع)
  createdAt:   Date
}
```

---

## 🛍️ Product Model

```js
{
  name:        String (required, min: 3, max: 50)
  description: String (required, min: 5, max: 200)
  price:       Number (required, min: 0)
  image:       String (اسم الملف، default: null)
  category:    ObjectId → ref: Category (required)
  stock:       Number (default: 0)
  rating:      Number (default: 0)
  numReviews:  Number (default: 0)
  createdAt:   Date
  updatedAt:   Date
}
```

---

## 🧾 Order Model

```js
{
  user:    ObjectId → ref: User (required)
  items: [
    {
      productId: ObjectId → ref: Product
      name:      String
      price:     Number
      quantity:  Number
      image:     String
    }
  ]
  billing: {
    firstName:     String (required)
    companyName:   String
    streetAddress: String (required)
    apartment:     String
    city:          String (required)
    phone:         String (required)
    email:         String (required)
  }
  paymentMethod: String (enum: ["bank", "cash"], default: "cash")
  total:         Number (required)
  status:        String (enum: ["pending", "processing", "delivered", "cancelled"], default: "pending")
  createdAt:     Date
  updatedAt:     Date
}
```

---

## 🗺️ API Endpoints الكاملة

### 🔐 Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | تسجيل حساب جديد |
| POST | `/auth/login` | ❌ | تسجيل دخول |
| GET | `/auth/google` | ❌ | بدء Google OAuth |
| GET | `/auth/google/callback` | ❌ | Callback بعد Google |
| GET | `/auth/profile` | ✅ User | جلب بيانات المستخدم |
| PUT | `/auth/profile` | ✅ User | تحديث البيانات والعنوان والباسورد |

### 📂 Categories
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/categories` | ❌ | جلب كل الكاتيجوريز |
| GET | `/categories/:id` | ❌ | جلب كاتيجوري بالـ ID |
| POST | `/categories` | ✅ Admin | إنشاء كاتيجوري جديدة + صورة |
| PUT | `/categories/:id` | ✅ Admin | تحديث كاتيجوري + صورة |
| DELETE | `/categories/:id` | ✅ Admin | حذف كاتيجوري + صورتها |

### 🛍️ Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/products` | ❌ | جلب كل المنتجات |
| GET | `/products/:id` | ❌ | جلب منتج بالـ ID |
| POST | `/products` | ✅ Admin | إنشاء منتج جديد + صورة |
| PUT | `/products/:id` | ✅ Admin | تحديث منتج + صورة |
| DELETE | `/products/:id` | ✅ Admin | حذف منتج |

### 🧾 Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/orders` | ✅ User | إنشاء أوردر جديد |
| GET | `/orders` | ✅ User | جلب كل أوردرات المستخدم |
| PATCH | `/orders/:id/cancel` | ✅ User | إلغاء أوردر (pending فقط) |

---

## 🛡️ Middleware

### auth.middleware.js
- بيتحقق من وجود الـ `Authorization: Bearer <token>` في الـ Header
- بيعمل verify للـ JWT Token
- لو صح بيحط بيانات المستخدم في `req.user` ويكمل
- لو غلط بيرجع `401 Unauthorized`

### role.middleware.js
- بيتحقق إن `req.user.role === "admin"`
- بيتستخدم بعد الـ auth middleware
- لو مش admin بيرجع `403 Forbidden`

### upload.js (Multer)
- بيحفظ الصور في مجلد `src/uploads/`
- اسم الملف: `timestamp-originalname` (مثال: `1773586922226-dress.jpg`)
- بيقبل صور بس (image/*)
- لو ملف مش صورة بيرجع error

### validate.middleware.js
- بياخد Joi Schema ويعمل validate على `req.body`
- لو في error بيرجع `400` مع رسالة الـ validation
- بيتستخدم في Register والـ Category والـ Product

---

## 📸 رفع الصور

الصور بتتحفظ في `src/uploads/` وبتتعرض على:
```
http://localhost:5000/uploads/اسم-الصورة
```

مثال:
```
http://localhost:5000/uploads/1773586922226-Women-Summer-Dress.jpg
```

---

## 📋 Order Status Flow

```
pending → processing → delivered
   ↓
cancelled (يمكن الإلغاء من pending فقط)
```

| Status | اللون في الفرونت | المعنى |
|--------|-----------------|--------|
| pending | 🟡 Yellow | الأوردر اتسجل وبينتظر |
| processing | 🔵 Blue | جاري التجهيز |
| delivered | 🟢 Green | وصل للعميل |
| cancelled | 🔴 Red | اتلغى |

---

## 📖 API Documentation (Swagger)

بعد تشغيل السيرفر افتح:
```
http://localhost:5000/api-docs
```

**مميزات الـ Swagger:**
- تقدر تتست كل الـ endpoints مباشرة من المتصفح
- فيه examples جاهزة لكل request
- تقدر تعمل Authorize بالـ JWT Token وكل الـ protected routes هتشتغل
- الـ topbar بلون المشروع `#DB4444`
- الـ Authorization بتتحفظ من غير ما تكتبها كل مرة

**طريقة الـ Authorization في Swagger:**
1. اعمل Login من `/auth/login`
2. انسخ الـ `token` من الـ Response
3. اضغط زرار **Authorize** في أعلى الصفحة
4. اكتب: `Bearer <token>`
5. اضغط **Authorize** — دلوقتي كل الـ protected routes هتشتغل

---

## 🌐 CORS

السيرفر بيقبل requests من:
- `http://localhost:3000`
- `http://localhost:5173` (Vite dev server)
- `https://front-e-commerce-v2.vercel.app` (Production)

---

## 🔑 Google OAuth Setup

1. روح على [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Credentials → Create OAuth 2.0 Client ID
3. في **Authorized JavaScript origins** أضف:
   ```
   http://localhost:5173
   ```
4. في **Authorized redirect URIs** أضف:
   ```
   http://localhost:5000/auth/google/callback
   ```
5. انسخ الـ `Client ID` و `Client Secret` وحطهم في `.env`

---

## 📦 الـ Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cors": "^2.8.6",
  "dotenv": "^17.3.1",
  "express": "^5.2.1",
  "express-validator": "^7.3.1",
  "joi": "^18.0.2",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.3.1",
  "morgan": "^1.10.1",
  "multer": "^2.1.1",
  "nodemon": "^3.1.14",
  "passport": "^0.7.0",
  "passport-google-oauth20": "^2.0.0",
  "swagger-jsdoc": "latest",
  "swagger-ui-express": "latest"
}
```

---

## 👨‍💻 Made by Digilians Team
