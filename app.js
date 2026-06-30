// ============================================================
// DigiDesa Ngentak - App Logic (Supabase Integration)
// Semua event listener dipasang di dalam DOMContentLoaded
// agar tidak crash saat library Supabase belum siap
// ============================================================

// ==================== STATE ====================
let supabase = null;
let citizens = [];
let umkms = [];
let currentUser = null;
let selectedCategory = "All";
let searchKeyword = "";
let citizenAdminSearch = "";

const SUPABASE_URL = 'https://ljyklyatixrbxhpnqngw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_wbDZ-1RrgvnwVVJyOTUcTw_smJCBQAc';

// ==================== SEED DATA ====================
const defaultCitizens = [
    { nik: "3402142205880001", name: "Suhardi", gender: "Laki-Laki", age: 38, rt: "RT 03", job: "Petani Bawang", house_photo_url: null },
    { nik: "3402146508900003", name: "Suprihati", gender: "Perempuan", age: 36, rt: "RT 01", job: "Pembuat Bakpia", house_photo_url: null },
    { nik: "3402141203650002", name: "Sugeng Riyadi", gender: "Laki-Laki", age: 61, rt: "RT 04", job: "Pengrajin Bambu", house_photo_url: null },
    { nik: "3402144410980001", name: "Rina Astuti", gender: "Perempuan", age: 28, rt: "RT 02", job: "Guru PAUD", house_photo_url: null },
    { nik: "3402140101750004", name: "Joko Susilo", gender: "Laki-Laki", age: 51, rt: "RT 03", job: "Mekanik Motor", house_photo_url: null },
    { nik: "3402145812040002", name: "Anisa Putri", gender: "Perempuan", age: 22, rt: "RT 06", job: "Mahasiswa", house_photo_url: null },
    { nik: "3402141506450001", name: "Kromo Sentono", gender: "Laki-Laki", age: 81, rt: "RT 05", job: "Pensiunan", house_photo_url: null },
    { nik: "3402142907920003", name: "Budi Santoso", gender: "Laki-Laki", age: 34, rt: "RT 02", job: "Nelayan", house_photo_url: null },
    { nik: "3402146111790004", name: "Siti Aminah", gender: "Perempuan", age: 47, rt: "RT 01", job: "Dagang Kelontong", house_photo_url: null },
    { nik: "3402140804010001", name: "Dwi Nugroho", gender: "Laki-Laki", age: 25, rt: "RT 06", job: "Wiraswasta", house_photo_url: null },
    { nik: "3402145209120005", name: "Larasati", gender: "Perempuan", age: 14, rt: "RT 04", job: "Pelajar SMP", house_photo_url: null },
    { nik: "3402141112180003", name: "Muhammad Rizky", gender: "Laki-Laki", age: 8, rt: "RT 03", job: "Pelajar SD", house_photo_url: null }
];

const defaultUmkms = [
    { name: "Bakpia Ayu Ngentak", owner: "Ibu Suprihati", category: "Kuliner", whatsapp: "6287864303875", description: "Bakpia basah tradisional dengan resep warisan keluarga. Tersedia varian rasa Kacang Hijau, Kumbu Hitam, dan Keju. Menerima pesanan hajatan." },
    { name: "Kipas Bambu Tradisional Ngentak", owner: "Pak Sugeng Riyadi", category: "Kerajinan", whatsapp: "6281234567890", description: "Kerajinan tangan anyaman bambu premium, kuat dan estetik. Sangat cocok untuk souvenir pernikahan, dekorasi ruangan, maupun pemakaian sehari-hari." },
    { name: "Bawang Merah Organik Lestari", owner: "Pak Suhardi", category: "Pertanian", whatsapp: "6282345678901", description: "Menjual bawang merah segar hasil panen langsung dari lahan pasir Dusun Ngentak. Tanpa pestisida kimia berlebih, kualitas super dan tahan lama." },
    { name: "Servis Motor Ngentak Jaya", owner: "Mas Joko Susilo", category: "Jasa", whatsapp: "6283456789012", description: "Melayani servis motor berkala, ganti oli, kelistrikan, dan tambal ban untuk segala tipe motor. Pengerjaan cepat, jujur, dan harga bersahabat." }
];

