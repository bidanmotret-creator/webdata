// ==========================================
// 1. FUNGSI UTAMA: MENARIK DATA DARI SERVER
// ==========================================
function tarikDataServer() {
    fetch(scriptURL)
        .then(res => res.json())
        .then(data => {
            // Ambil data klien, konfigurasi, dan marketing
            dataGlobal = data.clients ? data.clients.reverse() : []; 
            STUDIO_CONFIG = data.config || {};
            dataMarketing = data.marketing || []; 
            
            // Inisialisasi UI Lama
            if (typeof inisialisasiUI === "function") inisialisasiUI();
            if (typeof terapkanFilterMaster === "function") terapkanFilterMaster(); 
            
            let tabMkt = document.getElementById('tabMarketing');
            if(tabMkt && tabMkt.classList.contains('active') && typeof renderMarketingTab === "function") {
                renderMarketingTab();
            }

            // PANGGILAN BARU UNTUK EOS EXECUTION HUB
            if (typeof loadExecutionData === "function") {
                loadExecutionData(); 
            }
            if (typeof bindDataToVTO === "function") {
                bindDataToVTO(); // Jika tab V/TO ada
            }

        }).catch(e => {
            const loadingEl = document.getElementById('loadingStatus');
            if(loadingEl) loadingEl.innerHTML = "❌ Gagal memuat data dari server. Periksa koneksi internet.";
            console.error("Error tarikDataServer:", e);
        });
}

// ==========================================
// 2. EVENT LISTENER UNTUK SIMPAN DATA MASTER
// ==========================================

// A. Simpan Struktur Organisasi (Accountability Chart)
let formOrg = document.getElementById('formOrg');
if (formOrg) {
    formOrg.addEventListener('submit', e => {
        e.preventDefault();
        let btn = e.target.querySelector('button[type="submit"]'); 
        let textAsli = btn.innerText;
        btn.disabled = true; 
        btn.innerText = '⏳ Menyimpan Struktur...';
        
        let newOrg = [];
        document.querySelectorAll('.org-box').forEach(box => {
            newOrg.push({
                title: box.querySelector('.org-title').value,
                name: box.querySelector('.org-name').value,
                roles: box.querySelector('.org-roles').value,
                level: box.querySelector('.org-level').value
            });
        });
        STUDIO_CONFIG.orgChart = newOrg;
        
        let fd = new FormData(); 
        fd.append('action', 'saveConfig'); 
        fd.append('configJson', JSON.stringify(STUDIO_CONFIG));
        
        fetch(scriptURL, { method: 'POST', body: fd })
            .then(res => res.json())
            .then(() => { 
                alert('✅ Struktur Akumulasi Urutan & Accountability Chart Berhasil Disimpan!'); 
            })
            .catch((err) => { 
                alert('❌ Gagal menyimpan ke cloud server. Pesan: ' + err); 
            })
            .finally(() => {
                btn.disabled = false; 
                btn.innerText = textAsli;
            });
    });
}

// B. Simpan Konfigurasi Umum (Settings)
let formSettings = document.getElementById('formSettings');
if (formSettings) {
    formSettings.addEventListener('submit', e => { 
        e.preventDefault(); 
        let btn = e.target.querySelector('button'); 
        let textAsli = btn.innerText;
        btn.disabled = true; 
        btn.innerText = '⏳ Menyimpan...'; 

        try { 
            STUDIO_CONFIG.sumber = document.getElementById('set_sumber').value.split('\n').filter(x => x.trim() !== ""); 
            STUDIO_CONFIG.minat = document.getElementById('set_minat').value.split('\n').filter(x => x.trim() !== ""); 
            STUDIO_CONFIG.lokasi = document.getElementById('set_lokasi').value.split('\n').filter(x => x.trim() !== ""); 
            STUDIO_CONFIG.promo = document.getElementById('set_promo').value.split('\n').filter(x => x.trim() !== ""); 
            STUDIO_CONFIG.waTemplate = document.getElementById('set_wa').value; 
            STUDIO_CONFIG.paketMap = JSON.parse(document.getElementById('set_paketMap').value); 
            STUDIO_CONFIG.varianMap = JSON.parse(document.getElementById('set_varianMap').value); 
            
            let fd = new FormData(); 
            fd.append('action', 'saveConfig'); 
            fd.append('configJson', JSON.stringify(STUDIO_CONFIG)); 
            
            fetch(scriptURL, { method: 'POST', body: fd })
                .then(res => res.json())
                .then(() => { 
                    alert('✅ Konfigurasi Berhasil Disimpan!'); 
                    tarikDataServer(); 
                })
                .catch(err => {
                    alert('❌ Gagal menyimpan ke server: ' + err);
                })
                .finally(() => {
                    btn.disabled = false; 
                    btn.innerText = textAsli; 
                }); 
        } catch(err) { 
            alert('❌ Gagal! Periksa kembali format JSON pada Map Paket/Varian.'); 
            btn.disabled = false; 
            btn.innerText = textAsli; 
        } 
    });
}

