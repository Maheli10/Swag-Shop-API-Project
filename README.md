# Swag Shop

Full-stack shop app with a Node/Express API and React frontend.

## Project structure

```
Swag Shop API/
├── api/
│   ├── .env              # API port & config (copy from .env.example)
│   ├── models/
│   └── server.js         # http://localhost:5000
├── swag-shop-web/
│   ├── .env.development  # React port & config (copy from .env.example)
│   └── src/
└── package.json
```

## Prerequisites

- Node.js 18+
- MongoDB running locally

## Setup

```bash
npm run install:all
cp api/.env.example api/.env
cp swag-shop-web/.env.example swag-shop-web/.env.development
```

## Run

Start both the API and frontend:

```bash
npm start
```

Or run them separately:

```bash
npm run start:api      # http://localhost:5000
npm run start:client   # http://localhost:3000
```

## Environment files

| File | Port | Key variables |
|------|------|---------------|
| `api/.env` | **5000** | `PORT`, `CLIENT_ORIGIN`, `MONGODB_URI` |
| `swag-shop-web/.env.development` | **3000** | `PORT`, `REACT_APP_API_URL` |

Keep `CLIENT_ORIGIN` in the API env matching the React port (`http://localhost:3000`), and `REACT_APP_API_URL` matching the API port (`http://localhost:5000`).

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products |
| POST | `/api/products` | Create product (`title`, `price`) |
| GET | `/api/wishlists` | List wishlists |
| POST | `/api/wishlists` | Create wishlist (`title`) |