const defaultBlogs = [
    { id: "1", title: "Gotong Royong Saluran Irigasi Menjelang Musim Tanam", category: "Kegiatan", date: "20 Juni 2026", summary: "Warga Dusun Ngentak RT 03 dan RT 04 melaksanakan kerja bakti pembersihan lumpur dan sampah di sepanjang saluran irigasi utama untuk menjamin kelancaran aliran air ke lahan pertanian bawang merah." },
    { id: "2", title: "Pelatihan Digital Marketing dan Kemasan Kreatif UMKM Dusun", category: "Pemberdayaan", date: "15 Mei 2026", summary: "Untuk mendongkrak penjualan produk desa, mahasiswa KKN bersama kelurahan mengadakan pelatihan desain kemasan serta cara promosi via WhatsApp Business untuk para pelaku UMKM lokal Dusun Ngentak." },
    { id: "3", title: "Rapat Persiapan Agenda Bersih Dusun & Merti Desa Poncosari", category: "Pengumuman", date: "02 Juni 2026", summary: "Bertempat di rumah Bapak Dukuh Ngentak, seluruh pengurus RT dan tokoh masyarakat berkumpul merumuskan rangkaian acara tradisi bersih dusun tahunan agar berlangsung meriah namun tetap khidmat." }
];

// ==================== ROUTING (SPA) ====================
function switchView(viewId) {
    // Tutup semua view
    document.querySelectorAll(".view-section").forEach(v => v.classList.remove("active"));
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));

    // Redirect ke login jika belum login
    if (viewId === "admin-dashboard" && !currentUser) {
        viewId = "admin-login";
    }

    // Tampilkan view target
    const target = document.getElementById(viewId);
    if (target) target.classList.add("active");

    // Aktifkan nav link yang sesuai
    if (viewId === "public-home") {
        const lnk = document.getElementById("link-home");
        if (lnk) lnk.classList.add("active");
        calculateStatistics();
        renderPublicBlogs();
    } else if (viewId === "umkm-directory") {
        const lnk = document.getElementById("link-umkm");
        if (lnk) lnk.classList.add("active");
        renderPublicUmkms();
    } else if (viewId === "admin-login" || viewId === "admin-dashboard") {
        const lnk = document.getElementById("link-admin");
        if (lnk) lnk.classList.add("active");
    }

    if (viewId === "admin-dashboard") {
        updateAdminOverview();
        renderCitizenTable();
        renderAdminUmkmTable();
    }

    window.scrollTo(0, 0);
}

window.switchView = switchView;

// ==================== DATABASE (SUPABASE) ====================
async function initDatabase() {
    // Tampilkan loading state
    const stats = ['stat-total-pop','stat-total-male','stat-total-female','stat-total-umkm'];
    stats.forEach(id => { const el = document.getElementById(id); if(el) el.textContent = '...'; });

    if (!supabase) {
        // Supabase tidak tersedia, gunakan data lokal saja
        citizens = [...defaultCitizens.map((c,i) => ({...c, id: String(i+1)}))];
        umkms = [...defaultUmkms.map((u,i) => ({...u, id: String(i+1)}))];
        calculateStatistics();
        renderPublicBlogs();
        renderPublicUmkms();
        showToast("Mode offline: Supabase tidak terhubung.", "danger");
        return;
    }

    try {
        const { data: dbCitizens } = await supabase.from('citizens').select('*').order('created_at', { ascending: true });
        const { data: dbUmkms } = await supabase.from('umkms').select('*').order('created_at', { ascending: true });

        if ((!dbCitizens || dbCitizens.length === 0) && (!dbUmkms || dbUmkms.length === 0)) {
            showToast("Database kosong. Memasukkan data awal...", "success");
            await seedDatabase();
            const { data: c } = await supabase.from('citizens').select('*').order('created_at', { ascending: true });
            const { data: u } = await supabase.from('umkms').select('*').order('created_at', { ascending: true });
            citizens = c || [];
            umkms = u || [];
        } else {
            citizens = dbCitizens || [];
            umkms = dbUmkms || [];
        }
    } catch (err) {
        console.error("Error koneksi Supabase:", err);
        showToast("Gagal terhubung ke database Supabase.", "danger");
        // Fallback ke data default
        citizens = [...defaultCitizens.map((c,i) => ({...c, id: String(i+1)}))];
        umkms = [...defaultUmkms.map((u,i) => ({...u, id: String(i+1)}))];
    }

    calculateStatistics();
    renderPublicBlogs();
    renderPublicUmkms();
}

