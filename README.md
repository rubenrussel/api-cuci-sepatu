# 👟 API Layanan Cuci Sepatu

REST API sederhana untuk mengelola daftar barang (sepatu) di layanan laundry sepatu. Dibuat menggunakan Node.js, Express, dan Supabase. Dideploy ke Vercel.

## ✨ Fitur Utama

- CRUD: Create, Read, Update, dan Delete data cucian.
- Filtering: Mendukung filter status (`/items?status=Proses`).

## 🚀 Endpoint API

**URL Base:** `[https://api-cuci-sepatu-1fohcove6-rubenrussels-projects.vercel.app]`

- `GET /`
- `POST /items` (Create)
- `GET /items` (Read All + Filter by ?status=)
- `GET /items/:id` (Read One)
- `PUT /items/:id` (Update)
- `DELETE /items/:id` (Delete)

## 🛠️ Instalasi & Menjalankan Lokal

1.  `npm install`
2.  Buat file `.env` (isi dengan key Supabase)
3.  `node index.js`

## 🌐 Link Proyek

- **Repository GitHub:** (https://github.com/rubenrussel/api-cuci-sepatu)
- **Link Deploy Vercel:** `[[GANTI DENGAN LINK VERCEL ANDA](https://api-cuci-sepatu-1fohcove6-rubenrussels-projects.vercel.app)]`
