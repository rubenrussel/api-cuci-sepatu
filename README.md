# API Layanan Cuci Sepatu

REST API sederhana untuk mengelola daftar barang (sepatu) di layanan laundry sepatu. Dibuat menggunakan Node.js, Express, dan Supabase. Dideploy ke Vercel.

---

## Fitur Utama

- **CRUD:** Create, Read, Update, dan Delete data cucian.
- **Filtering:** Mendukung filter status (`/items?status=Proses`).
- **Database:** Terhubung ke database Supabase (PostgreSQL).
- **Deployment:** Dideploy secara publik di Vercel.

---

## Struktur Data

Data disimpan dalam tabel `items_cucian` di Supabase dengan struktur:

| Kolom | Tipe | Deskripsi |
| :--- | :--- | :--- |
| `id` | `bigint` (PK) | ID unik untuk setiap item cucian. |
| `nama_pelanggan` | `text` | Nama pemilik sepatu. |
| `nama_sepatu` | `text` | Merek/jenis sepatu (Opsional). |
| `status` | `varchar(50)` | Status cucian. (Default: 'Diterima'). |
| `tanggal_masuk` | `timestamptz` | Waktu item diterima. |
| `catatan` | `text` | Catatan tambahan (Opsional). |

---

## Endpoint API & Contoh

**URL Base:** `https://api-cuci-sepatu-eight.vercel.app`

### 1. `GET /`
Mengecek status API.

**Response (200 OK):**
```json
{
  "message": "Selamat Datang di API Layanan Cuci Sepatu"
}
2. POST /items (Create)
Membuat item cucian baru.

Request Body:

JSON

{
  "nama_pelanggan": "Budi Santoso",
  "nama_sepatu": "Nike Air Force 1"
}
Response (201 Created):

JSON

{
  "message": "Item berhasil dibuat",
  "data": {
    "id": 1,
    "nama_pelanggan": "Budi Santoso",
    "nama_sepatu": "Nike Air Force 1",
    "status": "Diterima",
    "tanggal_masuk": "2025-10-23T07:10:00.123Z",
    "catatan": null
  }
}
3. GET /items (Read All)
Melihat semua item. Mendukung filter, cth: /items?status=Proses

Response (200 OK):

JSON

{
  "data": [
    {
      "id": 1,
      "nama_pelanggan": "Budi Santoso",
      "nama_sepatu": "Nike Air Force 1",
      "status": "Diterima",
      "tanggal_masuk": "2025-10-23T07:10:00.123Z",
      "catatan": null
    }
  ]
}
4. PUT /items/:id (Update)
Mengubah status atau data item (contoh: PUT /items/1).

Request Body:

JSON

{
  "status": "Selesai",
  "catatan": "Sudah bersih, siap diambil."
}
Response (200 OK):

JSON

{
    "message": "Item berhasil diupdate",
    "data": {
        "id": 1,
        "nama_pelanggan": "Budi Santoso",
        "nama_sepatu": "Nike Air Force 1",
        "status": "Selesai",
        "tanggal_masuk": "2025-10-23T07:10:00.123Z",
        "catatan": "Sudah bersih, siap diambil."
    }
}
5. DELETE /items/:id (Delete)
Menghapus item (contoh: DELETE /items/1).

Response (200 OK):

JSON

{
  "message": "Item dengan ID 1 berhasil dihapus"
}
Instalasi & Menjalankan Lokal
Clone repository ini.

Jalankan npm install untuk menginstal dependencies.

Buat file .env di root folder.

Isi file .env dengan kredensial Supabase Anda:

SUPABASE_URL=URL_ANDA
SUPABASE_KEY=SERVICE_ROLE_KEY_ANDA
Jalankan server: node index.js

Link Proyek
Repository GitHub: https://github.com/rubenrussel/api-cuci-sepatu

Link Deploy Vercel: https://api-cuci-sepatu-eight.vercel.app