async function seedDatabase() {
    if (!supabase) return;
    try {
        await supabase.from('citizens').insert(defaultCitizens);
        await supabase.from('umkms').insert(defaultUmkms);
    } catch(e) {
        console.warn("Seeding gagal (mungkin tabel belum dibuat):", e.message);
    }
}

// ==================== STATISTIK PUBLIK ====================
function calculateStatistics() {
    const total = citizens.length;
    const male = citizens.filter(c => c.gender === "Laki-Laki").length;
    const female = total - male;
    const numUmkm = umkms.length;

    const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    set("stat-total-pop", total);
    set("stat-total-male", male);
    set("stat-total-female", female);
    set("stat-total-umkm", numUmkm);

    const malePct = total > 0 ? Math.round((male / total) * 100) : 0;
    const femalePct = 100 - malePct;

    const barM = document.getElementById("chart-bar-male");
    const barF = document.getElementById("chart-bar-female");
    const lblM = document.getElementById("chart-lbl-male");
    const lblF = document.getElementById("chart-lbl-female");
    if (barM) barM.style.height = malePct + "%";
    if (barF) barF.style.height = femalePct + "%";
    if (lblM) lblM.textContent = malePct + "% (" + male + ")";
    if (lblF) lblF.textContent = femalePct + "% (" + female + ")";

    let child = 0, prod = 0, elder = 0;
    citizens.forEach(c => {
        if (c.age <= 14) child++;
        else if (c.age <= 64) prod++;
        else elder++;
    });

    const pct = n => total > 0 ? Math.round(n/total*100) : 0;
    const setAge = (valId, barId, count) => {
        const p = pct(count);
        const v = document.getElementById(valId); if(v) v.textContent = p+"% ("+count+" jiwa)";
        const b = document.getElementById(barId); if(b) b.style.width = p+"%";
    };
    setAge("age-val-child", "age-bar-child", child);
    setAge("age-val-productive", "age-bar-productive", prod);
    setAge("age-val-elderly", "age-bar-elderly", elder);
}

// ==================== BLOG PUBLIK ====================
function renderPublicBlogs() {
    const grid = document.getElementById("public-blog-grid");
    if (!grid) return;
    grid.innerHTML = "";
    defaultBlogs.forEach(blog => {
        const card = document.createElement("div");
        card.className = "blog-card";
        card.innerHTML = `
            <div class="blog-media">
                <span class="blog-tag">${blog.category}</span>
                <i class="fa-solid fa-newspaper fa-3x" style="opacity: 0.15;"></i>
            </div>
            <div class="blog-body">
                <span class="blog-date"><i class="fa-solid fa-calendar-days"></i> ${blog.date}</span>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-summary">${blog.summary}</p>
            </div>`;
        grid.appendChild(card);
    });
}

// ==================== UMKM PUBLIK ====================
function getCategoryPlaceholder(category) {
    const map = {
        "Kuliner": { icon: "fa-utensils", bg: "linear-gradient(135deg,#f97316,#ea580c)" },
        "Kerajinan": { icon: "fa-palette", bg: "linear-gradient(135deg,#a855f7,#9333ea)" },
        "Pertanian": { icon: "fa-seedling", bg: "linear-gradient(135deg,#10b981,#059669)" },
        "Jasa": { icon: "fa-screwdriver-wrench", bg: "linear-gradient(135deg,#3b82f6,#2563eb)" }
    };
    const c = map[category] || map["Kuliner"];
    return `<div class="umkm-image-fallback" style="background:${c.bg};">
        <span class="umkm-image-fallback-icon"><i class="fa-solid ${c.icon}"></i></span>
        <span class="umkm-image-fallback-text">${category}</span>
    </div>`;
}

