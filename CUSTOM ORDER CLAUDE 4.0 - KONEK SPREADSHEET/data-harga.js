// ═══════════════════════════════════════════════════════════════════════════
// 📋 DATA HARGA & CONFIG TERPUSAT - VERSI LENGKAP DENGAN 30 PRODUK
// ═══════════════════════════════════════════════════════════════════════════

const WEB_CONFIG = {

    // ═══════════════════════════════════════════════════════════════════
    // 1️⃣ PRODUK UTAMA (30+ Pilihan)
    // ═══════════════════════════════════════════════════════════════════
    products: [
        // ▬▬▬ NEWBORN 3D (0-1 Bulan) ▬▬▬
        // ▬▬▬ NEWBORN 3D (0-1 Bulan) ▬▬▬
        {
            id: 'paket-mini-3d',
            name: 'Paket Mini 3D',
            category: '3d',
            type: '3D Newborn',
            age: '0-1 Bulan',
            price: 650000, // Silakan sesuaikan nominal harganya
            desc: '1 Cetakan Tangan (Tanpa Foto)',
            image: 'https://ik.imagekit.io/sentuhanmomen/2%20CETAKAN/photo_6129446548404899452_w.jpg?updatedAt=1780580367808',
            images: [
                'https://via.placeholder.com/400x300/F8F4EE/000000?text=1+Cetakan+Tangan'
            ],
            includes: ['1 Cetakan Tangan 3D', 'Bingkai Minimalis', 'Label Nama Logam'],
            badge: 'Paling Hemat'
        },
        
        {
            id: 'paket-unyu',
            name: 'Paket Unyu',
            category: '3d',
            type: '3D Newborn',
            age: '0-1 Bulan',
            price: 1150000,
            desc: '2 Cetakan Tangan & Kaki',
            // 🌟 image: HANYA 1 LINK untuk KARTU DEPAN (Index)
            image: 'https://ik.imagekit.io/sentuhanmomen/2%20CETAKAN/photo_6129446548404899452_w.jpg?updatedAt=1780580367808',
            // 🌟 images: ARRAY BANYAK LINK untuk GALERI (Order Form)
            images: [
                'https://ik.imagekit.io/sentuhanmomen/2%20CETAKAN/photo_6129446548404899452_w.jpg?updatedAt=1780580367808',
                'https://ik.imagekit.io/sentuhanmomen/2%20CETAKAN/photo_6129446548404899453_w.jpg?updatedAt=1780580400083', 
                'https://ik.imagekit.io/sentuhanmomen/2%20CETAKAN/photo_6129446548404899454_w.jpg?updatedAt=1780580346472'
            ],
            includes: ['Bingkai Minimalis', 'Label Nama Logam', '2 Foto 4R atau 1 Foto 5R'],
            badge: 'Populer'
        },
        
        {
            id: 'paket-gemes',
            name: 'Paket Gemes',
            category: '3d',
            type: '3D Newborn',
            age: '0-1 Bulan',
            price: 1450000,
            desc: '4 Cetakan Tangan & Kaki',
            // 🌟 Tambahkan 'image' tunggal di sini
            image: 'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899412_w.jpg?updatedAt=1780579217353',
            images: [
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899404_w.jpg?updatedAt=1780577487529',
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899409_w.jpg?updatedAt=1780577487545', 
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899411_w.jpg?updatedAt=1780577487519',
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899406_w.jpg?updatedAt=1780577487473',
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899413_w.jpg',
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899414_w.jpg?updatedAt=1780577486842',
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899412_w.jpg'
            ],
            includes: ['Bingkai Minimalis', 'Label Nama Logam', '2 Foto 5R'],
            badge: 'Best Seller'
        },
        {
            id: 'paket-full-usg',
            name: 'Paket Full USG',
            category: '3d',
            type: '3D Newborn',
            age: '0-1 Bulan',
            price: 1950000,
            desc: '4 Cetakan + 9 Kolom USG',
            // 🌟 Jika belum ada foto, Anda tetap BISA pakai emoji untuk kartu depan
            image: 'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899447_w.jpg?updatedAt=1780580026987',
            // 🌟 Tapi tetap sediakan 'images' (placeholder) untuk galeri order
            images: [
                'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899447_w.jpg?updatedAt=1780580026987',
                'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899445_w.jpg?updatedAt=1780579902244',
                'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899444_w.jpg?updatedAt=1780580075407',
                'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899446_w.jpg?updatedAt=1780579752060',
                'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899444_w.jpg?updatedAt=1780580075407'
            ],
            includes: ['Bingkai Minimalis', 'Full Frame USG 9 Bulan', 'Extra Area Barang Kenangan', 'Label Nama Logam'],
            badge: 'Premium'
        },
        {
            id: 'paket-sibling',
            name: 'Paket Sibling',
            category: '3d',
            type: '3D Newborn',
            age: '0-1 Bulan + Kakak',
            price: 2150000,
            desc: '4 cetakan Bayi + 2 cetakan Kakak',
            image: 'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899457_w.jpg',
            images: [
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899455_w.jpg',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899466_w.jpg',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899457_w.jpg',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899463_w.jpg?updatedAt=1780581553048',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899468_w.jpg?updatedAt=1780581458647',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899467_w.jpg?updatedAt=1780581459221',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899464_w.jpg?updatedAt=1780581459271',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899465_w.jpg?updatedAt=1780581458687'
            ],
            includes: ['Bingkai Khusus', '4 Cetakan Bayi', '2 Cetakan Kakak', '2 pcs Label Nama Logam'],
            badge: 'Istimewa'
        },
        {
            id: 'paket-mini-2d',
            name: 'Paket Mini 2D',
            category: '2d',
            type: '2D Newborn',
            age: '0-1 Bulan',
            price: 650000, // Silakan sesuaikan nominal harganya
            desc: '1 Cetakan Tangan (Tanpa Foto)',
            image: 'https://ik.imagekit.io/sentuhanmomen/2%20CETAKAN/photo_6129446548404899452_w.jpg?updatedAt=1780580367808',
            images: [
                'https://via.placeholder.com/400x300/F8F4EE/000000?text=1+Cetakan+Tangan'
            ],
            includes: ['1 Cetakan Tangan 3D', 'Bingkai Minimalis', 'Label Nama Logam'],
            badge: 'Paling Hemat'
        },
        {
            id: 'paket-unyu',
            name: 'Paket Unyu',
            category: '2d',
            type: '2D Newborn',
            age: '0-1 Bulan',
            price: 1150000,
            desc: '2 Cetakan Tangan & Kaki',
            // 🌟 image: HANYA 1 LINK untuk KARTU DEPAN (Index)
            image: 'https://ik.imagekit.io/sentuhanmomen/2%20CETAKAN/photo_6129446548404899452_w.jpg?updatedAt=1780580367808',
            // 🌟 images: ARRAY BANYAK LINK untuk GALERI (Order Form)
            images: [
                'https://ik.imagekit.io/sentuhanmomen/2%20CETAKAN/photo_6129446548404899452_w.jpg?updatedAt=1780580367808',
                'https://ik.imagekit.io/sentuhanmomen/2%20CETAKAN/photo_6129446548404899453_w.jpg?updatedAt=1780580400083', 
                'https://ik.imagekit.io/sentuhanmomen/2%20CETAKAN/photo_6129446548404899454_w.jpg?updatedAt=1780580346472'
            ],
            includes: ['Bingkai Minimalis', 'Label Nama Logam', '2 Foto 4R atau 1 Foto 5R'],
            badge: 'Populer'
        },
        
        {
            id: 'paket-gemes',
            name: 'Paket Gemes',
            category: '2d',
            type: '2D Newborn',
            age: '0-1 Bulan',
            price: 1450000,
            desc: '4 Cetakan Tangan & Kaki',
            // 🌟 Tambahkan 'image' tunggal di sini
            image: 'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899412_w.jpg?updatedAt=1780579217353',
            images: [
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899404_w.jpg?updatedAt=1780577487529',
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899409_w.jpg?updatedAt=1780577487545', 
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899411_w.jpg?updatedAt=1780577487519',
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899406_w.jpg?updatedAt=1780577487473',
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899413_w.jpg',
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899414_w.jpg?updatedAt=1780577486842',
                'https://ik.imagekit.io/sentuhanmomen/4%20CETAKAN%203D/photo_6129446548404899412_w.jpg'
            ],
            includes: ['Bingkai Minimalis', 'Label Nama Logam', '2 Foto 5R'],
            badge: 'Best Seller'
        },
        {
            id: 'paket-full-usg',
            name: 'Paket Full USG',
            category: '2d',
            type: '2D Newborn',
            age: '0-1 Bulan',
            price: 1950000,
            desc: '4 Cetakan + 9 Kolom USG',
            // 🌟 Jika belum ada foto, Anda tetap BISA pakai emoji untuk kartu depan
            image: 'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899447_w.jpg?updatedAt=1780580026987',
            // 🌟 Tapi tetap sediakan 'images' (placeholder) untuk galeri order
            images: [
                'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899447_w.jpg?updatedAt=1780580026987',
                'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899445_w.jpg?updatedAt=1780579902244',
                'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899444_w.jpg?updatedAt=1780580075407',
                'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899446_w.jpg?updatedAt=1780579752060',
                'https://ik.imagekit.io/sentuhanmomen/FULL%20USG%204%20CETAKAN/photo_6129446548404899444_w.jpg?updatedAt=1780580075407'
            ],
            includes: ['Bingkai Minimalis', 'Full Frame USG 9 Bulan', 'Extra Area Barang Kenangan', 'Label Nama Logam'],
            badge: 'Premium'
        },
        {
            id: 'paket-sibling',
            name: 'Paket Sibling',
            category: '2d',
            type: '2D Newborn',
            age: '0-1 Bulan + Kakak',
            price: 2150000,
            desc: '4 cetakan Bayi + 2 cetakan Kakak',
            image: 'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899457_w.jpg',
            images: [
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899455_w.jpg',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899466_w.jpg',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899457_w.jpg',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899463_w.jpg?updatedAt=1780581553048',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899468_w.jpg?updatedAt=1780581458647',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899467_w.jpg?updatedAt=1780581459221',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899464_w.jpg?updatedAt=1780581459271',
                'https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899465_w.jpg?updatedAt=1780581458687'
            ],
            includes: ['Bingkai Khusus', '4 Cetakan Bayi', '2 Cetakan Kakak', '2 pcs Label Nama Logam'],
            badge: 'Istimewa'
        },

        
                {
            id: 'bundle-newborn-thematic',
            name: 'Newborn Photo Thematic',
            category: 'bundling_foto',
            isPhotoPackage: true, // Penanda bahwa ini produk foto
            price: 0, // Set base price ke 0, karena harga akan ditentukan dari pilihan paket di bawah
            desc: 'Sesi Foto Newborn Premium di Studio',
            image: 'https://via.placeholder.com/400x300/F8F4EE/000000?text=Newborn+Thematic',
            images: ['https://via.placeholder.com/400x300/F8F4EE/000000?text=Newborn+Thematic'],
            
            // 👇 Masukkan 4 Paket Harga Anda di sini
            packageTiers: [
                { 
                    id: "tier-1", 
                    nama: "Paket Basic", 
                    harga: 1250000, 
                    desc: "1 Tema Foto, 5 File Edit, Tanpa Cetak" 
                },
                { 
                    id: "tier-2", 
                    nama: "Paket Standard", 
                    harga: 1850000, 
                    desc: "2 Tema Foto, 10 File Edit, Cetak 1 Frame 8R" 
                },
                { 
                    id: "tier-3", 
                    nama: "Paket Premium", 
                    harga: 2500000, 
                    desc: "3 Tema Foto, Semua File Edit, Cetak Frame 12R + Album" 
                },
                { 
                    id: "tier-4", 
                    nama: "Paket Sultan", 
                    harga: 3500000, 
                    desc: "4 Tema Foto, Semua File, Box Eksklusif, Canvas 16R" 
                }
            ],
            

            
            // 👇 Opsi Handcasting yang ditawarkan sebagai Cross-Sell
            crossSellOptions: [
                { id: "cs-1", nama: "Tanpa Handcasting", harga: 0, hargaNormal: 0, image: "" },
                { id: "cs-2", nama: "Tambah 2D Basic (Subsidi)", harga: 300000, hargaNormal: 500000, image: "https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899455_w.jpg" },
                { id: "cs-3", nama: "Tambah 3D Unyu (Subsidi)", harga: 500000, hargaNormal: 700000, image: "https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899455_w.jpg" },
                { id: "cs-4", nama: "Tambah 3D Gemes (Subsidi)", harga: 7000000, hargaNormal: 900000, image: "https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899455_w.jpg" },
            ],
            badge: 'Thematic Best'
        },


        {
            id: 'bundle-newborn-simple-wrap',
            name: 'Bundling Simple Wrap & Family Photo',
            category: 'bundling_foto',
            type: 'Photo Studio Bundle',
            age: '0-1 Bulan + Orang Tua',
            price: 2250000,
            desc: 'Pose Kain Bedong Simple + Sesi Foto Bersama Keluarga',
            image: 'https://via.placeholder.com/400x300/F8F4EE/000000?text=Simple+Wrap+Family',
            images: ['https://via.placeholder.com/400x300/F8F4EE/000000?text=Simple+Wrap+Family'],
            includes: ['Sesi Foto Keluarga (Ayah, Ibu & Bayi)', 'Teknik Kain Wrap Profesional', '1 Cetak Pembesaran Frame Dinding', 'Digital Master File'],
            badge: 'Family Choice'
        },
        {
            id: 'photo-kids',
            name: 'Kids Photo Session',
            category: 'bundling_foto',
            type: 'Photo Studio Only',
            age: '1-10 Tahun',
            price: 500000,
            desc: 'Sesi Foto Ekspresi dan Karakter Anak Dewasa',
            image: 'https://via.placeholder.com/400x300/F8F4EE/000000?text=Kids+Photo',
            images: ['https://via.placeholder.com/400x300/F8F4EE/000000?text=Kids+Photo'],
            includes: ['Durasi Foto Studio 45 Menit', 'Bebas Pilih Warna Background', '10 File Edit Terbaik', 'Cetak 5R + Frame'],
            badge: 'Cheerful'
        },
        {
            id: 'photo-birthday',
            name: 'Birthday Photo Session (Cake Smash)',
            category: 'bundling_foto',
            type: 'Photo Studio Only',
            age: '1-5 Tahun',
            price: 850000,
            desc: 'Perayaan Ulang Tahun dengan Properti & Tema Cake Smash',
            image: 'https://via.placeholder.com/400x300/F8F4EE/000000?text=Birthday+Photo',
            images: ['https://via.placeholder.com/400x300/F8F4EE/000000?text=Birthday+Photo'],
            includes: ['Set Dekorasi Balon & Ulang Tahun', 'Properti Kue Disediakan', 'Sesi Foto Candid Seru', 'Edited File & Cetak Album Mini'],
            badge: 'Celebration'
        },
        {
            id: 'photo-personal',
            name: 'Personal Portrait Photo',
            category: 'bundling_foto',
            type: 'Photo Studio Only',
            age: 'Semua Umur',
            price: 350000,
            desc: 'Foto Profil Pribadi, Portofolio, atau Wisuda Solo',
            image: 'https://via.placeholder.com/400x300/F8F4EE/000000?text=Personal+Photo',
            images: ['https://via.placeholder.com/400x300/F8F4EE/000000?text=Personal+Photo'],
            includes: ['1 Kostum Pribadi', 'Lighting Studio Profesional', '5 File High-Resolution Edit', 'Cetak Cetak 4R Premium'],
            badge: 'Professional'
        }
        
    ],

    // ════════════════════════════════════════
    // OPSI CROSS-SELL FOTO (MUNCUL SAAT KLIEN BELI HANDCASTING)
    // ════════════════════════════════════════
    crossSellPhoto: [
        { id: "cs-foto-0", nama: "Tidak, terima kasih", harga: 0, hargaNormal: 0, image: "" },
        { id: "cs-foto-1", nama: "Sesi Foto Minimalis", harga: 350000, hargaNormal: 500000, image: "https://via.placeholder.com/150/FFB6C1/000000?text=Foto+Minimalis" },
        { id: "cs-foto-2", nama: "Sesi Foto Keluarga", harga: 750000, hargaNormal: 900000, image: "https://via.placeholder.com/150/FFB6C1/000000?text=Foto+Keluarga" },
        { id: "cs-foto-3", nama: "Newborn Thematic", harga: 1250000, hargaNormal: 1500000, image: "https://via.placeholder.com/150/FFB6C1/000000?text=Newborn+Thematic" }
    ],

    // ... di dalam array products, pada paket Foto Anda ...
    // crossSellOptions: [
    //     { id: "cs-1", nama: "Tanpa Handcasting", harga: 0, image: "" },
    //     { id: "cs-2", nama: "Tambah 2D Basic", harga: 350000, image: "https://via.placeholder.com/150/D4AF37/000000?text=2D+Basic" },
    //     { id: "cs-3", nama: "Tambah 3D Unyu", harga: 950000, image: "https://via.placeholder.com/150/D4AF37/000000?text=3D+Unyu" }
    // ]
    // ═══════════════════════════════════════════════════════════════════
    // 2️⃣ OPSI USIA BAYI
    // ═══════════════════════════════════════════════════════════════════
    biayaUsia: [
        { nama: "0 - 1 Bulan", harga: 0 },
        { nama: "1 - 3 Bulan", harga: 0 },
        { nama: "3 - 6 Bulan", harga: 50000 },
        { nama: "6 - 12 Bulan", harga: 100000 },
        { nama: "1 - 2 Tahun", harga: 200000 },
        { nama: "2 - 5 Tahun", harga: 300000 }
    ],

    
// Tambahkan ke dalam WEB_CONFIG di data-harga.js

customColors: [
    {
        category: "Warna Cetakan",
        options: [
            { nama: "Gold", color: "#FFD700", harga: 0, image: "https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899465_w.jpg?updatedAt=1780581458687" },
            { nama: "Silver", color: "#C0C0C0", harga: 0, image: "https://via.placeholder.com/150/C0C0C0/fff?text=Silver" }
        ]
    },
    {
        category: "Warna Bingkai Luar",
        options: [
            { nama: "Putih", color: "#FFFFFF", harga: 0, image: "https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899465_w.jpg?updatedAt=1780581458687" },
            { nama: "Coklat Kayu", color: "#8B4513", harga: 50000, image: "https://via.placeholder.com/150/8B4513/fff?text=Kayu" }
        ]
    },
    {
        category: "Warna Bingkai Dalam",
        options: [
            { nama: "Bludru Hitam", color: "#1C1C1C", harga: 85000, image: "https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899465_w.jpg?updatedAt=1780581458687" },
            { nama: "Satin Gold", color: "#FFD700", harga: 175000, image: "https://via.placeholder.com/150/FFD700/000?text=Satin" }
        ]
    },
    {
        category: "Warna List Pinggir Area",
        options: [
            { nama: "Gold List", color: "#FFD700", harga: 0, image: "https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899465_w.jpg?updatedAt=1780581458687" }
        ]
    },
    {
        category: "Warna Label",
        options: [
            { nama: "Plakat Gold", color: "#FFD700", harga: 0, image: "https://ik.imagekit.io/sentuhanmomen/SIBLING%203D/photo_6129446548404899465_w.jpg?updatedAt=1780581458687" }
        ]
    }
],

    // ═══════════════════════════════════════════════════════════════════
   biayaAddon: [
    { 
        id: "addon-gelang-rs", 
        nama: "Gelang / Tag RS", 
        harga: 50000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Gelang+RS" 
    },
    { 
        id: "addon-tali-pusat", 
        nama: "Tali Pusat", 
        harga: 50000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Tali+Pusat" 
    },
    { 
        id: "addon-rambut", 
        nama: "Rambut", 
        harga: 50000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Rambut" 
    },
    { 
        id: "addon-usg", 
        nama: "Foto USG 3D/4D", 
        harga: 50000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Foto+USG" 
    },
    { 
        id: "addon-test-pack-kecil", 
        nama: "Test Pack Kecil", 
        harga: 50000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Test+Pack+Kecil" 
    },
    { 
        id: "addon-test-pack-besar", 
        nama: "Test Pack Besar", 
        harga: 75000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Test+Pack+Besar" 
    },
    { 
        id: "addon-dot", 
        nama: "Dot / Empeng", 
        harga: 50000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Dot" 
    },
    { 
        id: "addon-sarung-tangan", 
        nama: "Sarung Tangan Baby", 
        harga: 75000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Sarung+Tangan" 
    },
    { 
        id: "addon-kaos-kaki", 
        nama: "Kaos Kaki Baby", 
        harga: 75000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Kaos+Kaki" 
    },
    { 
        id: "addon-sepatu", 
        nama: "Sepatu Baby", 
        harga: 75000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Sepatu" 
    },
    { 
        id: "addon-kalender-kecil", 
        nama: "Kalender Kecil", 
        harga: 100000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Kalender+Kecil" 
    },
    { 
        id: "addon-kalender-besar", 
        nama: "Kalender Besar", 
        harga: 150000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Kalender+Besar" 
    },
    { 
        id: "addon-papan-ranjang", 
        nama: "Papan Ranjang RS", 
        harga: 150000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Papan+Ranjang" 
    },
    { 
        id: "addon-baju", 
        nama: "Baju Baby", 
        harga: 650000, 
        image: "https://via.placeholder.com/150/F8F4EE/000000?text=Baju+Baby" 
    }
],

    // ═══════════════════════════════════════════════════════════════════
    // 4️⃣ OPSI LAYANAN
    // ═══════════════════════════════════════════════════════════════════
    biayaLayanan: [
        { nama: "Datang ke Studio", harga: 0 },
        { nama: "Home Service / Panggilan", harga: 250000 },
        { nama: "Professional Photography Session", harga: 500000 }
    ],

    // ═══════════════════════════════════════════════════════════════════
    // 5️⃣ CUSTOM A LA CARTE - HARGA CETAKAN
    // ═══════════════════════════════════════════════════════════════════
    customCetakan: [
        { nama: "3D - Bayi (0-12 Bulan)", harga: 200000 },
        { nama: "3D - Anak (1-5 Tahun)", harga: 350000 },
        { nama: "3D - Dewasa", harga: 500000 },
        { nama: "2D - Bayi/Anak", harga: 150000 },
        { nama: "2D - Dewasa", harga: 250000 },
        { nama: "2D - Couple", harga: 400000 }
    ],

    // ═══════════════════════════════════════════════════════════════════
    // 6️⃣ CUSTOM A LA CARTE - JENIS BINGKAI
    // ═══════════════════════════════════════════════════════════════════
    customBingkai: [
        { nama: "Tanpa Bingkai (Cetakan Saja)", harga: 0 },
        { nama: "Bingkai Minimalis (Muat 2)", harga: 350000 },
        { nama: "Bingkai Medium (Muat 4)", harga: 500000 },
        { nama: "Bingkai Premium (Muat 4-6)", harga: 750000 },
        { nama: "Bingkai Luxury Gold", harga: 1200000 },
        { nama: "Bingkai Custom Design", harga: 1500000 }
    ],

    // ═══════════════════════════════════════════════════════════════════
    // 7️⃣ CUSTOM A LA CARTE - BACKGROUND
    // ═══════════════════════════════════════════════════════════════════
    customBackground: [
        { nama: "Kertas Mat (Warna Polos)", harga: 0 },
        { nama: "Kain Bludru Premium", harga: 85000 },
        { nama: "Custom Tema Cetak", harga: 150000 },
        { nama: "Velvet Hitam Premium", harga: 120000 },
        { nama: "Satin Gold", harga: 175000 }
    ],

    // ═══════════════════════════════════════════════════════════════════
    // 8️⃣ DATABASE MITRA
    // ═══════════════════════════════════════════════════════════════════
    mitra: {
        '001': {
            id: '001',
            nama: 'SentuhanMomen.3D',
            wa: '6282177272512',
            lokasi: 'Bandar Lampung',
            sheetId: '128alf1AMVblAw2WRkLM78DlZmjxN_I5UAkkYhI3pi0M',
            email: 'bidanmotret@gmail.com',
            instagramHandle: 'sentuhanmomen.3d',
            operasionalJam: '08:00 - 17:00'
        },

       

        'pusat': {
            id: 'pusat',
            nama: 'Bidan Motret Pusat',
            wa: '6282177272512',
            lokasi: 'Bandar Lampung',
            sheetId: '128alf1AMVblAw2WRkLM78DlZmjxN_I5UAkkYhI3pi0M',
            email: 'bidanmotret@gmail.com',
            instagramHandle: 'bidanmotret',
            operasionalJam: '08:00 - 20:00'
        }
    },

    // ═══════════════════════════════════════════════════════════════════
    // 9️⃣ KONFIGURASI UMUM
    // ═══════════════════════════════════════════════════════════════════
    config: {
        gasWebhookUrl: 'https://script.google.com/macros/s/AKfycbwY-7GjkQgzoFjJDLnhsK8kdKuEkqIrDv4QgTRhayMgydeAK5XyCdHAc1sKFBC4HD304w/exec',
        currency: 'IDR',
        timezone: 'Asia/Jakarta',
        minOrder: 100000,
        contactEmail: 'info@bidanmotret.com',
        companyName: 'SENTUHAN MOMEN 3D',
        foundedYear: 2024
    }
};
