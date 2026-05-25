 
        function bukaTab(tabId, btnElement) {
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            btnElement.classList.add('active');
            
            if(tabId === 'tabMarketing') renderMarketingTab();else if(tabId === 'tabEOSExecution') {
            if (typeof loadExecutionData === "function") loadExecutionData();
                }
                else if(dataGlobal.length === 0) tarikDataServer();
            }

        function inisialisasiUI() {
            const forms = ['sumber', 'minat', 'lokasi'];
            forms.forEach(key => {
                let opsiHTML = (STUDIO_CONFIG[key] || []).map(item => `<option value="${item}">${item}</option>`).join('');
                if(key === 'sumber') document.getElementById('sumber_opsi').innerHTML = opsiHTML;
                if(key === 'minat') {
                    document.getElementById('minat_opsi').innerHTML = opsiHTML;
                    document.getElementById('cust_minat').innerHTML = opsiHTML;
                }
                if(key === 'lokasi') document.getElementById('cust_lokasi').innerHTML = opsiHTML;
            });
            document.getElementById('promo_container').innerHTML = (STUDIO_CONFIG.promo || []).map(p => `<label class="checkbox-item"><input type="checkbox" class="promo-cb" value="${p}"> ${p}</label>`).join('');
            
            let htmlKategori = '<option value="">Semua Produk / Campaign</option>' + (STUDIO_CONFIG.minat || []).map(m => `<option value="${m}">${m}</option>`).join('');
            document.getElementById('filterKategori').innerHTML = htmlKategori;
            document.getElementById('filterMktCampaign').innerHTML = htmlKategori;

            document.getElementById('set_sumber').value = (STUDIO_CONFIG.sumber || []).join('\n');
            document.getElementById('set_minat').value = (STUDIO_CONFIG.minat || []).join('\n');
            document.getElementById('set_lokasi').value = (STUDIO_CONFIG.lokasi || []).join('\n');
            document.getElementById('set_promo').value = (STUDIO_CONFIG.promo || []).join('\n');
            document.getElementById('set_wa').value = STUDIO_CONFIG.waTemplate || "";
            document.getElementById('set_paketMap').value = JSON.stringify(STUDIO_CONFIG.paketMap, null, 2);
            document.getElementById('set_varianMap').value = JSON.stringify(STUDIO_CONFIG.varianMap, null, 2);

            renderOrgChart(); 
        }
         // ====================================================================