function renderPublicUmkms() {
    const grid = document.getElementById("public-umkm-grid");
    if (!grid) return;
    const filtered = umkms.filter(u => {
        const catOk = selectedCategory === "All" || u.category === selectedCategory;
        const kw = searchKeyword.toLowerCase();
        const searchOk = !kw || u.name.toLowerCase().includes(kw) || u.owner.toLowerCase().includes(kw) || u.description.toLowerCase().includes(kw);
        return catOk && searchOk;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-secondary);">
            <i class="fa-solid fa-store-slash fa-3x" style="opacity:0.3;margin-bottom:16px;display:block;"></i>
            <p>Tidak ditemukan UMKM yang sesuai.</p></div>`;
        return;
    }

    grid.innerHTML = "";
    filtered.forEach(u => {
        const card = document.createElement("div");
        card.className = "umkm-card";
        card.innerHTML = `
            <div class="umkm-image">
                ${getCategoryPlaceholder(u.category)}
                <span class="umkm-badge">${u.category}</span>
            </div>
            <div class="umkm-content">
                <h3 class="umkm-title">${u.name}</h3>
                <span class="umkm-owner"><i class="fa-solid fa-user-tie"></i> Pemilik: ${u.owner}</span>
                <p class="umkm-desc">${u.description}</p>
                <a href="https://wa.me/${u.whatsapp}" target="_blank" class="btn-contact">
                    <i class="fa-brands fa-whatsapp"></i> Hubungi WhatsApp
                </a>
            </div>`;
        grid.appendChild(card);
    });
}

// ==================== AUTH ====================
function handleLogin(event) {
    event.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const err  = document.getElementById("login-error-msg");

    if (user === "admin" && pass === "admin123") {
        currentUser = "admin";
        sessionStorage.setItem("desanegentak_auth_token", "logged_in");
        if (err) err.style.display = "none";
        document.getElementById("login-form").reset();
        showToast("Login berhasil! Selamat datang Pak Dukuh.", "success");
        switchView("admin-dashboard");
    } else {
        if (err) err.style.display = "block";
        showToast("Login gagal! Periksa username & password.", "danger");
    }
}

function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem("desanegentak_auth_token");
    showToast("Anda telah keluar dari sesi administrasi.", "success");
    switchView("public-home");
}

// ==================== ADMIN TABS ====================
function switchAdminTab(tabName) {
    document.querySelectorAll(".sidebar-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));
    const btn = document.getElementById("tab-btn-" + tabName);
    const tab = document.getElementById("admin-tab-" + tabName);
    if (btn) btn.classList.add("active");
    if (tab) tab.classList.add("active");
    if (tabName === "overview") updateAdminOverview();
    if (tabName === "citizens") renderCitizenTable();
    if (tabName === "umkm") renderAdminUmkmTable();
}

function updateAdminOverview() {
    const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    const male = citizens.filter(c => c.gender === "Laki-Laki").length;
    set("admin-summary-pop", citizens.length);
    set("admin-summary-male", male);
    set("admin-summary-female", citizens.length - male);
    set("admin-summary-umkm", umkms.length);
}

// ==================== WARGA CRUD ====================
function renderCitizenTable() {
    const tbody = document.getElementById("citizen-table-body");
    if (!tbody) return;
    const rtFilter = document.getElementById("filter-rt-admin");
    const rt = rtFilter ? rtFilter.value : "All";
    const kw = citizenAdminSearch.toLowerCase();

    const filtered = citizens.filter(c => {
        const rtOk = (rt === "All" || c.rt === rt);
        const search = !kw || c.nik.includes(kw) || c.name.toLowerCase().includes(kw) || c.job.toLowerCase().includes(kw);
        return rtOk && search;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-secondary);">
            <i class="fa-solid fa-folder-open fa-2x" style="opacity:0.3;margin-bottom:12px;display:block;"></i>
            <p>Tidak ada data warga terdaftar.</p></td></tr>`;
        return;
    }

    tbody.innerHTML = "";
    filtered.forEach(c => {
        const tr = document.createElement("tr");
        const gBadge = c.gender === "Laki-Laki" ?
            `<span class="tag-badge male">Laki-Laki</span>` :
            `<span class="tag-badge female">Perempuan</span>`;
        const photo = c.house_photo_url ?
            `<td><img src="${c.house_photo_url}" style="width:45px;height:45px;object-fit:cover;border-radius:var(--radius-sm);border:1px solid var(--border-color);cursor:zoom-in;" onclick="viewFullImage('${c.house_photo_url}','${c.name}')" title="Perbesar"></td>` :
            `<td><span style="color:var(--text-muted);font-size:0.75rem;"><i class="fa-solid fa-image-slash"></i> Kosong</span></td>`;
        tr.innerHTML = `
            <td><span class="nik-badge">${c.nik}</span></td>
            <td><strong>${c.name}</strong></td>
            <td>${gBadge}</td>
            <td>${c.age} Tahun</td>
            <td>${c.rt}</td>
            <td>${c.job}</td>
            ${photo}
            <td><div class="actions-cell">
                <button class="btn-icon edit" onclick="openCitizenModal(true,'${c.id}')" title="Edit"><i class="fa-solid fa-pencil"></i></button>
                <button class="btn-icon delete" onclick="deleteCitizen('${c.id}')" title="Hapus"><i class="fa-solid fa-trash"></i></button>
            </div></td>`;
        tbody.appendChild(tr);
    });
}