// C. Simpan Leads Baru (Tofu)
let formLead = document.getElementById('formLead');
if (formLead) {
    formLead.addEventListener('submit', e => { 
        e.preventDefault(); 
        let btn = document.getElementById('btnSubmitLead'); 
        let textAsli = btn.innerText;
        btn.disabled = true; 
        btn.innerText = '⏳ Menyimpan...';
        
        fetch(scriptURL, { method: 'POST', body: new FormData(e.target)})
            .then(res => res.json())
            .then(() => { 
                alert('✅ Lead Baru Berhasil Disimpan!'); 
                e.target.reset(); 
                tarikDataServer(); 
            })
            .catch(err => {
                alert('❌ Gagal menyimpan Lead: ' + err);
            })
            .finally(() => {
                btn.disabled = false; 
                btn.innerText = textAsli;
            }); 
    });
}

// D. Simpan Konversi (Update Customer / Mofu Bofu)
let formCustomer = document.getElementById('formCustomer');
if (formCustomer) {
    formCustomer.addEventListener('submit', e => { 
        e.preventDefault(); 
        let btn = document.getElementById('btnSubmitCustomer'); 
        let textAsli = btn.innerText;
        btn.disabled = true; 
        btn.innerText = '⏳ Memperbarui Data...';
        
        let promoTerpilih = []; 
        document.querySelectorAll('.promo-cb:checked').forEach(cb => promoTerpilih.push(cb.value)); 
        document.getElementById('hidden_promo').value = promoTerpilih.length > 0 ? promoTerpilih.join(', ') : '-'; 
        
        fetch(scriptURL, { method: 'POST', body: new FormData(e.target)})
            .then(res => res.json())
            .then(() => { 
                alert('✅ Data Konversi Pelanggan Berhasil Diperbarui!'); 
                e.target.reset(); 
                document.getElementById('formCustomer').style.display = 'none'; 
                tarikDataServer(); 
            })
            .catch(err => {
                alert('❌ Gagal memperbarui data: ' + err);
            })
            .finally(() => {
                btn.disabled = false; 
                btn.innerText = textAsli;
            }); 
    });
}

async function simpanEksekusiEOS() {
    let btn = event.target || document.querySelector('.btn-submit');
    let originalText = btn.innerText;
    btn.innerText = '⏳ Menyimpan ke Cloud...';
    btn.disabled = true;

    // 1. Ambil data plan terbaru dengan aman
    STUDIO_CONFIG.exec_plan = {
        rev: document.getElementById('exec_1yr_rev')?.value || "",
        profit: document.getElementById('exec_1yr_profit')?.value || "",
        goals: document.getElementById('exec_1yr_goals')?.value || ""
    };

    try {
        // 2. Gunakan URLSearchParams agar e.parameter di GAS bisa membaca data
        let params = new URLSearchParams();
        params.append('action', 'saveEOS');
        params.append('configJson', JSON.stringify(STUDIO_CONFIG));

        let response = await fetch(scriptURL, { 
            method: 'POST', 
            body: params // Kirim sebagai URL Encoded, ini standar GAS
        });
        
        let result = await response.json();

        if (result.result === 'success') {
            alert("✅ Data EOS berhasil disinkronkan ke Spreadsheet!");
            // Refresh tampilan dasbor setelah simpan
            updateDashboardUI(); 
            // Opsional: Jika fungsi tarikDataServer ada, panggil untuk pastikan sinkronisasi terbaru
            if (typeof tarikDataServer === 'function') tarikDataServer();
        } else {
            throw new Error(result.error || "Terjadi kesalahan pada server");
        }
    } catch(err) {
        console.error("Error saat menyimpan EOS:", err);
        alert("❌ Gagal menyimpan. Pastikan internet stabil. Pesan: " + err.message);
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}