/// ====================================================================
// FUNGSI DOWNLOAD PDF FINAL (UKURAN KECIL, GRAFIK UTUH, ANTI-BURAM)
// ====================================================================
async function downloadPDF(menuId, namaFile, judulLaporan) {
    const { jsPDF } = window.jspdf;
    const elemen = document.getElementById(menuId);
    
    if (!elemen) {
        alert("Sistem gagal menemukan menu: " + menuId);
        return;
    }

    const elemenDisembunyikan = elemen.querySelectorAll('.btn-pdf-global, .filter-panel, .btn-wa, .menu-actions, .ctrl-btn');
    elemenDisembunyikan.forEach(el => el.style.display = 'none');

    // MENDETEKSI FILTER
    let teksFilter = "Tidak ada filter (Semua Data)";
    if (menuId === 'tabDatabase') {
        let fName = document.getElementById('fSearchNama')?.value;
        let elKat = document.getElementById('filterKategori');
        let elStat = document.getElementById('filterStatus');
        let fKat = elKat?.options[elKat.selectedIndex]?.text;
        let fStat = elStat?.options[elStat.selectedIndex]?.text;
        
        let info = [];
        if(fName) info.push("Cari: " + fName);
        if(elKat?.value) info.push("Produk: " + fKat);
        if(elStat?.value) info.push("Status: " + fStat);
        if(info.length > 0) teksFilter = info.join(" | ");
    } else if (menuId === 'tabMarketing') {
        let elCamp = document.getElementById('filterMktCampaign');
        let fCamp = elCamp?.options[elCamp.selectedIndex]?.text;
        let fStart = document.getElementById('fMktStart')?.value;
        let fEnd = document.getElementById('fMktEnd')?.value;
        
        let info = [];
        if(elCamp?.value) info.push("Campaign: " + fCamp);
        if(fStart || fEnd) info.push(`Tgl: ${fStart||'...'} s/d ${fEnd||'...'}`);
        if(info.length > 0) teksFilter = info.join(" | ");
    }

    // MEMBUAT KOP LAPORAN
    let tglDownload = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
    let headerHTML = document.createElement('div');
    headerHTML.id = "tempPdfHeader";
    headerHTML.style.cssText = "padding:20px; margin-bottom:20px; border-bottom:3px solid #0f172a; background-color:#ffffff; color:#0f172a;";
    headerHTML.innerHTML = `
        <h1 style="margin:0 0 10px 0; font-size:22px; font-weight:900; text-transform:uppercase;">${judulLaporan}</h1>
        <table style="width:100%; border:none; font-size:12px; font-weight:bold; color:#475569; margin:0; background:transparent;">
            <tr><td style="width:130px; padding:3px 0; border:none; text-align:left;">Waktu Cetak Dokumen</td><td style="padding:3px 0; border:none; text-align:left;">: ${tglDownload} WIB</td></tr>
            <tr><td style="padding:3px 0; border:none; text-align:left;">Filter Digunakan</td><td style="padding:3px 0; border:none; text-align:left;">: <span style="color:#ef4444;">${teksFilter}</span></td></tr>
        </table>
    `;
    elemen.insertBefore(headerHTML, elemen.firstChild);

    // BUKA GULUNGAN TABEL
    const tabelScroll = elemen.querySelectorAll('.table-responsive');
    const styleAsli = [];
    tabelScroll.forEach((tb, index) => {
        styleAsli[index] = { maxHeight: tb.style.maxHeight, overflow: tb.style.overflow };
        tb.style.maxHeight = 'none'; 
        tb.style.overflow = 'visible'; 
    });

    // BEKUKAN ANIMASI AGAR TIDAK GHOSTING
    const styleAntiBuram = document.createElement('style');
    styleAntiBuram.innerHTML = `
        * { 
            animation: none !important; 
            transition: none !important; 
            transform: none !important; 
        }
    `;
    document.head.appendChild(styleAntiBuram);

    document.body.style.cursor = 'wait';
    
    // Waktu jeda dinaikkan ke 1 detik memastikan Chart.js selesai menggambar
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    try {
        // PERBAIKAN GRAFIK TERPOTONG: Gunakan scrollWidth dinamis
        const canvas = await html2canvas(elemen, {
            scale: 1.5, // 1.5 adalah titik ideal (Teks cukup tajam, tapi file tidak bengkak)
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: elemen.scrollWidth,       // Memaksa lebar 100% utuh
            height: elemen.scrollHeight,     // Memaksa tinggi 100% utuh
            windowWidth: elemen.scrollWidth, // Menyamakan lensa kamera dengan lebar layar
            windowHeight: elemen.scrollHeight
        });
        
        // PERBAIKAN UKURAN FILE: Kembali ke JPEG dengan kualitas 80%
        const imgData = canvas.toDataURL('image/jpeg', 0.8); 
        
        const pdf = new jsPDF('l', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        const tglHariIni = new Date().toISOString().slice(0, 10);
        pdf.save(`${namaFile}_${tglHariIni}.pdf`);
        
    } catch (error) {
        console.error("Gagal membuat PDF:", error);
        alert("Gagal membuat PDF. Pesan sistem: " + error.message);
    } finally {
        let tempHeader = document.getElementById('tempPdfHeader');
        if (tempHeader) tempHeader.remove();
        
        if (styleAntiBuram) styleAntiBuram.remove();
        
        elemenDisembunyikan.forEach(el => el.style.display = '');
        tabelScroll.forEach((tb, index) => {
            tb.style.maxHeight = styleAsli[index].maxHeight;
            tb.style.overflow = styleAsli[index].overflow;
        });
        document.body.style.cursor = 'default';
    }
}
        

        window.editDariTabel = function(key) {
            // 1. Kosongkan kotak pencarian (jika ada teks tertinggal)
            let searchInput = document.getElementById('searchLeadTxt');
            if (searchInput) searchInput.value = '';

            // 2. Render ulang SELURUH data langsung dari Master Database ke dropdown
            let selectElement = document.getElementById('pilihLead');
            selectElement.innerHTML = '<option value="">-- Pilih Nama Klien / No HP --</option>';
            
            dataGlobal.forEach(row => {
                let iconStatus = row.status.includes('Lunas') ? '🟢' : (row.status.includes('DP') ? '🟡' : '🔴');
                let compositeKey = row.no_hp + '|' + formati(row.tanggal_chat) + '|' + row.minat;
                selectElement.appendChild(new Option(`${iconStatus} ${row.nama} (${row.no_hp}) [Chat: ${formatd(row.tanggal_chat)}] - ${row.minat}`, compositeKey));
            });

            // 3. Paksa sistem memilih value yang sesuai dengan tombol Edit
            selectElement.value = key;
            
            // 4. Tarik dan tampilkan data ke dalam form Aktivasi
            loadLeadKeForm();
            
            // 5. Pindah Tab ke Menu 2 secara otomatis
            let tabBtns = document.querySelectorAll('.tab-btn');
            if(tabBtns.length > 1) bukaTab('tabUpdateCustomer', tabBtns[1]);
            
            // 6. Gulir layar perlahan ke atas agar form langsung terlihat
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        
       
        
        function hitungFinansial() { let total = Number(document.getElementById('input_total').value) || 0; let bayar1 = Number(document.getElementById('input_bayar1').value) || 0; let bayar2 = Number(document.getElementById('input_bayar2').value) || 0; document.getElementById('display_sisa_hutang').innerText = 'Rp ' + (total - (bayar1 + bayar2)).toLocaleString('id-ID'); }
        function loadLeadKeForm() { const parts = document.getElementById('pilihLead').value.split('|'); const k = dataGlobal.find(r => r.no_hp.toString() === parts[0].toString() && formati(r.tanggal_chat) === parts[1] && r.minat === parts[2]); if(k) { document.getElementById('cust_no_hp').value = k.no_hp; document.getElementById('cust_tanggal_chat').value = formati(k.tanggal_chat); document.getElementById('cust_nama').value = k.nama; document.getElementById('cust_sumber').value = k.sumber; document.getElementById('cust_alamat').value = k.alamat; document.getElementById('cust_data_anak').value = formati(k.data_anak); document.getElementById('cust_gender_anak').value = k.gender_anak; document.getElementById('cust_status').value = k.status; document.getElementById('cust_minat').value = k.minat; renderPaketLayanan(); if(k.paket && k.paket !== "-") document.getElementById('cust_paket').value = k.paket; renderVarianLayanan(); if(k.varian && k.varian !== "-") document.getElementById('cust_varian').value = k.varian; if(k.promo && k.promo !== "-") { document.querySelectorAll('.promo-cb').forEach(cb => cb.checked = k.promo.split(', ').includes(cb.value)); } document.getElementById('cust_lokasi').value = k.lokasi !== "-" ? k.lokasi : (STUDIO_CONFIG.lokasi ? STUDIO_CONFIG.lokasi[0] : ""); document.getElementById('cust_jadwal').value = formati(k.jadwal); document.getElementById('input_total').value = k.total || 0; document.getElementById('input_hpp').value = k.hpp || 0; document.getElementById('input_transport').value = k.transport || 0; document.getElementById('cust_tgl_bayar1').value = formati(k.tgl_bayar1); document.getElementById('input_bayar1').value = k.jml_bayar1 || 0; document.getElementById('cust_tgl_bayar2').value = formati(k.tgl_bayar2); document.getElementById('input_bayar2').value = k.jml_bayar2 || 0; hitungFinansial(); document.getElementById('formCustomer').style.display = 'block'; } }
        function renderPaketLayanan() { let minat = document.getElementById('cust_minat').value; document.getElementById('cust_paket').innerHTML = (STUDIO_CONFIG.paketMap[minat] || ["Standar"]).map(p => `<option value="${p}">${p}</option>`).join(''); renderVarianLayanan(); }
        function renderVarianLayanan() { let paket = document.getElementById('cust_paket').value; document.getElementById('cust_varian').innerHTML = (STUDIO_CONFIG.varianMap[paket] || ["Default"]).map(v => `<option value="${v}">${v}</option>`).join(''); }
        
        function rp(num) { return Number(num).toLocaleString('id-ID'); }
        function prc(part, total) { return total==0 ? "0%" : ((part/total)*100).toFixed(1) + "%"; }
        function getTime(d) { return new Date(d).setHours(0,0,0,0); }
        function daysDiff(start, end) { return Math.floor((new Date(end).getTime() - new Date(start).getTime()) / (1000*3600*24)); }
        function monthDiff(start, end) { let d1=new Date(start), d2=new Date(end); return (d2.getFullYear()-d1.getFullYear())*12 + (d2.getMonth()-d1.getMonth()); }
        function formatd(iso) { try { let d=new Date(iso); if(isNaN(d))return"-"; return d.toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'2-digit'});}catch(e){return"-";} }
        function formati(iso) { try { let d = new Date(iso); if (isNaN(d.getTime())) return ""; let m = ''+(d.getMonth()+1), day = ''+d.getDate(), y = d.getFullYear(); if(m.length<2) m='0'+m; if(day.length<2) day='0'+day; return [y,m,day].join('-'); } catch(e) { return ""; } }
        function cleanHP(hp) { let s = hp.toString().trim(); return s.startsWith('0') ? '62'+s.substring(1) : s; }
     
        // ======================= LOGIKA ORG CHART (DENGAN RE-ORDER & HIRARKI LEVEL) =======================
        function renderOrgChart() {
            let container = document.getElementById('orgContainer');
            container.innerHTML = '';
            
            let defaultOrg = [
                {title: "Visionary", name: "", roles: "1. Ide & Visi Baru\n2. Hubungan Strategis\n3. Budaya Perusahaan", level: "1"},
                {title: "Integrator", name: "Karvien", roles: "1. Eksekusi Rencana Bisnis\n2. Menyatukan Tim (LMA)\n3. P&L (Laba Rugi)", level: "1"},
                {title: "Manager Marketing", name: "", roles: "1. Meta Ads Optimization\n2. Funneling Strategy\n3. Konten Sosmed", level: "2"},
                {title: "Staff Marketing / Editor", name: "", roles: "1. Edit Hasil Foto\n2. Jadwal Posting\n3. Balas Chat Awal", level: "3"}
            ];
            
            let orgData = STUDIO_CONFIG.orgChart && STUDIO_CONFIG.orgChart.length > 0 ? STUDIO_CONFIG.orgChart : defaultOrg;
            orgData.forEach(box => { 
                tambahOrgBox(box.title, box.name, box.roles, box.level || "1"); 
            });
        }

        function tambahOrgBox(t = "", n = "", r = "", lvl = "1") {
            let container = document.getElementById('orgContainer');
            let boxHtml = `
                <div class="org-box lvl-${lvl}">
                    <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 12px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 5px;">
                        <span style="font-weight:800; color:var(--text-light); font-size:11px;">📍 ATUR POSISI:</span>
                        <div style="display:flex; gap:4px;">
                            <button type="button" class="ctrl-btn" onclick="geserBox(this, 'atas')" title="Geser Naik">🔼</button>
                            <button type="button" class="ctrl-btn" onclick="geserBox(this, 'bawah')" title="Geser Turun">🔽</button>
                        </div>
                    </div>
                    
                    <label>Tingkatan Jabatan (Hirarki)</label>
                    <select class="org-level" onchange="updateWarnaBox(this)">
                        <option value="1" ${lvl === "1" ? "selected" : ""}>⭐ Level 1: Core / Direksi</option>
                        <option value="2" ${lvl === "2" ? "selected" : ""}>⚡ Level 2: Manajer / Head</option>
                        <option value="3" ${lvl === "3" ? "selected" : ""}>👥 Level 3: Staff / Eksekutor</option>
                    </select>

                    <label>Posisi / Peran</label>
                    <input type="text" class="org-title" value="${t}" placeholder="Cth: Manajer Operasional" style="font-weight:bold;">
                    
                    <label>Nama Pengemban</label>
                    <input type="text" class="org-name" value="${n}" placeholder="Cth: Budi">
                    
                    <label>Tanggung Jawab Utama</label>
                    <textarea class="org-roles" rows="5" placeholder="1.\n2.\n3.">${r}</textarea>
                    
                    <button type="button" onclick="this.parentElement.remove()" style="background:#fee2e2; color:#991b1b; border:1px solid #fca5a5; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:11px; width:100%; font-weight:bold; margin-top:5px;">🗑️ Hapus Posisi</button>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', boxHtml);
        }

        // Fungsi pembantu untuk menukar urutan kotak di layar secara instan
        window.geserBox = function(btn, arah) {
            let box = btn.closest('.org-box');
            if (arah === 'atas') {
                let prev = box.previousElementSibling;
                if (prev) box.parentElement.insertBefore(box, prev);
            } else {
                let next = box.nextElementSibling;
                if (next) box.parentElement.insertBefore(next, box);
            }
        };

        // Fungsi pembantu untuk mengubah warna batas top box saat dropdown level diganti
        window.updateWarnaBox = function(selectEl) {
            let box = selectEl.closest('.org-box');
            box.className = 'org-box lvl-' + selectEl.value;
        };

        

        // ======================= LOGIKA TAB 4: MARKETING =======================
        // ==========================================
// RUMUS BANTUAN UNTUK MENGHITUNG SELISIH HARI
// ==========================================
        function daysDiff(tgl1, tgl2) {
            if (!tgl1 || !tgl2) return 0;
            try {
            let d1 = new Date(tgl1);
            let d2 = new Date(tgl2);
        // Hitung selisih waktu dalam milidetik, lalu ubah ke hari
            let diffTime = d2.getTime() - d1.getTime();
            let diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
            return diffDays > 0 ? diffDays : 0; // Jangan biarkan minus
            } catch(e) {
            return 0;
            }
        };

// // ======================= LOGIKA TAB 4: MARKETING (DENGAN CPL, OMZET & GRAFIK) =======================
function renderMarketingTab() {
    let fCamp = document.getElementById('filterMktCampaign').value;
    let fStart = document.getElementById('fMktStart').value;
    let fEnd = document.getElementById('fMktEnd').value;
    
    let mktDataDaily = {}, mktDataSummary = {}; 
    let tot = { spend:0, leads: new Set(), dp:0, omzet:0, days:0, count:0 };

    // 1. FILTER & PROSES DATA KLIEN
    let fd = dataGlobal;
    if(fCamp) fd = fd.filter(r => r.minat === fCamp);
    if(fStart) fd = fd.filter(r => getTime(r.tanggal_chat) >= getTime(fStart));
    if(fEnd) fd = fd.filter(r => getTime(r.tanggal_chat) <= getTime(fEnd));

    fd.forEach(r => {
        let t = formati(r.tanggal_chat);
        let c = r.minat || "Lainnya";
        let kD = t + '|' + c, kS = c;

        if(!mktDataDaily[kD]) mktDataDaily[kD] = { date:t, camp:c, spend:0, leads: new Set(), dp:0, omzet:0, days:0 };
        if(!mktDataSummary[kS]) mktDataSummary[kS] = { camp:c, spend:0, leads: new Set(), dp:0, omzet:0, days:0 };
        
        let wa = r.no_hp; 
        if (!wa && !r.nama && !r.status) return;

        mktDataDaily[kD].leads.add(wa); 
        mktDataSummary[kS].leads.add(wa);
        tot.leads.add(wa); 

        if(r.status && (r.status.includes('DP') || r.status.includes('Lunas'))) {
            mktDataDaily[kD].dp++; 
            mktDataSummary[kS].dp++;
            tot.dp++;

            let total = Number(r.total) || 0;
            mktDataDaily[kD].omzet += total; 
            mktDataSummary[kS].omzet += total;
            tot.omzet += total; 
            
            if(r.tgl_bayar1) {
                let d = daysDiff(r.tanggal_chat, r.tgl_bayar1);
                mktDataDaily[kD].days += d; 
                mktDataSummary[kS].days += d;
                tot.days += d; 
                tot.count++;
            }
        }
    });

    // 2. FILTER & PROSES DATA AD SPEND
    let fAds = dataMarketing;
    if(fCamp) fAds = fAds.filter(m => m.campaign === fCamp);
    if(fStart) fAds = fAds.filter(m => getTime(m.tanggal) >= getTime(fStart));
    if(fEnd) fAds = fAds.filter(m => getTime(m.tanggal) <= getTime(fEnd));

    fAds.forEach(m => {
        let t = formati(m.tanggal);
        let c = m.campaign || "Lainnya";
        let kD = t + '|' + c, kS = c;
        
        if(!mktDataDaily[kD]) mktDataDaily[kD] = { date:t, camp:c, spend:0, leads: new Set(), dp:0, omzet:0, days:0 };
        if(!mktDataSummary[kS]) mktDataSummary[kS] = { camp:c, spend:0, leads: new Set(), dp:0, omzet:0, days:0 };
        
        let s = Number(m.spend) || 0;
        mktDataDaily[kD].spend += s; 
        mktDataSummary[kS].spend += s;
        tot.spend += s;
    });

    // 3. RUMUS KPI GLOBAL & CPL
    let totalLeadsUnik = tot.leads.size;
    let globalCPL = totalLeadsUnik > 0 ? Math.round(tot.spend / totalLeadsUnik) : 0;
    let globalCAC = tot.dp > 0 ? Math.round(tot.spend / tot.dp) : 0;
    let globalCR = totalLeadsUnik > 0 ? ((tot.dp / totalLeadsUnik) * 100).toFixed(1) : 0;
    let globalROAS = tot.spend > 0 ? (tot.omzet / tot.spend).toFixed(1) : 0;
    let globalTime = tot.count > 0 ? (tot.days / tot.count).toFixed(1) : 0;

    // 4. RENDER TABEL SUMMARY
    let htmlS = '', sS = Object.keys(mktDataSummary).sort((a,b)=>mktDataSummary[b].omzet - mktDataSummary[a].omzet);
    sS.forEach(k => {
        let v = mktDataSummary[k];
        let jmlLeads = v.leads.size;
        let cpl = jmlLeads > 0 ? Math.round(v.spend / jmlLeads) : 0;
        let cac = v.dp > 0 ? Math.round(v.spend / v.dp) : 0;
        let cr = jmlLeads > 0 ? (v.dp/jmlLeads*100).toFixed(1) : 0;
        let roas = v.spend > 0 ? (v.omzet/v.spend).toFixed(1) : 0;
        let avgTime = v.dp > 0 ? (v.days/v.dp).toFixed(1) : 0;

        htmlS += `<tr>
            <td><strong>${v.camp}</strong></td>
            <td>Rp ${rp(v.spend)}</td>
            <td>${jmlLeads}</td>
            <td style="color:#2563eb; font-weight:bold;">Rp ${rp(cpl)}</td>
            <td><strong style="color:#d97706">${v.dp}</strong></td>
            <td>${cr}%</td>
            <td style="color:#2563eb; font-weight:bold;">Rp ${rp(cac)}</td>
            <td style="color:#10b981; font-weight:bold;">Rp ${rp(v.omzet)}</td>
            <td style="color:#059669; font-weight:bold;">${roas}x</td>
            <td>${avgTime}</td>
        </tr>`;
    });
    htmlS += `<tr style="font-weight:bold; background:#e2e8f0;"><td>TOTAL GLOBAL</td><td>Rp ${rp(tot.spend)}</td><td>${totalLeadsUnik}</td><td style="color:#8b5cf6;">Rp ${rp(globalCPL)}</td><td>${tot.dp}</td><td>${globalCR}%</td><td style="color:#1fcc00;">Rp ${rp(globalCAC)}</td><td style="color:#10b981;">Rp ${rp(tot.omzet)}</td><td style="color:#059669;">${globalROAS}x</td><td>${globalTime}</td></tr>`;
    document.getElementById('bMarketingSummary').innerHTML = htmlS;

    // 5. RENDER TABEL HARIAN & PERSIAPAN DATA GRAFIK
    let htmlD = '', sD = Object.keys(mktDataDaily).sort().reverse(); 
    
    // Array untuk grafik (Harus urut tanggal lama -> baru)
    let cDates = [], cSpend = [], cOmzet = [], cLeads = [], cDp = [];
    let sDChart = Object.keys(mktDataDaily).sort(); 

    sDChart.forEach(k => {
        let v = mktDataDaily[k];
        cDates.push(v.date);
        cSpend.push(v.spend);
        cOmzet.push(v.omzet);
        cLeads.push(v.leads.size);
        cDp.push(v.dp);
    });

    sD.forEach(k => {
        let v = mktDataDaily[k];
        let jmlLeads = v.leads.size;
        let cpl = jmlLeads > 0 ? Math.round(v.spend / jmlLeads) : 0;
        let cac = v.dp > 0 ? Math.round(v.spend / v.dp) : 0;
        let cr = jmlLeads > 0 ? (v.dp/jmlLeads*100).toFixed(1) : 0;
        let roas = v.spend > 0 ? (v.omzet/v.spend).toFixed(1) : 0;
        let avgTime = v.dp > 0 ? (v.days/v.dp).toFixed(1) : 0;

        htmlD += `<tr>
            <td>${v.date}</td>
            <td>${v.camp}</td>
            <td>Rp ${rp(v.spend)}</td>
            <td>${jmlLeads}</td>
            <td style="color:#8b5cf6; font-weight:bold;">Rp ${rp(cpl)}</td>
            <td><strong style="color:#d97706">${v.dp}</strong></td>
            <td>${cr}%</td>
            <td style="color:#1fcc00; font-weight:bold;">${v.dp>0?'Rp '+rp(cac):'-'}</td>
            <td style="color:#10b981; font-weight:bold;">Rp ${rp(v.omzet)}</td>
            <td style="color:#059669; font-weight:bold;">${roas}x</td>
            <td>${avgTime}</td>
        </tr>`;
    });
    htmlD += `<tr style="font-weight:bold; background:#e2e8f0;"><td>TOTAL GLOBAL</td><td>-</td><td>Rp ${rp(tot.spend)}</td><td>${totalLeadsUnik}</td><td style="color:#8b5cf6;">Rp ${rp(globalCPL)}</td><td>${tot.dp}</td><td>${globalCR}%</td><td style="color:#1fcc00;">Rp ${rp(globalCAC)}</td><td style="color:#10b981;">Rp ${rp(tot.omzet)}</td><td style="color:#059669;">${globalROAS}x</td><td>${globalTime}</td></tr>`;
    document.getElementById('bMarketing').innerHTML = htmlD;

    // 6. SUNTIK DATA KE KOTAK KPI
    document.getElementById('kpiSpend').innerText = `Rp ${rp(tot.spend)}`;
    document.getElementById('kpiLeads').innerText = `${totalLeadsUnik} Klien`;
    let elKpiCpl = document.getElementById('kpiCPL'); if(elKpiCpl) elKpiCpl.innerText = `Rp ${rp(globalCPL)}`;
    document.getElementById('kpiCAC').innerText = `Rp ${rp(globalCAC)}`;
    document.getElementById('kpiClosing').innerText = `${tot.dp} Transaksi`;
    document.getElementById('kpiCR').innerText = `${globalCR}%`;
    document.getElementById('kpiTime').innerText = `${globalTime} Hari`;
    document.getElementById('kpiROAS').innerText = `${globalROAS}x`;

    // 7. LOGIKA GRAFIK CORONG FUNNEL DETAIL
    let wTofu = 100; 
    let wMofu = totalLeadsUnik > 0 ? (tot.dp / totalLeadsUnik) * 100 : 0; 
    let wBofu = wMofu * 0.75; 
    
    wMofu = Math.max(wMofu, 5); wBofu = Math.max(wBofu, 5);
    wMofu = Math.min(wMofu, 100); wBofu = Math.min(wBofu, 100);

    let fnlTofu = document.getElementById('fnlTofuBar');
    let fnlMofu = document.getElementById('fnlMofuBar');
    let fnlBofu = document.getElementById('fnlBofuBar');
    
    if (fnlTofu && fnlMofu && fnlBofu) {
        fnlTofu.style.width = wTofu + '%';
        fnlTofu.innerHTML = `<span style="font-size:15px; font-weight:900;">${totalLeadsUnik} Leads Unik</span><span style="font-size:11px; opacity:0.9;">CPL: Rp ${rp(globalCPL)}</span>`;
        
        fnlMofu.style.width = wMofu + '%';
        fnlMofu.innerHTML = `<span style="font-size:15px; font-weight:900;">${tot.dp} Closing (${globalCR}%)</span><span style="font-size:11px; opacity:0.9;">CAC: Rp ${rp(globalCAC)}</span>`;
        
        fnlBofu.style.width = wBofu + '%';
        fnlBofu.innerHTML = `<span style="font-size:15px; font-weight:900;">Omzet Rp ${rp(tot.omzet)}</span><span style="font-size:11px; opacity:0.9;">ROAS: ${globalROAS}x</span>`;
    }

    // 8. RENDER GRAFIK HARIAN (DUAL-AXIS)
    if(window.myMktHarianChart) window.myMktHarianChart.destroy();
    let ctxMkt = document.getElementById('chartMarketingHarian').getContext('2d');
    window.myMktHarianChart = new Chart(ctxMkt, {
        type: 'bar',
        data: {
            labels: cDates,
            datasets: [
                {
                    label: 'Omzet Penjualan (Rp)',
                    type: 'line',
                    data: cOmzet,
                    borderColor: '#10b981',
                    backgroundColor: '#10b981',
                    borderWidth: 2,
                    yAxisID: 'yRupiah',
                    tension: 0.3
                },
                {
                    label: 'Ad Spend (Rp)',
                    type: 'line',
                    data: cSpend,
                    borderColor: '#ef4444',
                    backgroundColor: '#ef4444',
                    borderWidth: 2,
                    yAxisID: 'yRupiah',
                    tension: 0.3
                },
                {
                    label: 'Leads Masuk',
                    type: 'bar',
                    data: cLeads,
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    yAxisID: 'yQty'
                },
                {
                    label: 'Closing (DP+)',
                    type: 'bar',
                    data: cDp,
                    backgroundColor: 'rgba(245, 158, 11, 0.8)',
                    yAxisID: 'yQty'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                x: { stacked: false },
                yRupiah: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'Nilai Rupiah (Rp)' }
                },
                yQty: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: 'Jumlah Orang' },
                    grid: { drawOnChartArea: false } // Agar garis background tidak bentrok
                }
            }
        }
    });
}

        // ======================= LOGIKA TAB 3: DATABASE & KOHORT =======================
// ======================= LOGIKA TAB 3: DATABASE & KOHORT (KEBAL ERROR) =======================
function terapkanFilterMaster() {
    let fd = dataGlobal;

    const fName = document.getElementById('fSearchNama').value.toLowerCase();
    const fKat = document.getElementById('filterKategori').value;
    const fStat = document.getElementById('filterStatus').value; 
    const fChatS = document.getElementById('fChatStart').value;
    const fChatE = document.getElementById('fChatEnd').value;
    const fDpS = document.getElementById('fDpStart').value;
    const fDpE = document.getElementById('fDpEnd').value;
    const fLnS = document.getElementById('fLnStart').value;
    const fLnE = document.getElementById('fLnEnd').value;

    if(fName) fd = fd.filter(r => (r.nama && r.nama.toLowerCase().includes(fName)) || (r.no_hp && r.no_hp.toString().includes(fName)));
    if(fKat) fd = fd.filter(r => r.minat === fKat);
    
   // --- BLOK FILTER STATUS FUNNEL (KUNCI ANGKA ANTI-GAGAL) ---
   // Filter Status
if(fStat) {
    fd = fd.filter(r => {
        let status = String(r.status || "").toLowerCase();
        if (fStat === "dp") return status.includes("dp");
        if (fStat === "lunas") return status.includes("lunas");
        if (fStat === "pending") return !status.includes("dp") && !status.includes("lunas");
        return true;
    });
}
    // ----------------------------------------------------------
    
    if(fChatS) fd = fd.filter(r => getTime(r.tanggal_chat) >= getTime(fChatS));
    if(fChatE) fd = fd.filter(r => getTime(r.tanggal_chat) <= getTime(fChatE));
    if(fDpS) fd = fd.filter(r => getTime(r.tgl_bayar1) >= getTime(fDpS));
    if(fDpE) fd = fd.filter(r => getTime(r.tgl_bayar1) <= getTime(fDpE));
    if(fLnS) fd = fd.filter(r => getTime(r.tgl_bayar2) >= getTime(fLnS));
    if(fLnE) fd = fd.filter(r => getTime(r.tgl_bayar2) <= getTime(fLnE));

    document.getElementById('txtCount').innerText = `Menampilkan: ${fd.length} Baris Data`;

    let uUnik = new Set(), omzet=0, penerimaan=0, totDP=0, totLunas=0, piutang=0;
    let dailyFinance = {}; 
    let prodMap = {}; 

    fd.forEach(r => {
        uUnik.add(r.no_hp);
        let tot = Number(r.total)||0, dp = Number(r.jml_bayar1)||0, ln = Number(r.jml_bayar2)||0, sisa = Number(r.sisa_hutang)||0;
        omzet += tot; penerimaan += (dp+ln); totDP += dp; totLunas += ln; piutang += sisa;
        
        let pKey = (r.minat || 'Lainnya') + '|' + (r.paket && r.paket !== "-" ? r.paket : 'Tanpa Paket');
        if(!prodMap[pKey]) prodMap[pKey] = {minat: r.minat||'Lainnya', paket: (r.paket && r.paket !== "-" ? r.paket : 'Tanpa Paket'), trx: 0, omzet: 0};
        prodMap[pKey].trx++;
        prodMap[pKey].omzet += tot;

        if(r.tgl_bayar1 && r.tgl_bayar1.length > 5) {
            let d1 = formati(r.tgl_bayar1);
            if(!dailyFinance[d1]) dailyFinance[d1] = {trx:0, omz:0, dp:0, ln:0};
            dailyFinance[d1].trx++; dailyFinance[d1].omz += tot; dailyFinance[d1].dp += dp;
        }
        if(r.tgl_bayar2 && r.tgl_bayar2.length > 5) {
            let d2 = formati(r.tgl_bayar2);
            if(!dailyFinance[d2]) dailyFinance[d2] = {trx:0, omz:0, dp:0, ln:0};
            dailyFinance[d2].ln += ln; 
        }
    });

    document.getElementById('vUnik').innerText = uUnik.size; document.getElementById('vTransaksi').innerText = fd.length;
    document.getElementById('vPenjualanBaru').innerText = rp(omzet); document.getElementById('vDP').innerText = rp(totDP); 
    document.getElementById('vLunas').innerText = rp(totLunas); document.getElementById('vPiutang').innerText = rp(piutang); 

    let prodArr = Object.values(prodMap).sort((a,b) => b.omzet - a.omzet);
    let htmlProd = '';
    let sumProdTrx = 0, sumProdOmzet = 0;
    prodArr.forEach(p => {
        sumProdTrx += p.trx; sumProdOmzet += p.omzet;
        htmlProd += `<tr><td>${p.minat}</td><td><strong>${p.paket}</strong></td><td>${p.trx}</td><td>Rp ${rp(p.omzet)}</td><td style="color:#64748b;">Rp ${rp(p.trx > 0 ? p.omzet/p.trx : 0)}</td></tr>`;
    });
    if(sumProdTrx > 0) htmlProd += `<tr class="total-row"><td colspan="2">TOTAL</td><td>${sumProdTrx}</td><td>Rp ${rp(sumProdOmzet)}</td><td>-</td></tr>`;
    document.getElementById('bProduk').innerHTML = htmlProd || '<tr><td colspan="5">Data kosong.</td></tr>';

    let sortedFinDates = Object.keys(dailyFinance).sort().reverse(); 
    let htmlFin = '', c_dates = [], c_vals = [];
    let t_fin_trx=0, t_fin_omz=0, t_fin_dp=0, t_fin_ln=0;

    sortedFinDates.forEach(d => {
        let v = dailyFinance[d];
        t_fin_trx += v.trx; t_fin_omz += v.omz; t_fin_dp += v.dp; t_fin_ln += v.ln;
        
        htmlFin += `<tr><td>${d}</td><td>${v.trx}</td><td>Rp ${rp(v.omz)}</td><td>Rp ${rp(v.dp)}</td><td>Rp ${rp(v.ln)}</td><td><strong style="color:var(--success);">Rp ${rp(v.dp+v.ln)}</strong></td></tr>`;
        c_dates.unshift(d); c_vals.unshift(v.dp+v.ln); 
    });

    if(t_fin_trx > 0) {
        htmlFin += `<tr class="total-row"><td>TOTAL KESELURUHAN</td><td>${t_fin_trx}</td><td>Rp ${rp(t_fin_omz)}</td><td>Rp ${rp(t_fin_dp)}</td><td>Rp ${rp(t_fin_ln)}</td><td style="color:#fbbf24;">Rp ${rp(t_fin_dp+t_fin_ln)}</td></tr>`;
    }
    document.getElementById('bKeuanganHarian').innerHTML = htmlFin || '<tr><td colspan="6">Data kosong.</td></tr>';

    if(myFinanceChart) myFinanceChart.destroy();
    myFinanceChart = new Chart(document.getElementById('financeChart'), {
        type: 'line', data: { labels: c_dates, datasets: [{ label: 'Cash Masuk (Rp)', data: c_vals, borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', fill: true, tension: 0.2 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    // --- RENDER MASTER TABLE ---
    let tb = document.getElementById('tabelBody'); 
    let htmlHTMLRows = [];
    let waScript = typeof STUDIO_CONFIG !== 'undefined' && STUDIO_CONFIG.waTemplate ? STUDIO_CONFIG.waTemplate : "Halo Ibu [NAMA], konfirmasi sesi [MINAT]";

    fd.forEach((r, i) => {
    if(i > 500) return; 

    // --- LOGIKA PERHITUNGAN SESI ---
    let hariLagi = "-";
    let badgeHari = "bg-gray";
    if (r.jadwal) {
        let tglSesi = new Date(r.jadwal);
        let sekarang = new Date();
        let selisih = Math.ceil((tglSesi - sekarang) / (1000 * 60 * 60 * 24));
        
        if (selisih < 0) {
            hariLagi = "LEWAT " + Math.abs(selisih) + " HR";
            badgeHari = "bg-red-alert"; 
        } else if (selisih <= 3) {
            hariLagi = selisih + " HR LAGI";
            badgeHari = "bg-red";
        } else {
            hariLagi = selisih + " HR";
            badgeHari = "bg-blue";
        }
    }

    // --- LOGIKA HIGHLIGHT FUNNEL ---
    let statusTeks = String(r.status || "Pending");
    let statusTeksLower = statusTeks.toLowerCase();
    let rowClass = "";
    if (statusTeksLower.includes('lunas')) rowClass = 'funnel-highlight-lunas';
    else if (statusTeksLower.includes('dp')) rowClass = 'funnel-highlight-dp';
    else rowClass = 'funnel-highlight-pending';

    let compositeKey = (r.no_hp || "") + '|' + formati(r.tanggal_chat) + '|' + (r.minat || "");
    let textWA = encodeURIComponent(waScript.replace(/\[NAMA\]/g, r.nama || "").replace(/\[MINAT\]/g, r.minat || ""));

    htmlHTMLRows.push(`<tr class="${rowClass}">
        <td><strong>BM-${r.tanggal_chat?r.tanggal_chat.replace(/-/g,"").substring(2,8):"000"}</strong></td>
        <td><strong>${r.nama || "-"}</strong><br><small>${r.no_hp || "-"}</small></td>
        <td>${r.minat || "-"}<br><small>${r.paket && r.paket !== "-" ? r.paket : "-"}</small></td>
        <td>
            <small>Chat: ${formatd(r.tanggal_chat)}</small><br>
            <small>DP: ${formatd(r.tgl_bayar1)}</small><br>
            <small>Anak: ${formatTanggalManusia(r.data_anak)}</small><br>
            <small>Lunas: ${formatd(r.tgl_bayar2)}</small>
        </td>
        <td>Rp ${rp(r.total)}<br><span class="badge ${statusTeksLower.includes('lunas')?'bg-green':'bg-yellow'}">${statusTeks}</span></td>
        <td><span class="badge ${badgeHari}">${hariLagi}</span></td>
        <td>
            <div style="display:flex; gap:4px; justify-content:center;">
                <button onclick="editDariTabel('${compositeKey}')" class="btn-wa" style="background:#f59e0b;" title="Edit">✏️</button>
                <a href="https://wa.me/${cleanHP(r.no_hp)}?text=${textWA}" target="_blank" class="btn-wa" style="background:var(--whatsapp);" title="WA">💬</a>
            </div>
        </td>
    </tr>`);
});
    tb.innerHTML = htmlHTMLRows.join('');

    // Tambahkan fungsi pembantu ini di atas atau di bawah skrip Anda
        function formatTanggalManusia(tglInput) {
            if (!tglInput || tglInput === "-") return "-";
            let d = new Date(tglInput);
            if (isNaN(d.getTime())) return tglInput; // Jika bukan tanggal, tampilkan apa adanya
            return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: '2-digit' });
        }

    if (typeof generateKohortTables === "function") generateKohortTables(fd);
    
    let loadingEl = document.getElementById('loadingStatus');
    if (loadingEl) loadingEl.style.display = 'none';
    
    // --- 3. PENGAMANAN ANTI-CRASH UNTUK DROPDOWN MENU LAIN ---
    if (typeof allLeadOptions !== 'undefined') {
        allLeadOptions = [];
        dataGlobal.forEach(row => {
            let sTeks = String(row.status || "").toLowerCase();
            let iconStatus = sTeks.includes('lunas') ? '🟢' : (sTeks.includes('dp') ? '🟡' : '🔴');
            let compositeKey = (row.no_hp || "") + '|' + formati(row.tanggal_chat) + '|' + (row.minat || "");
            allLeadOptions.push({text: `${iconStatus} ${row.nama || "-"} (${row.no_hp || "-"}) [Chat: ${formatd(row.tanggal_chat)}] - ${row.minat || "-"}`, val: compositeKey});
        });
        if (typeof filterLeadSelect === "function") filterLeadSelect(); 
    }
}

        function generateKohortTables(data) {
            let grpSesi = {}, grpDP = {};
            data.forEach(r => {
                if(r.jadwal && r.jadwal.length > 5) {
                    let mSesi = r.jadwal.substring(0,7);
                    if(!grpSesi[mSesi]) grpSesi[mSesi] = []; grpSesi[mSesi].push(r);
                }
                if(r.tgl_bayar1 && r.tgl_bayar1.length > 5) {
                    let mDP = r.tgl_bayar1.substring(0,7);
                    if(!grpDP[mDP]) grpDP[mDP] = []; grpDP[mDP].push(r);
                }
            });

            const hl = (val, max) => (val === max && val > 0) ? `class="highlight-cell"` : ``;
            let bBooking = '', bClosing = '', bLeads = '';
            let insightData = { ideal: 0, std: 0, dng: 0, gercep: 0, nrm: 0, lma: 0, m0: 0, oldM: 0 };
            
            let lblSesi = Object.keys(grpSesi).sort();
            let c_idl = [], c_std = [], c_dng = [];
            let c_grc = [], c_nrm = [], c_lma = [];
            
            let lblDP = Object.keys(grpDP).sort();
            let c_m0 = [], c_m1 = [], c_m2plus = [];
            
            let sum_tb = 0, sum_idl = 0, sum_std = 0, sum_dng = 0;
            let sum_tc = 0, sum_grc = 0, sum_nrm = 0, sum_lma = 0;
            let sum_td = 0, sum_m0 = 0, sum_m1 = 0, sum_m2plus = 0;

            lblSesi.forEach(m => {
                let rows = grpSesi[m], tB = 0, idl=0, std=0, dng=0;
                rows.forEach(r => {
                    if(r.tgl_bayar1 && r.data_anak && r.data_anak.length > 5) {
                        tB++; let diff = daysDiff(r.tgl_bayar1, r.data_anak);
                        if(diff > 30) idl++; else if(diff >= 0 && diff <= 30) std++; else dng++;
                    }
                });
                c_idl.push(idl); c_std.push(std); c_dng.push(dng);
                insightData.ideal+=idl; insightData.std+=std; insightData.dng+=dng;
                
                sum_tb += tB; sum_idl += idl; sum_std += std; sum_dng += dng;

                let max = Math.max(idl, std, dng);
                if(tB > 0) bBooking += `<tr><td>${m}</td><td>${tB}</td><td ${hl(idl,max)}>${idl}</td><td>${prc(idl,tB)}</td><td ${hl(std,max)}>${std}</td><td>${prc(std,tB)}</td><td ${hl(dng,max)}>${dng}</td><td>${prc(dng,tB)}</td></tr>`;
            });
            if(sum_tb > 0) bBooking += `<tr class="total-row"><td>TOTAL</td><td>${sum_tb}</td><td>${sum_idl}</td><td>${prc(sum_idl,sum_tb)}</td><td>${sum_std}</td><td>${prc(sum_std,sum_tb)}</td><td>${sum_dng}</td><td>${prc(sum_dng,sum_tb)}</td></tr>`;

            lblSesi.forEach(m => {
                let rows = grpSesi[m], tC = 0, grc=0, nrm=0, lma=0;
                rows.forEach(r => {
                    if(r.tanggal_chat && r.tgl_bayar1) {
                        tC++; let diff = daysDiff(r.tanggal_chat, r.tgl_bayar1);
                        if(diff >= 0 && diff <= 3) grc++; else if(diff >= 4 && diff <= 30) nrm++; else if(diff > 30) lma++;
                    }
                });
                c_grc.push(grc); c_nrm.push(nrm); c_lma.push(lma);
                insightData.gercep+=grc; insightData.nrm+=nrm; insightData.lma+=lma;
                
                sum_tc += tC; sum_grc += grc; sum_nrm += nrm; sum_lma += lma;

                let max = Math.max(grc, nrm, lma);
                if(tC > 0) bClosing += `<tr><td>${m}</td><td>${tC}</td><td ${hl(grc,max)}>${grc}</td><td>${prc(grc,tC)}</td><td ${hl(nrm,max)}>${nrm}</td><td>${prc(nrm,tC)}</td><td ${hl(lma,max)}>${lma}</td><td>${prc(lma,tC)}</td></tr>`;
            });
            if(sum_tc > 0) bClosing += `<tr class="total-row"><td>TOTAL</td><td>${sum_tc}</td><td>${sum_grc}</td><td>${prc(sum_grc,sum_tc)}</td><td>${sum_nrm}</td><td>${prc(sum_nrm,sum_tc)}</td><td>${sum_lma}</td><td>${prc(sum_lma,sum_tc)}</td></tr>`;
            
            lblDP.forEach(m => {
                let rows = grpDP[m], tD = 0, m0=0, m1=0, m2plus=0;
                rows.forEach(r => {
                    if(r.tanggal_chat && r.tgl_bayar1) {
                        tD++; let dM = monthDiff(r.tanggal_chat, r.tgl_bayar1);
                        if(dM === 0) m0++; else if(dM === 1) m1++; else m2plus++;
                    }
                });
                c_m0.push(m0); c_m1.push(m1); c_m2plus.push(m2plus);
                insightData.m0 += m0; insightData.oldM += (m1+m2plus);
                
                sum_td += tD; sum_m0 += m0; sum_m1 += m1; sum_m2plus += m2plus;

                let max = Math.max(m0, m1, m2plus);
                if(tD > 0) bLeads += `<tr><td>${m}</td><td>${tD}</td><td ${hl(m0,max)}>${m0}</td><td>${prc(m0,tD)}</td><td ${hl(m1,max)}>${m1}</td><td>${prc(m1,tD)}</td><td ${hl(m2plus,max)}>${m2plus}</td><td>${prc(m2plus,tD)}</td></tr>`;
            });
            if(sum_td > 0) bLeads += `<tr class="total-row"><td>TOTAL</td><td>${sum_td}</td><td>${sum_m0}</td><td>${prc(sum_m0,sum_td)}</td><td>${sum_m1}</td><td>${prc(sum_m1,sum_td)}</td><td>${sum_m2plus}</td><td>${prc(sum_m2plus,sum_td)}</td></tr>`;

            document.getElementById('bBooking').innerHTML = bBooking || '<tr><td colspan="8">Data Kosong.</td></tr>';
            document.getElementById('bClosing').innerHTML = bClosing || '<tr><td colspan="8">Data Kosong.</td></tr>';
            document.getElementById('bLeads').innerHTML = bLeads || '<tr><td colspan="8">Data Kosong.</td></tr>';

            if(chartB) chartB.destroy(); if(chartC) chartC.destroy(); if(chartL) chartL.destroy();
            chartB = new Chart(document.getElementById('chartBooking'), { type: 'bar', data: { labels: lblSesi, datasets: [ { label: 'Ideal', data: c_idl, backgroundColor: '#10b981' }, { label: 'Standard', data: c_std, backgroundColor: '#3b82f6' }, { label: 'Bahaya', data: c_dng, backgroundColor: '#ef4444' } ] }, options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }});
            chartC = new Chart(document.getElementById('chartClosing'), { type: 'bar', data: { labels: lblSesi, datasets: [ { label: 'Gercep', data: c_grc, backgroundColor: '#10b981' }, { label: 'Normal', data: c_nrm, backgroundColor: '#f59e0b' }, { label: 'Lama', data: c_lma, backgroundColor: '#64748b' } ] }, options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: false }, y: { stacked: false } } }});
            chartL = new Chart(document.getElementById('chartLeads'), { type: 'bar', data: { labels: lblDP, datasets: [ { label: 'DP Bulan Sama', data: c_m0, backgroundColor: '#4f46e5' }, { label: 'Chat 1 Bln Sblm', data: c_m1, backgroundColor: '#ec4899' }, { label: 'Chat 2+ Bln Sblm', data: c_m2plus, backgroundColor: '#64748b' } ] }, options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }});

            let list = document.getElementById('insightList');
            let insights = [];
            if((insightData.std + insightData.dng) > insightData.ideal) insights.push("📌 Pasar cenderung mem-booking mendekati hari H. Gunakan strategi kelangkaan ('Slot Terbatas').");
            if(insightData.gercep > insightData.nrm) insights.push("📌 Klien cenderung closing di 0-3 hari pertama. CS wajib *fast response*.");
            if(insightData.m0 > insightData.oldM) insights.push("📌 Fokus Akuisisi Baru: Siklus penjualan bertumpu pada Leads bulan berjalan (M0).");
            else insights.push("📌 Nurturing Aktif: Sebagian besar DP berasal dari leads lama. Follow-up sangat krusial!");
            if(insights.length === 0) insights.push("Menunggu akumulasi data.");
            list.innerHTML = insights.map(i => `<li>${i}</li>`).join('');
        }

/// ============================================================================
// FUNGSI RENDER UTAMA (SISI KIRI: TABEL AKTIF)
// ============================================================================
// 1. FUNGSI METRIK (PASTIKAN INI ADA DI ATAS)
function hitungMetrikEksekusi() {
    let totalRocks = STUDIO_CONFIG.rocks.length;
    let doneRocks = STUDIO_CONFIG.rocks.filter(r => r.status === 'Done').length;
    document.getElementById('kpi_rock').innerText = totalRocks > 0 ? Math.round((doneRocks / totalRocks) * 100) + "%" : "0%";

    let totalTodos = STUDIO_CONFIG.todos.length;
    let doneTodos = STUDIO_CONFIG.todos.filter(t => t.done).length;
    document.getElementById('kpi_todo').innerText = totalTodos > 0 ? Math.round((doneTodos / totalTodos) * 100) + "%" : "0%";

    let totalIssues = STUDIO_CONFIG.issues.length;
    let solveIssues = STUDIO_CONFIG.issues.filter(i => i.status === 'Solve').length;
    document.getElementById('kpi_issue').innerText = totalIssues > 0 ? Math.round((solveIssues / totalIssues) * 100) + "%" : "0%";
}
function updateDashboardUI() {
    hitungMetrikEksekusi(); // Sekarang sudah didefinisikan di atas, error hilang.

    let pending = [
        ...STUDIO_CONFIG.rocks.filter(r => r.status !== 'Done'),
        ...STUDIO_CONFIG.todos.filter(t => !t.done),
        ...STUDIO_CONFIG.issues.filter(i => i.status !== 'Solve')
    ];

    let done = [
        ...STUDIO_CONFIG.rocks.filter(r => r.status === 'Done'),
        ...STUDIO_CONFIG.todos.filter(t => t.done),
        ...STUDIO_CONFIG.issues.filter(i => i.status === 'Solve')
    ];

    document.getElementById('listAktif').innerHTML = pending.length > 0 
        ? pending.map(item => `<div style="padding:2px 0;">• ${item.teks || 'Tugas Baru'}</div>`).join('') 
        : 'Semua target tuntas! 🎉';

    document.getElementById('listPencapaian').innerHTML = done.length > 0 
        ? done.map(item => `<div style="padding:2px 0;">✅ ${item.teks || 'Tugas Selesai'}</div>`).join('') 
        : 'Belum ada pencapaian.';

    renderRocks();
    renderTodos();
    renderIssuesIDS();
}

// --- RENDER ROCKS (PENTING: Gunakan 'i' dari index map asli) ---
function renderRocks() {
    let tbody = document.getElementById('listRocks');
    if (!tbody) return;
    tbody.innerHTML = STUDIO_CONFIG.rocks.map((r, i) => `
        <tr style="border-bottom:1px solid #e2e8f0; display: ${r.status === 'Done' ? 'none' : 'table-row'};">
            <td style="padding:8px;"><input type="text" class="eos-input input-pic" value="${r.kuartal||''}" onchange="updateArray('rocks', ${i}, 'kuartal', this.value)"></td>
            <td style="padding:8px;"><input type="text" class="eos-input" value="${r.teks||''}" onchange="updateArray('rocks', ${i}, 'teks', this.value)"></td>
            <td style="padding:8px;"><input type="text" class="eos-input input-pic" value="${r.pic||''}" onchange="updateArray('rocks', ${i}, 'pic', this.value)"></td>
            <td style="padding:8px;">
                <select class="eos-input" onchange="updateArray('rocks', ${i}, 'status', this.value)">
                    <option value="On Track" ${r.status === 'On Track' ? 'selected' : ''}>🟢 Track</option>
                    <option value="Off Track" ${r.status === 'Off Track' ? 'selected' : ''}>🔴 Off</option>
                    <option value="Done" ${r.status === 'Done' ? 'selected' : ''}>✅ Done</option>
                </select>
            </td>
            <td style="text-align:center;"><button onclick="hapusArrayItem('rocks', ${i})" style="border:none; background:transparent; color:#ef4444; cursor:pointer;">❌</button></td>
        </tr>
    `).join('');
}

function tambahRock() {
    STUDIO_CONFIG.rocks.push({ kuartal: "", teks: "", pic: "", status: "On Track" });
    updateDashboardUI();
}

/// 3. FUNGSI RENDER (DENGAN INPUT LEBIH LEGA)
function renderTodos() {
    let tbody = document.getElementById('listTodos');
    if (!tbody) return;
    
    let issueOptions = '<option value="">-- Tidak Terkait --</option>' + 
        (STUDIO_CONFIG.issues || []).map(iss => `<option value="${iss.teks}">${iss.teks.substring(0,20)}...</option>`).join('');

    tbody.innerHTML = STUDIO_CONFIG.todos.map((t, i) => `
        <tr style="border-bottom:1px solid #e2e8f0; ${t.done ? 'background:#f0fdf4;' : ''}">
            <td style="padding:10px; text-align:center;"><input type="checkbox" ${t.done ? 'checked' : ''} onchange="updateArray('todos', ${i}, 'done', this.checked)"></td>
            <td style="padding:10px;">
                <input type="text" class="eos-input" value="${t.teks||''}" onchange="updateArray('todos', ${i}, 'teks', this.value)" 
                style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:4px;">
            </td>
            <td style="padding:10px;"><select class="eos-input" onchange="updateArray('todos', ${i}, 'issue_terkait', this.value)">${issueOptions.replace(`value="${t.issue_terkait || ''}"`, `value="${t.issue_terkait || ''}" selected`)}</select></td>
            <td style="padding:10px;"><input type="text" class="eos-input" value="${t.pic||''}" onchange="updateArray('todos', ${i}, 'pic', this.value)" style="width:80px;"></td>
            <td style="padding:10px;"><input type="date" class="eos-input" value="${t.deadline ? t.deadline.split('T')[0] : ''}" onchange="updateArray('todos', ${i}, 'deadline', this.value)"></td>
            <td style="text-align:center;"><button onclick="hapusArrayItem('todos', ${i})" style="background:#fee2e2; border:none; padding:6px; cursor:pointer;">🗑️</button></td>
        </tr>
    `).join('');
}

function tambahTodo() {
    STUDIO_CONFIG.todos.push({ teks: "", pic: "", deadline: "", done: false, issue_terkait: "" });
    updateDashboardUI();
}

// --- RENDER ISSUES ---
function renderIssuesIDS() {
    let tbody = document.getElementById('listIssuesIDS');
    if (!tbody) return;
    let rocksOptions = '<option value="">-- Rock --</option>' + STUDIO_CONFIG.rocks.map(r => `<option value="${r.teks}">${r.teks}</option>`).join('');

    tbody.innerHTML = STUDIO_CONFIG.issues.map((iss, i) => `
        <tr style="border-bottom:1px solid #e2e8f0; display: ${iss.status === 'Solve' ? 'none' : 'table-row'};">
            <td style="padding:6px;"><input type="date" class="eos-input input-date" value="${iss.tglDibuat ? iss.tglDibuat.split('T')[0] : ''}" onchange="updateArray('issues', ${i}, 'tglDibuat', this.value)"></td>
            <td style="padding:6px;"><select class="eos-input input-pic" onchange="updateArray('issues', ${i}, 'prio', this.value)"><option value="Tinggi">🔥 T</option><option value="Sedang">⚡ S</option><option value="Rendah">❄️ R</option></select></td>
            <td style="padding:6px;"><textarea class="eos-input input-area" rows="2" onchange="updateArray('issues', ${i}, 'teks', this.value)">${iss.teks||''}</textarea></td>
            <td style="padding:6px;"><input type="text" class="eos-input input-pic" value="${iss.divisi||''}" onchange="updateArray('issues', ${i}, 'divisi', this.value)"></td>
            <td style="padding:6px;"><input type="text" class="eos-input input-pic" value="${iss.pic||''}" onchange="updateArray('issues', ${i}, 'pic', this.value)"></td>
            <td style="padding:6px;"><input type="date" class="eos-input input-date" value="${iss.deadline ? iss.deadline.split('T')[0] : ''}" onchange="updateArray('issues', ${i}, 'deadline', this.value)"></td>
            <td style="padding:6px;"><input type="date" class="eos-input input-date" value="${iss.tglSolve ? iss.tglSolve.split('T')[0] : ''}" onchange="updateArray('issues', ${i}, 'tglSolve', this.value)"></td>
            <td style="padding:6px;"><select class="eos-input" onchange="updateArray('issues', ${i}, 'status', this.value)"><option value="Issue">🔴 Issue</option><option value="Discuss">🟡 Discuss</option><option value="Solve">🟢 Solve</option></select></td>
            <td style="padding:6px;"><textarea class="eos-input input-area" rows="2" onchange="updateArray('issues', ${i}, 'discuss', this.value)">${iss.discuss||''}</textarea></td>
            <td style="padding:6px;"><select class="eos-input" onchange="updateArray('issues', ${i}, 'rock', this.value)">${rocksOptions.replace(`value="${iss.rock}"`, `value="${iss.rock}" selected`)}</select></td>
            <td style="padding:6px;"><input type="text" class="eos-input input-pic" value="${iss.bukti||''}" onchange="updateArray('issues', ${i}, 'bukti', this.value)"></td>
            <td style="text-align:center;"><button onclick="hapusArrayItem('issues', ${i})" style="background:#fee2e2; border:none; border-radius:4px; padding:6px; cursor:pointer;">🗑️</button></td>
        </tr>
    `).join('');
}

function tambahIssue() {
    let today = new Date().toISOString().split('T')[0];
    STUDIO_CONFIG.issues.push({ tglDibuat: today, prio: "Sedang", teks: "", divisi: "", pic: "", deadline: "", tglSolve: "", status: "Issue", discuss: "", rock: "", bukti: "" });
    updateDashboardUI();
}

// --- UTILITY ---
function updateArray(tipe, index, key, value) {
    STUDIO_CONFIG[tipe][index][key] = value;
    updateDashboardUI();
}

function hapusArrayItem(tipe, index) {
    if (confirm("Hapus baris ini?")) {
        STUDIO_CONFIG[tipe].splice(index, 1);
        updateDashboardUI();
    }
}