function viewFullImage(url, title) {
    const w = window.open("","_blank");
    if (!w) return;
    w.document.write(`<html><head><title>Foto - ${title}</title>
    <style>body{margin:0;background:#0b0f19;display:flex;align-items:center;justify-content:center;height:100vh;}
    img{max-width:90%;max-height:90vh;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.8);}</style>
    </head><body><img src="${url}"></body></html>`);
    w.document.close();
}

function openCitizenModal(isEdit, citizenId) {
    const modal = document.getElementById("citizen-modal");
    const form  = document.getElementById("citizen-form");
    const title = document.getElementById("citizen-modal-title");
    const btn   = document.getElementById("citizen-btn-submit");
    if (!modal) return;
    form.reset();
    const photoInput = document.getElementById("citizen-photo");
    if (photoInput) photoInput.value = "";

    if (isEdit && citizenId) {
        title.textContent = "Ubah Biodata Warga";
        btn.textContent = "Simpan Perubahan";
        const c = citizens.find(x => x.id == citizenId);
        if (c) {
            document.getElementById("edit-citizen-id").value = c.id;
            document.getElementById("citizen-nik").value = c.nik;
            document.getElementById("citizen-name").value = c.name;
            document.getElementById("citizen-gender").value = c.gender;
            document.getElementById("citizen-age").value = c.age;
            document.getElementById("citizen-rt").value = c.rt;
            document.getElementById("citizen-job").value = c.job;
        }
    } else {
        title.textContent = "Tambah Data Warga";
        btn.textContent = "Simpan Warga";
        document.getElementById("edit-citizen-id").value = "";
    }
    modal.classList.add("active");
}

function closeCitizenModal() {
    const m = document.getElementById("citizen-modal");
    if (m) m.classList.remove("active");
}

async function uploadHousePhoto(file) {
    if (!file || !supabase) return null;
    const ext  = file.name.split('.').pop();
    const path = Date.now() + "_" + Math.random().toString(36).slice(2) + "." + ext;
    try {
        const { error } = await supabase.storage.from('house-photos').upload(path, file, { cacheControl:'3600', upsert:false });
        if (error) throw error;
        const { data } = supabase.storage.from('house-photos').getPublicUrl(path);
        return data.publicUrl;
    } catch(e) {
        showToast("Upload foto gagal: " + e.message, "danger");
        return null;
    }
}

