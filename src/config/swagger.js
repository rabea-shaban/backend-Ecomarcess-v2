const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Exclusive E-Commerce API",
      version: "1.0.0",
      description: "Full API documentation for Exclusive E-Commerce platform",
    },
    servers: [{ url: "http://localhost:5000", description: "Development Server" }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        // ========== AUTH ==========
        RegisterBody: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Ahmed Mohamed" },
            email: { type: "string", example: "ahmed@example.com" },
            password: { type: "string", example: "123456" },
            role: { type: "string", enum: ["user", "admin"], example: "user" },
          },
        },
        LoginBody: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "ahmed@example.com" },
            password: { type: "string", example: "123456" },
          },
        },
        UpdateProfileBody: {
          type: "object",
          properties: {
            name: { type: "string", example: "Ahmed Ali" },
            email: { type: "string", example: "ahmed.ali@example.com" },
            address: { type: "string", example: "123 Cairo Street" },
            password: { type: "string", example: "newpassword123" },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64abc123def456" },
            name: { type: "string", example: "Ahmed Mohamed" },
            email: { type: "string", example: "ahmed@example.com" },
            role: { type: "string", example: "user" },
            address: { type: "string", example: "123 Cairo Street" },
            googleId: { type: "string", example: "107386887737466640283" },
            createdAt: { type: "string", example: "2026-01-01T00:00:00.000Z" },
          },
        },
        // ========== CATEGORY ==========
        CategoryBody: {
          type: "object",
          required: ["name", "description"],
          properties: {
            name: { type: "string", example: "Women's Fashion" },
            description: { type: "string", example: "All women fashion products" },
            image: { type: "string", format: "binary" },
          },
        },
        CategoryResponse: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64cat123def456" },
            name: { type: "string", example: "Women's Fashion" },
            description: { type: "string", example: "All women fashion products" },
            image: { type: "string", example: "1773585705968-Womans-Fashion.png" },
            createdAt: { type: "string", example: "2026-01-01T00:00:00.000Z" },
          },
        },
        // ========== PRODUCT ==========
        ProductBody: {
          type: "object",
          required: ["name", "description", "price", "category"],
          properties: {
            name: { type: "string", example: "Women Summer Dress" },
            description: { type: "string", example: "Beautiful summer dress for women" },
            price: { type: "number", example: 29.99 },
            category: { type: "string", example: "64cat123def456" },
            stock: { type: "number", example: 100 },
            image: { type: "string", format: "binary" },
          },
        },
        ProductResponse: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64prod123def456" },
            name: { type: "string", example: "Women Summer Dress" },
            description: { type: "string", example: "Beautiful summer dress for women" },
            price: { type: "number", example: 29.99 },
            image: { type: "string", example: "1773586922226-Women-Summer-Dress.jpg" },
            category: { type: "string", example: "64cat123def456" },
            stock: { type: "number", example: 100 },
            rating: { type: "number", example: 4.5 },
            numReviews: { type: "number", example: 12 },
            createdAt: { type: "string", example: "2026-01-01T00:00:00.000Z" },
          },
        },
        // ========== ORDER ==========
        OrderItem: {
          type: "object",
          properties: {
            productId: { type: "string", example: "64prod123def456" },
            name: { type: "string", example: "Women Summer Dress" },
            price: { type: "number", example: 29.99 },
            quantity: { type: "number", example: 2 },
            image: { type: "string", example: "1773586922226-Women-Summer-Dress.jpg" },
          },
        },
        BillingDetails: {
          type: "object",
          required: ["firstName", "streetAddress", "city", "phone", "email"],
          properties: {
            firstName: { type: "string", example: "Ahmed" },
            companyName: { type: "string", example: "Digilians" },
            streetAddress: { type: "string", example: "123 Tahrir Square" },
            apartment: { type: "string", example: "Apt 4B" },
            city: { type: "string", example: "Cairo" },
            phone: { type: "string", example: "+201012345678" },
            email: { type: "string", example: "ahmed@example.com" },
          },
        },
        CreateOrderBody: {
          type: "object",
          required: ["items", "billing", "total"],
          properties: {
            items: { type: "array", items: { $ref: "#/components/schemas/OrderItem" } },
            billing: { $ref: "#/components/schemas/BillingDetails" },
            paymentMethod: { type: "string", enum: ["bank", "cash"], example: "cash" },
            total: { type: "number", example: 59.98 },
          },
        },
        OrderResponse: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64order123def456" },
            user: { type: "string", example: "64abc123def456" },
            items: { type: "array", items: { $ref: "#/components/schemas/OrderItem" } },
            billing: { $ref: "#/components/schemas/BillingDetails" },
            paymentMethod: { type: "string", example: "cash" },
            total: { type: "number", example: 59.98 },
            status: { type: "string", enum: ["pending", "processing", "delivered", "cancelled"], example: "pending" },
            createdAt: { type: "string", example: "2026-01-01T00:00:00.000Z" },
          },
        },
        // ========== ERROR ==========
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Something went wrong" },
          },
        },
      },
    },
    paths: {
      // ========== AUTH ==========
      "/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterBody" },
                examples: {
                  user: { summary: "Register as user", value: { name: "Ahmed Mohamed", email: "ahmed@example.com", password: "123456" } },
                  admin: { summary: "Register as admin", value: { name: "Admin User", email: "admin@example.com", password: "admin123", role: "admin" } },
                },
              },
            },
          },
          responses: {
            201: {
              description: "User created successfully",
              content: { "application/json": { example: { message: "User created successfully", user: { id: "64abc123", name: "Ahmed Mohamed", email: "ahmed@example.com", role: "user" } } } },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  examples: {
                    exists: { summary: "Email taken", value: { message: "User already exists" } },
                    missing: { summary: "Missing fields", value: { message: "Name, email and password are required" } },
                    invalidRole: { summary: "Invalid role", value: { message: "Invalid role" } },
                  },
                },
              },
            },
            500: { description: "Server error", content: { "application/json": { example: { message: "Register failed" } } } },
          },
        },
      },

      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login with email and password",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginBody" },
                examples: {
                  success: { summary: "Valid login", value: { email: "ahmed@example.com", password: "123456" } },
                  wrong: { summary: "Wrong password", value: { email: "ahmed@example.com", password: "wrongpass" } },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
              content: { "application/json": { example: { message: "Login successful", token: "eyJhbGciOiJIUzI1NiJ9...", user: { id: "64abc123", name: "Ahmed Mohamed", email: "ahmed@example.com", role: "user" } } } },
            },
            400: { description: "Missing fields", content: { "application/json": { example: { message: "Email and password are required" } } } },
            401: { description: "Invalid credentials", content: { "application/json": { example: { message: "Invalid email or password" } } } },
          },
        },
      },

      "/auth/google": {
        get: {
          tags: ["Auth"],
          summary: "Login with Google OAuth",
          description: "افتح الـ URL ده في المتصفح مباشرة — بيعمل redirect لـ Google",
          responses: { 302: { description: "Redirect to Google OAuth consent screen" } },
        },
      },

      "/auth/google/callback": {
        get: {
          tags: ["Auth"],
          summary: "Google OAuth callback",
          description: "Google بيعمل redirect هنا بعد الـ login — بيرجع JWT في الـ URL للفرونت",
          responses: { 302: { description: "Redirect to frontend with token" } },
        },
      },

      "/auth/profile": {
        get: {
          tags: ["Auth"],
          summary: "Get current user profile",
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Profile fetched successfully",
              content: {
                "application/json": {
                  example: {
                    user: { _id: "64abc123", name: "Ahmed Mohamed", email: "ahmed@example.com", role: "user", address: "123 Cairo Street", createdAt: "2026-01-01T00:00:00.000Z" },
                  },
                },
              },
            },
            401: { description: "Unauthorized", content: { "application/json": { example: { message: "Unauthorized: Token missing" } } } },
          },
        },
        put: {
          tags: ["Auth"],
          summary: "Update user profile",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateProfileBody" },
                examples: {
                  name: { summary: "Update name", value: { name: "Ahmed Ali" } },
                  address: { summary: "Update address", value: { address: "456 Alexandria Road" } },
                  password: { summary: "Update password", value: { password: "newpassword123" } },
                  all: { summary: "Update all", value: { name: "Ahmed Ali", email: "ahmed.ali@example.com", address: "456 Alexandria Road", password: "newpassword123" } },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Profile updated successfully",
              content: { "application/json": { example: { message: "Profile updated successfully", user: { id: "64abc123", name: "Ahmed Ali", email: "ahmed.ali@example.com", role: "user", address: "456 Alexandria Road" } } } },
            },
            400: { description: "Email already exists", content: { "application/json": { example: { message: "Email already exists" } } } },
            401: { description: "Unauthorized" },
            404: { description: "User not found", content: { "application/json": { example: { message: "User not found" } } } },
          },
        },
      },

      // ========== CATEGORIES ==========
      "/categories": {
        get: {
          tags: ["Categories"],
          summary: "Get all categories",
          responses: {
            200: {
              description: "Categories fetched successfully",
              content: {
                "application/json": {
                  example: {
                    message: "Categories fetched successfully",
                    categories: [
                      { _id: "64cat123", name: "Women's Fashion", description: "All women fashion products", image: "womens-fashion.png", createdAt: "2026-01-01T00:00:00.000Z" },
                      { _id: "64cat456", name: "Electronics", description: "All electronics products", image: "electronics.jpg", createdAt: "2026-01-01T00:00:00.000Z" },
                    ],
                  },
                },
              },
            },
            500: { description: "Server error" },
          },
        },
        post: {
          tags: ["Categories"],
          summary: "Create a new category (Admin only)",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: { $ref: "#/components/schemas/CategoryBody" },
                examples: {
                  fashion: { summary: "Women's Fashion", value: { name: "Women's Fashion", description: "All women fashion products" } },
                  electronics: { summary: "Electronics", value: { name: "Electronics", description: "All electronics and gadgets" } },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Category created successfully",
              content: { "application/json": { example: { message: "Category created successfully", data: { _id: "64cat123", name: "Women's Fashion", description: "All women fashion products", image: "womens-fashion.png" } } } },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  examples: {
                    noImage: { summary: "No image", value: { message: "Image is required" } },
                    shortName: { summary: "Name too short", value: { message: "\"name\" length must be at least 3 characters long" } },
                  },
                },
              },
            },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin only", content: { "application/json": { example: { message: "Forbidden: Admins only" } } } },
          },
        },
      },

      "/categories/{id}": {
        get: {
          tags: ["Categories"],
          summary: "Get category by ID",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", example: "64cat123def456" } }],
          responses: {
            200: {
              description: "Category fetched successfully",
              content: { "application/json": { example: { message: "Category fetched successfully", data: { _id: "64cat123", name: "Women's Fashion", description: "All women fashion products", image: "womens-fashion.png" } } } },
            },
            404: { description: "Category not found", content: { "application/json": { example: { message: "Category not found" } } } },
          },
        },
        put: {
          tags: ["Categories"],
          summary: "Update category (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", example: "64cat123def456" } }],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Men's Fashion" },
                    description: { type: "string", example: "All men fashion products" },
                    image: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Category updated successfully", content: { "application/json": { example: { message: "Category updated successfully", data: { _id: "64cat123", name: "Men's Fashion", description: "All men fashion products" } } } } },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin only" },
            404: { description: "Category not found" },
          },
        },
        delete: {
          tags: ["Categories"],
          summary: "Delete category (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", example: "64cat123def456" } }],
          responses: {
            200: { description: "Category deleted successfully", content: { "application/json": { example: { message: "Category deleted successfully" } } } },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin only" },
            404: { description: "Category not found" },
          },
        },
      },

      // ========== PRODUCTS ==========
      "/products": {
        get: {
          tags: ["Products"],
          summary: "Get all products",
          responses: {
            200: {
              description: "Products fetched successfully",
              content: {
                "application/json": {
                  example: {
                    message: "products fetched successfully",
                    products: [
                      { _id: "64prod123", name: "Women Summer Dress", description: "Beautiful summer dress", price: 29.99, image: "dress.jpg", category: "64cat123", stock: 100, rating: 4.5, numReviews: 12 },
                      { _id: "64prod456", name: "Men Watch", description: "Luxury men watch", price: 99.99, image: "watch.jpg", category: "64cat456", stock: 50, rating: 4.8, numReviews: 25 },
                    ],
                  },
                },
              },
            },
            500: { description: "Server error" },
          },
        },
        post: {
          tags: ["Products"],
          summary: "Create a new product (Admin only)",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: { $ref: "#/components/schemas/ProductBody" },
                examples: {
                  dress: { summary: "Women Summer Dress", value: { name: "Women Summer Dress", description: "Beautiful summer dress for women", price: 29.99, category: "64cat123def456", stock: 100 } },
                  watch: { summary: "Men Watch", value: { name: "Men Watch", description: "Luxury men watch", price: 99.99, category: "64cat456def789", stock: 50 } },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Product created successfully",
              content: { "application/json": { example: { message: "product created successfully", products: { _id: "64prod123", name: "Women Summer Dress", price: 29.99, stock: 100 } } } },
            },
            400: {
              description: "Validation error",
              content: {
                "application/json": {
                  examples: {
                    missingName: { summary: "Missing name", value: { message: "\"name\" is required" } },
                    missingCategory: { summary: "Missing category", value: { message: "\"category\" is required" } },
                    negativePrice: { summary: "Negative price", value: { message: "\"price\" must be greater than or equal to 0" } },
                  },
                },
              },
            },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin only", content: { "application/json": { example: { message: "Forbidden: Admins only" } } } },
          },
        },
      },

      "/products/{id}": {
        get: {
          tags: ["Products"],
          summary: "Get product by ID",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", example: "64prod123def456" } }],
          responses: {
            200: {
              description: "Product fetched successfully",
              content: { "application/json": { example: { message: "product fetched successfully", products: { _id: "64prod123", name: "Women Summer Dress", price: 29.99, stock: 100, rating: 4.5 } } } },
            },
            500: { description: "Server error" },
          },
        },
        put: {
          tags: ["Products"],
          summary: "Update product (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", example: "64prod123def456" } }],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Women Winter Dress" },
                    description: { type: "string", example: "Beautiful winter dress for women" },
                    price: { type: "number", example: 39.99 },
                    stock: { type: "number", example: 80 },
                    category: { type: "string", example: "64cat123def456" },
                    image: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Product updated successfully", content: { "application/json": { example: { message: "product updated successfully", data: { _id: "64prod123", name: "Women Winter Dress", price: 39.99 } } } } },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin only" },
            404: { description: "Product not found", content: { "application/json": { example: { message: "product not found" } } } },
          },
        },
        delete: {
          tags: ["Products"],
          summary: "Delete product (Admin only)",
          security: [{ BearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", example: "64prod123def456" } }],
          responses: {
            200: { description: "Product deleted successfully", content: { "application/json": { example: { message: "product deleted successfully" } } } },
            400: { description: "No ID provided", content: { "application/json": { example: { message: "No data found for the given ID." } } } },
            401: { description: "Unauthorized" },
            403: { description: "Forbidden - Admin only" },
          },
        },
      },

      // ========== ORDERS ==========
      "/orders": {
        post: {
          tags: ["Orders"],
          summary: "Place a new order",
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateOrderBody" },
                examples: {
                  cash: {
                    summary: "Cash on delivery",
                    value: {
                      items: [{ productId: "64prod123", name: "Women Summer Dress", price: 29.99, quantity: 2, image: "dress.jpg" }],
                      billing: { firstName: "Ahmed", streetAddress: "123 Tahrir Square", city: "Cairo", phone: "+201012345678", email: "ahmed@example.com" },
                      paymentMethod: "cash",
                      total: 59.98,
                    },
                  },
                  bank: {
                    summary: "Bank payment - multiple items",
                    value: {
                      items: [
                        { productId: "64prod123", name: "Men Watch", price: 99.99, quantity: 1, image: "watch.jpg" },
                        { productId: "64prod456", name: "Men Jeans", price: 49.99, quantity: 2, image: "jeans.jpg" },
                      ],
                      billing: { firstName: "Mohamed", companyName: "Digilians", streetAddress: "456 Alexandria Road", apartment: "Apt 4B", city: "Alexandria", phone: "+201098765432", email: "mohamed@example.com" },
                      paymentMethod: "bank",
                      total: 199.97,
                    },
                  },
                  empty: { summary: "Empty cart (will fail)", value: { items: [], billing: {}, total: 0 } },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Order placed successfully",
              content: { "application/json": { example: { message: "Order placed successfully", order: { _id: "64order123", status: "pending", total: 59.98, paymentMethod: "cash" } } } },
            },
            400: { description: "Cart is empty", content: { "application/json": { example: { message: "Cart is empty" } } } },
            401: { description: "Unauthorized" },
          },
        },
        get: {
          tags: ["Orders"],
          summary: "Get all orders for current user",
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Orders fetched successfully",
              content: {
                "application/json": {
                  example: {
                    orders: [
                      { _id: "64order123", items: [{ name: "Women Summer Dress", price: 29.99, quantity: 2 }], billing: { firstName: "Ahmed", city: "Cairo" }, paymentMethod: "cash", total: 59.98, status: "pending", createdAt: "2026-01-01T00:00:00.000Z" },
                      { _id: "64order456", items: [{ name: "Men Watch", price: 99.99, quantity: 1 }], billing: { firstName: "Ahmed", city: "Cairo" }, paymentMethod: "bank", total: 99.99, status: "delivered", createdAt: "2026-01-02T00:00:00.000Z" },
                    ],
                  },
                },
              },
            },
            401: { description: "Unauthorized" },
          },
        },
      },

      "/orders/{id}/cancel": {
        patch: {
          tags: ["Orders"],
          summary: "Cancel a pending order",
          security: [{ BearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, description: "Order ID", schema: { type: "string", example: "64order123def456" } }],
          responses: {
            200: { description: "Order cancelled successfully", content: { "application/json": { example: { message: "Order cancelled successfully", order: { _id: "64order123", status: "cancelled" } } } } },
            400: { description: "Cannot cancel", content: { "application/json": { example: { message: "Only pending orders can be cancelled" } } } },
            401: { description: "Unauthorized" },
            404: { description: "Order not found", content: { "application/json": { example: { message: "Order not found" } } } },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: "Exclusive API Docs",
      customCss: ".swagger-ui .topbar { background-color: #DB4444; }",
      swaggerOptions: { persistAuthorization: true },
    })
  );
};

module.exports = setupSwagger;
