require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const TABLE_NAME = 'items_cucian';

// Default Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Selamat Datang di API Layanan Cuci Sepatu' });
});

// 1. CREATE
app.post('/items', async (req, res) => {
  const { nama_pelanggan, nama_sepatu, catatan, status } = req.body;

  if (!nama_pelanggan) {
    return res.status(400).json({ error: 'Nama pelanggan wajib diisi' });
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        nama_pelanggan,
        nama_sepatu,
        catatan,
        status: status || 'Diterima', 
      })
      .select()
      .single(); 

    if (error) throw error;
    res.status(201).json({ message: 'Item berhasil dibuat', data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. READ (All + Filter Status)
app.get('/items', async (req, res) => {
  const { status } = req.query; 

  try {
    let query = supabase.from(TABLE_NAME).select('*').order('id', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. READ (by ID)
app.get('/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single(); 

    if (error) throw error;

    if (data) {
      res.status(200).json({ data: data });
    } else {
      res.status(404).json({ error: 'Item tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. UPDATE
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_pelanggan, nama_sepatu, status, catatan } = req.body;

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        nama_pelanggan,
        nama_sepatu,
        status,
        catatan,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (data) {
      res.status(200).json({ message: 'Item berhasil diupdate', data: data });
    } else {
      res.status(404).json({ error: 'Item tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. DELETE
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { error, count } = await supabase
      .from(TABLE_NAME)
      .delete({ count: 'exact' }) 
      .eq('id', id);

    if (error) throw error;

    if (count > 0) {
      res.status(200).json({ message: `Item dengan ID ${id} berhasil dihapus` });
    } else {
      res.status(404).json({ error: 'Item tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});