async function saveCitizen(event) {
    event.preventDefault();
    const btn = document.getElementById("citizen-btn-submit");
    const origText = btn.textContent;
    btn.textContent = "Menyimpan...";
    btn.disabled = true;

    try {
        const id     = document.getElementById("edit-citizen-id").value;
        const nik    = document.getElementById("citizen-nik").value.trim();
        const name   = document.getElementById("citizen-name").value.trim();
        const gender = document.getElementById("citizen-gender").value;
        const age    = parseInt(document.getElementById("citizen-age").value);
        const rt     = document.getElementById("citizen-rt").value;
        const job    = document.getElementById("citizen-job").value.trim();
        const photoInput = document.getElementById("citizen-photo");
        const photoFile  = photoInput && photoInput.files[0];

        if (nik.length !== 16 || !/^\d+$/.test(nik)) {
            showToast("NIK harus 16 digit angka!", "danger");
            return;
        }
        const dupNIK = citizens.find(c => c.nik === nik && c.id != id);
        if (dupNIK) { showToast("NIK sudah terdaftar atas nama " + dupNIK.name + "!", "danger"); return; }

        let photoUrl = null;
        if (photoFile) photoUrl = await uploadHousePhoto(photoFile);

        if (!supabase) {
            // Offline fallback (update local state)
            if (id) {
                const idx = citizens.findIndex(c => c.id == id);
                if (idx > -1) citizens[idx] = { ...citizens[idx], nik, name, gender, age, rt, job, house_photo_url: photoUrl || citizens[idx].house_photo_url };
            } else {
                citizens.push({ id: Date.now().toString(), nik, name, gender, age, rt, job, house_photo_url: photoUrl });
            }
            showToast("Data disimpan (mode offline).", "success");
        } else if (id) {
            const existing = citizens.find(c => c.id == id);
            const finalPhoto = photoUrl || (existing ? existing.house_photo_url : null);
            const { error } = await supabase.from('citizens').update({ nik, name, gender, age, rt, job, house_photo_url: finalPhoto }).eq('id', id);
            if (error) throw error;
            showToast("Data " + name + " berhasil diperbarui.", "success");
            const { data } = await supabase.from('citizens').select('*').order('created_at', { ascending: true });
            citizens = data || [];
        } else {
            const { error } = await supabase.from('citizens').insert([{ nik, name, gender, age, rt, job, house_photo_url: photoUrl }]);
            if (error) throw error;
            showToast("Warga " + name + " berhasil ditambahkan.", "success");
            const { data } = await supabase.from('citizens').select('*').order('created_at', { ascending: true });
            citizens = data || [];
        }

        closeCitizenModal();
        renderCitizenTable();
        calculateStatistics();
        updateAdminOverview();
    } catch(e) {
        console.error(e);
        showToast("Gagal menyimpan: " + e.message, "danger");
    } finally {
        btn.textContent = origText;
        btn.disabled = false;
    }
}

async function deleteCitizen(citizenId) {
    const c = citizens.find(x => x.id == citizenId);
    if (!c) return;
    if (!confirm("Hapus data warga " + c.name + " (NIK: " + c.nik + ")?")) return;
    try {
        if (supabase) {
            const { error } = await supabase.from('citizens').delete().eq('id', citizenId);
            if (error) throw error;
        }
        citizens = citizens.filter(x => x.id != citizenId);
        showToast("Data " + c.name + " telah dihapus.", "success");
        renderCitizenTable();
        calculateStatistics();
        updateAdminOverview();
    } catch(e) {
        showToast("Gagal menghapus: " + e.message, "danger");
    }
}

// ==================== UMKM CRUD ====================
function renderAdminUmkmTable() {
    const tbody = document.getElementById("umkm-table-body");
    if (!tbody) return;
    if (umkms.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-secondary);">
            <i class="fa-solid fa-store-slash fa-2x" style="opacity:0.3;display:block;margin-bottom:12px;"></i>
            <p>Tidak ada UMKM terdaftar.</p></td></tr>`;
        return;
    }
    tbody.innerHTML = "";
    umkms.forEach(u => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${u.name}</strong></td>
            <td>${u.owner}</td>
            <td><span class="tag-badge male" style="background-color:var(--primary-glow);color:var(--primary-light);">${u.category}</span></td>
            <td><a href="https://wa.me/${u.whatsapp}" target="_blank" style="color:#25d366;font-weight:600;text-decoration:none;"><i class="fa-brands fa-whatsapp"></i> +${u.whatsapp}</a></td>
            <td style="max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${u.description}</td>
            <td><div class="actions-cell">
                <button class="btn-icon edit" onclick="openUmkmModal(true,'${u.id}')" title="Edit"><i class="fa-solid fa-pencil"></i></button>
                <button class="btn-icon delete" onclick="deleteUmkm('${u.id}')" title="Hapus"><i class="fa-solid fa-trash"></i></button>
            </div></td>`;
        tbody.appendChild(tr);
    });
}

function openUmkmModal(isEdit, umkmId) {
    const modal = document.getElementById("umkm-modal");
    const form  = document.getElementById("umkm-form");
    const title = document.getElementById("umkm-modal-title");
    const btn   = document.getElementById("umkm-btn-submit");
    if (!modal) return;
    form.reset();

    if (isEdit && umkmId) {
        title.textContent = "Ubah Data UMKM";
        btn.textContent = "Simpan Perubahan";
        const u = umkms.find(x => x.id == umkmId);
        if (u) {
            document.getElementById("edit-umkm-id").value = u.id;
            document.getElementById("umkm-name").value = u.name;
            document.getElementById("umkm-owner").value = u.owner;
            document.getElementById("umkm-category").value = u.category;
            document.getElementById("umkm-whatsapp").value = u.whatsapp;
            document.getElementById("umkm-description").value = u.description;
        }
    } else {
        title.textContent = "Tambah Usaha UMKM Baru";
        btn.textContent = "Simpan Promosi";
        document.getElementById("edit-umkm-id").value = "";
    }
    modal.classList.add("active");
}

function closeUmkmModal() {
    const m = document.getElementById("umkm-modal");
    if (m) m.classList.remove("active");
}

async function saveUmkm(event) {
    event.preventDefault();
    const btn = document.getElementById("umkm-btn-submit");
    const origText = btn.textContent;
    btn.textContent = "Menyimpan...";
    btn.disabled = true;

    try {
        const id          = document.getElementById("edit-umkm-id").value;
        const name        = document.getElementById("umkm-name").value.trim();
        const owner       = document.getElementById("umkm-owner").value.trim();
        const category    = document.getElementById("umkm-category").value;
        const whatsapp    = document.getElementById("umkm-whatsapp").value.replace(/\D/g,'');
        const description = document.getElementById("umkm-description").value.trim();

        if (!whatsapp.startsWith("62")) { showToast("Nomor WA harus diawali 62!", "danger"); return; }

        if (!supabase) {
            if (id) {
                const idx = umkms.findIndex(x => x.id == id);
                if (idx > -1) umkms[idx] = { ...umkms[idx], name, owner, category, whatsapp, description };
            } else {
                umkms.push({ id: Date.now().toString(), name, owner, category, whatsapp, description });
            }
            showToast("UMKM disimpan (mode offline).", "success");
        } else if (id) {
            const { error } = await supabase.from('umkms').update({ name, owner, category, whatsapp, description }).eq('id', id);
            if (error) throw error;
            showToast("UMKM \"" + name + "\" diperbarui.", "success");
            const { data } = await supabase.from('umkms').select('*').order('created_at', { ascending: true });
            umkms = data || [];
        } else {
            const { error } = await supabase.from('umkms').insert([{ name, owner, category, whatsapp, description }]);
            if (error) throw error;
            showToast("UMKM \"" + name + "\" didaftarkan.", "success");
            const { data } = await supabase.from('umkms').select('*').order('created_at', { ascending: true });
            umkms = data || [];
        }

        closeUmkmModal();
        renderAdminUmkmTable();
        renderPublicUmkms();
        calculateStatistics();
        updateAdminOverview();
    } catch(e) {
        showToast("Gagal menyimpan: " + e.message, "danger");
    } finally {
        btn.textContent = origText;
        btn.disabled = false;
    }
}

async function deleteUmkm(umkmId) {
    const u = umkms.find(x => x.id == umkmId);
    if (!u) return;
    if (!confirm("Hapus UMKM: " + u.name + "?")) return;
    try {
        if (supabase) {
            const { error } = await supabase.from('umkms').delete().eq('id', umkmId);
            if (error) throw error;
        }
        umkms = umkms.filter(x => x.id != umkmId);
        showToast("UMKM \"" + u.name + "\" dihapus.", "success");
        renderAdminUmkmTable();
        renderPublicUmkms();
        calculateStatistics();
        updateAdminOverview();
    } catch(e) {
        showToast("Gagal menghapus: " + e.message, "danger");
    }
}

// ==================== EKSPOR ====================
function exportToCSV() {
    if (!citizens.length) { showToast("Database kosong.", "danger"); return; }
    let csv = "ID,NIK,Nama,Jenis Kelamin,Usia,RT,Pekerjaan,Foto Rumah\n";
    citizens.forEach(c => {
        csv += [c.id, "'"+c.nik, '"'+c.name+'"', c.gender, c.age, c.rt, '"'+c.job+'"', c.house_photo_url||""].join(",") + "\n";
    });
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    a.download = "kependudukan_ngentak_" + Date.now() + ".csv";
    a.click();
    showToast("Ekspor CSV berhasil.", "success");
}

function exportToJSON() {
    const a = document.createElement("a");
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(citizens, null, 2));
    a.download = "kependudukan_ngentak_" + Date.now() + ".json";
    a.click();
    showToast("Ekspor JSON berhasil.", "success");
}

// ==================== TOAST ====================
function showToast(message, type) {
    type = type || "success";
    const container = document.getElementById("toast-wrapper");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast " + type;
    const icon = type === "success" ?
        '<i class="fa-solid fa-circle-check" style="color:var(--success);"></i>' :
        '<i class="fa-solid fa-circle-exclamation" style="color:var(--danger);"></i>';
    toast.innerHTML = icon + "<span>" + message + "</span>";
    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => { toast.classList.remove("show"); setTimeout(() => toast.remove(), 300); }, 3500);
}

// ==================== INISIALISASI UTAMA ====================
// Script ini berada di bawah <body>, DOM sudah siap saat dieksekusi.
// Tidak perlu DOMContentLoaded - langsung jalankan via appInit().
function appInit() {

    // 1. Inisialisasi Supabase setelah DOM siap
    try {
        if (window.supabase && window.supabase.createClient) {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log("Supabase berhasil diinisialisasi.");
        } else {
            console.warn("window.supabase tidak tersedia. Mode offline aktif.");
        }
    } catch(e) {
        console.error("Error inisialisasi Supabase:", e);
    }

    // 2. Pasang event listener navigasi
    document.querySelectorAll(".nav-link, .btn-admin").forEach(function(el) {
        el.addEventListener("click", function(e) {
            e.preventDefault();
            switchView(el.getAttribute("data-target"));
        });
    });

    const logo = document.getElementById("nav-logo");
    if (logo) logo.addEventListener("click", function(e) { e.preventDefault(); switchView("public-home"); });

    // 3. Pasang event listener UMKM filter
    document.querySelectorAll("#umkm-filter-group .filter-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
            document.querySelectorAll("#umkm-filter-group .filter-btn").forEach(function(b) { b.classList.remove("active"); });
            btn.classList.add("active");
            selectedCategory = btn.getAttribute("data-category");
            renderPublicUmkms();
        });
    });

    // 4. Pasang event listener pencarian UMKM
    const searchUmkm = document.getElementById("search-umkm");
    if (searchUmkm) searchUmkm.addEventListener("input", function(e) {
        searchKeyword = e.target.value;
        renderPublicUmkms();
    });

    // 5. Pasang event listener pencarian admin warga
    const searchCitizen = document.getElementById("search-citizen-admin");
    if (searchCitizen) searchCitizen.addEventListener("input", function(e) {
        citizenAdminSearch = e.target.value;
        renderCitizenTable();
    });

    // 6. Cek sesi login
    if (sessionStorage.getItem("desanegentak_auth_token") === "logged_in") {
        currentUser = "admin";
    }

    // 7. Muat database dari Supabase (async, tidak menghalangi navigasi)
    initDatabase();

    // 8. Tampilkan halaman awal
    const hash = window.location.hash.substring(1);
    if (hash === "umkm") switchView("umkm-directory");
    else if (hash === "admin") switchView(currentUser ? "admin-dashboard" : "admin-login");
    else switchView("public-home");
}

// Expose main init function so inline navigation can still call it if needed.
window.appInit = appInit;

// Panggil appInit — jika DOM sudah siap jalankan langsung, jika belum pasang listener
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appInit);
} else {
    appInit();
}
