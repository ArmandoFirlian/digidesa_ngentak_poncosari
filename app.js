// DigiDesa Ngentak - Core JavaScript Logic

// ==================== STATE MANAGEMENT & MOCK DATA ====================
let citizens = [];
let umkms = [];
let blogs = [];
let currentUser = null;

// Realistic Seeding Data
const defaultCitizens = [
    { id: "1", nik: "3402142205880001", name: "Suhardi", gender: "Laki-Laki", age: 38, rt: "RT 03", job: "Petani Bawang" },
    { id: "2", nik: "3402146508900003", name: "Suprihati", gender: "Perempuan", age: 36, rt: "RT 01", job: "Pembuat Bakpia" },
    { id: "3", nik: "3402141203650002", name: "Sugeng Riyadi", gender: "Laki-Laki", age: 61, rt: "RT 04", job: "Pengrajin Bambu" },
    { id: "4", nik: "3402144410980001", name: "Rina Astuti", gender: "Perempuan", age: 28, rt: "RT 02", job: "Guru PAUD" },
    { id: "5", nik: "3402140101750004", name: "Joko Susilo", gender: "Laki-Laki", age: 51, rt: "RT 03", job: "Mekanik Motor" },
    { id: "6", nik: "3402145812040002", name: "Anisa Putri", gender: "Perempuan", age: 22, rt: "RT 06", job: "Mahasiswa" },
    { id: "7", nik: "3402141506450001", name: "Kromo Sentono", gender: "Laki-Laki", age: 81, rt: "RT 05", job: "Pensiunan" },
    { id: "8", nik: "3402142907920003", name: "Budi Santoso", gender: "Laki-Laki", age: 34, rt: "RT 02", job: "Nelayan" },
    { id: "9", nik: "3402146111790004", name: "Siti Aminah", gender: "Perempuan", age: 47, rt: "RT 01", job: "Dagang Kelontong" },
    { id: "10", nik: "3402140804010001", name: "Dwi Nugroho", gender: "Laki-Laki", age: 25, rt: "RT 06", job: "Wiraswasta" },
    { id: "11", nik: "3402145209120005", name: "Larasati", gender: "Perempuan", age: 14, rt: "RT 04", job: "Pelajar SMP" },
    { id: "12", nik: "3402141112180003", name: "Muhammad Rizky", gender: "Laki-Laki", age: 8, rt: "RT 03", job: "Pelajar SD" }
];

const defaultUmkms = [
    { 
        id: "1", 
        name: "Bakpia Ayu Ngentak", 
        owner: "Ibu Suprihati", 
        category: "Kuliner", 
        whatsapp: "6287864303875", 
        description: "Bakpia basah tradisional dengan resep warisan keluarga. Tersedia varian rasa Kacang Hijau, Kumbu Hitam, dan Keju. Menerima pesanan hajatan." 
    },
    { 
        id: "2", 
        name: "Kipas Bambu Tradisional Ngentak", 
        owner: "Pak Sugeng Riyadi", 
        category: "Kerajinan", 
        whatsapp: "6281234567890", 
        description: "Kerajinan tangan anyaman bambu premium, kuat dan estetik. Sangat cocok untuk souvenir pernikahan, dekorasi ruangan, maupun pemakaian sehari-hari." 
    },
    { 
        id: "3", 
        name: "Bawang Merah Organik Lestari", 
        owner: "Pak Suhardi", 
        category: "Pertanian", 
        whatsapp: "6282345678901", 
        description: "Menjual bawang merah segar hasil panen langsung dari lahan pasir Dusun Ngentak. Tanpa pestisida kimia berlebih, kualitas super dan tahan lama." 
    },
    { 
        id: "4", 
        name: "Servis Motor Ngentak Jaya", 
        owner: "Mas Joko Susilo", 
        category: "Jasa", 
        whatsapp: "6283456789012", 
        description: "Melayani servis motor berkala, ganti oli, kelistrikan, dan tambal ban untuk segala tipe motor. Pengerjaan cepat, jujur, dan harga bersahabat." 
    }
];

const defaultBlogs = [
    {
        id: "1",
        title: "Gotong Royong Saluran Irigasi Menjelang Musim Tanam",
        category: "Kegiatan",
        date: "20 Juni 2026",
        summary: "Warga Dusun Ngentak RT 03 dan RT 04 melaksanakan kerja bakti pembersihan lumpur dan sampah di sepanjang saluran irigasi utama untuk menjamin kelancaran aliran air ke lahan pertanian bawang merah."
    },
    {
        id: "2",
        title: "Pelatihan Digital Marketing dan Kemasan Kreatif UMKM Dusun",
        category: "Pemberdayaan",
        date: "15 Mei 2026",
        summary: "Untuk mendongkrak penjualan produk desa, mahasiswa KKN bersama kelurahan mengadakan pelatihan desain kemasan serta cara promosi via WhatsApp Business untuk para pelaku UMKM lokal Dusun Ngentak."
    },
    {
        id: "3",
        title: "Rapat Persiapan Agenda Bersih Dusun & Merti Desa Poncosari",
        category: "Pengumuman",
        date: "02 Juni 2026",
        summary: "Bertempat di rumah Bapak Dukuh Ngentak, seluruh pengurus RT dan tokoh masyarakat berkumpul merumuskan rangkaian acara tradisi bersih dusun tahunan agar berlangsung meriah namun tetap khidmat."
    }
];

// Load and initialize database
function initDatabase() {
    const localCitizens = localStorage.getItem("desanegentak_citizens");
    const localUmkms = localStorage.getItem("desanegentak_umkms");
    const localBlogs = localStorage.getItem("desanegentak_blogs");

    if (!localCitizens) {
        localStorage.setItem("desanegentak_citizens", JSON.stringify(defaultCitizens));
        citizens = [...defaultCitizens];
    } else {
        citizens = JSON.parse(localCitizens);
    }

    if (!localUmkms) {
        localStorage.setItem("desanegentak_umkms", JSON.stringify(defaultUmkms));
        umkms = [...defaultUmkms];
    } else {
        umkms = JSON.parse(localUmkms);
    }

    if (!localBlogs) {
        localStorage.setItem("desanegentak_blogs", JSON.stringify(defaultBlogs));
        blogs = [...defaultBlogs];
    } else {
        blogs = JSON.parse(localBlogs);
    }

    // Check session login
    const sessionAuth = sessionStorage.getItem("desanegentak_auth_token");
    if (sessionAuth === "logged_in") {
        currentUser = "admin";
    }
}

function saveDatabase(key) {
    if (key === "citizens") {
        localStorage.setItem("desanegentak_citizens", JSON.stringify(citizens));
        calculateStatistics();
    } else if (key === "umkms") {
        localStorage.setItem("desanegentak_umkms", JSON.stringify(umkms));
        updateUmkmDisplays();
    }
}


// ==================== ROUTING SYSTEM (SPA) ====================
function switchView(viewId) {
    // Hide all views
    const views = document.querySelectorAll(".view-section");
    views.forEach(view => view.classList.remove("active"));

    // Deactivate all nav links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => link.classList.remove("active"));

    // Handle view permission redirect
    if (viewId === "admin-dashboard" && !currentUser) {
        viewId = "admin-login";
    }

    // Show target view
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add("active");
    }

    // Highlight active nav link
    if (viewId === "public-home") {
        document.getElementById("link-home").classList.add("active");
    } else if (viewId === "umkm-directory") {
        document.getElementById("link-umkm").classList.add("active");
    } else if (viewId === "admin-login" || viewId === "admin-dashboard") {
        document.getElementById("link-admin").classList.add("active");
    }

    // Dynamic setups per view loading
    if (viewId === "public-home") {
        calculateStatistics();
        renderPublicBlogs();
    } else if (viewId === "umkm-directory") {
        renderPublicUmkms();
    } else if (viewId === "admin-dashboard") {
        updateAdminOverview();
        renderCitizenTable();
        renderAdminUmkmTable();
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// Nav link click event hooks
document.querySelectorAll(".nav-link, .btn-admin").forEach(element => {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        const target = element.getAttribute("data-target");
        switchView(target);
    });
});

document.getElementById("nav-logo").addEventListener("click", (e) => {
    e.preventDefault();
    switchView("public-home");
});


// ==================== PUBLIC PAGE: STATISTICS & GRAPHS ====================
function calculateStatistics() {
    const totalPop = citizens.length;
    const maleCount = citizens.filter(c => c.gender === "Laki-Laki").length;
    const femaleCount = citizens.filter(c => c.gender === "Perempuan").length;
    const activeUmkms = umkms.length;

    // Update main text displays
    document.getElementById("stat-total-pop").textContent = totalPop;
    document.getElementById("stat-total-male").textContent = maleCount;
    document.getElementById("stat-total-female").textContent = femaleCount;
    document.getElementById("stat-total-umkm").textContent = activeUmkms;

    // Calculate percentage ratios
    const malePct = totalPop > 0 ? Math.round((maleCount / totalPop) * 100) : 0;
    const femalePct = totalPop > 0 ? Math.round((femaleCount / totalPop) * 100) : 0;

    // Update gender bar heights & text labels
    const barMale = document.getElementById("chart-bar-male");
    const barFemale = document.getElementById("chart-bar-female");
    if (barMale && barFemale) {
        barMale.style.height = `${malePct}%`;
        barFemale.style.height = `${femalePct}%`;
        document.getElementById("chart-lbl-male").textContent = `${malePct}% (${maleCount})`;
        document.getElementById("chart-lbl-female").textContent = `${femalePct}% (${femaleCount})`;
    }

    // Age distribution calculations
    // Anak: 0-14, Produktif: 15-64, Lansia: 65+
    let childCount = 0;
    let prodCount = 0;
    let elderCount = 0;

    citizens.forEach(c => {
        if (c.age <= 14) childCount++;
        else if (c.age <= 64) prodCount++;
        else elderCount++;
    });

    const childPct = totalPop > 0 ? Math.round((childCount / totalPop) * 100) : 0;
    const prodPct = totalPop > 0 ? Math.round((prodCount / totalPop) * 100) : 0;
    const elderPct = totalPop > 0 ? Math.round((elderCount / totalPop) * 100) : 0;

    // Update age visualizers
    document.getElementById("age-val-child").textContent = `${childPct}% (${childCount} jiwa)`;
    document.getElementById("age-bar-child").style.width = `${childPct}%`;

    document.getElementById("age-val-productive").textContent = `${prodPct}% (${prodCount} jiwa)`;
    document.getElementById("age-bar-productive").style.width = `${prodPct}%`;

    document.getElementById("age-val-elderly").textContent = `${elderPct}% (${elderCount} jiwa)`;
    document.getElementById("age-bar-elderly").style.width = `${elderPct}%`;
}


// ==================== PUBLIC PAGE: BLOGS & NEWS ====================
function renderPublicBlogs() {
    const grid = document.getElementById("public-blog-grid");
    if (!grid) return;

    grid.innerHTML = "";
    blogs.forEach(blog => {
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
            </div>
        `;
        grid.appendChild(card);
    });
}


// ==================== PUBLIC PAGE: UMKM KATAOLOG ====================
let selectedCategory = "All";
let searchKeyword = "";

// Generate category fallback images dynamically using SVG styling
function getCategoryPlaceholder(category, name) {
    let iconClass = "fa-utensils";
    let gradient = "linear-gradient(135deg, #f97316, #ea580c)"; // Orange Kuliner
    
    if (category === "Kerajinan") {
        iconClass = "fa-palette";
        gradient = "linear-gradient(135deg, #a855f7, #9333ea)"; // Purple
    } else if (category === "Pertanian") {
        iconClass = "fa-seedling";
        gradient = "linear-gradient(135deg, #10b981, #059669)"; // Green
    } else if (category === "Jasa") {
        iconClass = "fa-screwdriver-wrench";
        gradient = "linear-gradient(135deg, #3b82f6, #2563eb)"; // Blue
    }

    return `
        <div class="umkm-image-fallback" style="background: ${gradient};">
            <span class="umkm-image-fallback-icon"><i class="fa-solid ${iconClass}"></i></span>
            <span class="umkm-image-fallback-text">${category}</span>
        </div>
    `;
}

function renderPublicUmkms() {
    const grid = document.getElementById("public-umkm-grid");
    if (!grid) return;

    grid.innerHTML = "";
    
    // Filter & Search criteria combined
    const filteredUmkms = umkms.filter(u => {
        const matchesCategory = (selectedCategory === "All" || u.category === selectedCategory);
        const matchesSearch = u.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                              u.owner.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                              u.description.toLowerCase().includes(searchKeyword.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredUmkms.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-secondary);">
                <i class="fa-solid fa-store-slash fa-3x" style="margin-bottom: 16px; opacity: 0.3;"></i>
                <p>Tidak ditemukan UMKM yang sesuai dengan pencarian.</p>
            </div>
        `;
        return;
    }

    filteredUmkms.forEach(u => {
        const card = document.createElement("div");
        card.className = "umkm-card";
        
        card.innerHTML = `
            <div class="umkm-image">
                ${getCategoryPlaceholder(u.category, u.name)}
                <span class="umkm-badge">${u.category}</span>
            </div>
            <div class="umkm-content">
                <h3 class="umkm-title">${u.name}</h3>
                <span class="umkm-owner"><i class="fa-solid fa-user-tie"></i> Pemilik: ${u.owner}</span>
                <p class="umkm-desc">${u.description}</p>
                <a href="https://wa.me/${u.whatsapp}" target="_blank" class="btn-contact">
                    <i class="fa-brands fa-whatsapp"></i> Hubungi WhatsApp
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// UMKM Category Buttons hook
document.querySelectorAll("#umkm-filter-group .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#umkm-filter-group .filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedCategory = btn.getAttribute("data-category");
        renderPublicUmkms();
    });
});

// UMKM Live Search hook
document.getElementById("search-umkm").addEventListener("input", (e) => {
    searchKeyword = e.target.value;
    renderPublicUmkms();
});

function updateUmkmDisplays() {
    renderPublicUmkms();
    calculateStatistics();
}


// ==================== AUTHENTICATION CONTROLLER ====================
function handleLogin(event) {
    event.preventDefault();
    const userField = document.getElementById("username").value;
    const passField = document.getElementById("password").value;
    const errorBox = document.getElementById("login-error-msg");

    // Static Credentials validation for demo
    if (userField === "admin" && passField === "admin123") {
        currentUser = "admin";
        sessionStorage.setItem("desanegentak_auth_token", "logged_in");
        errorBox.style.display = "none";
        
        // Reset form
        document.getElementById("login-form").reset();
        
        showToast("Login berhasil! Selamat datang Pak Dukuh.", "success");
        switchView("admin-dashboard");
    } else {
        errorBox.style.display = "block";
        showToast("Login gagal! Periksa username & password.", "danger");
    }
}

function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem("desanegentak_auth_token");
    showToast("Anda telah keluar dari sesi administrasi.", "success");
    switchView("public-home");
}


// ==================== ADMIN TAB CONTROL ====================
function switchAdminTab(tabName) {
    // Buttons
    document.querySelectorAll(".sidebar-btn").forEach(btn => btn.classList.remove("active"));
    
    // Tab Contents
    document.querySelectorAll(".admin-tab-content").forEach(content => content.classList.remove("active"));
    
    if (tabName === "overview") {
        document.getElementById("tab-btn-overview").classList.add("active");
        document.getElementById("admin-tab-overview").classList.add("active");
        updateAdminOverview();
    } else if (tabName === "citizens") {
        document.getElementById("tab-btn-citizens").classList.add("active");
        document.getElementById("admin-tab-citizens").classList.add("active");
        renderCitizenTable();
    } else if (tabName === "umkm") {
        document.getElementById("tab-btn-umkm").classList.add("active");
        document.getElementById("admin-tab-umkm").classList.add("active");
        renderAdminUmkmTable();
    }
}

function updateAdminOverview() {
    const totalPop = citizens.length;
    const maleCount = citizens.filter(c => c.gender === "Laki-Laki").length;
    const femaleCount = citizens.filter(c => c.gender === "Perempuan").length;
    const activeUmkms = umkms.length;

    document.getElementById("admin-summary-pop").textContent = totalPop;
    document.getElementById("admin-summary-male").textContent = maleCount;
    document.getElementById("admin-summary-female").textContent = femaleCount;
    document.getElementById("admin-summary-umkm").textContent = activeUmkms;
}


// ==================== ADMIN: CITIZENS CRUD OPERATIONS ====================
let citizenAdminSearch = "";

function renderCitizenTable() {
    const tbody = document.getElementById("citizen-table-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    
    const rtFilter = document.getElementById("filter-rt-admin").value;

    const filtered = citizens.filter(c => {
        const matchesRT = (rtFilter === "All" || c.rt === rtFilter);
        const matchesSearch = c.nik.includes(citizenAdminSearch) ||
                              c.name.toLowerCase().includes(citizenAdminSearch.toLowerCase()) ||
                              c.job.toLowerCase().includes(citizenAdminSearch.toLowerCase());
        return matchesRT && matchesSearch;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fa-solid fa-folder-open fa-2x" style="margin-bottom: 12px; opacity: 0.3;"></i>
                    <p>Tidak ada data warga terdaftar.</p>
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach(c => {
        const tr = document.createElement("tr");
        const genderBadge = c.gender === "Laki-Laki" ? 
            `<span class="tag-badge male">Laki-Laki</span>` : 
            `<span class="tag-badge female">Perempuan</span>`;

        tr.innerHTML = `
            <td><span class="nik-badge">${c.nik}</span></td>
            <td><strong>${c.name}</strong></td>
            <td>${genderBadge}</td>
            <td>${c.age} Tahun</td>
            <td>${c.rt}</td>
            <td>${c.job}</td>
            <td>
                <div class="actions-cell">
                    <button class="btn-icon edit" onclick="openCitizenModal(true, '${c.id}')" title="Edit Biodata"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn-icon delete" onclick="deleteCitizen('${c.id}')" title="Hapus Warga"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Hook search citizen in admin
document.getElementById("search-citizen-admin").addEventListener("input", (e) => {
    citizenAdminSearch = e.target.value;
    renderCitizenTable();
});

// Modal Actions
function openCitizenModal(isEdit = false, citizenId = "") {
    const modal = document.getElementById("citizen-modal");
    const form = document.getElementById("citizen-form");
    const title = document.getElementById("citizen-modal-title");
    const submitBtn = document.getElementById("citizen-btn-submit");

    form.reset();
    
    if (isEdit) {
        title.textContent = "Ubah Biodata Warga";
        submitBtn.textContent = "Simpan Perubahan";
        
        // Find citizen record
        const citizen = citizens.find(c => c.id === citizenId);
        if (citizen) {
            document.getElementById("edit-citizen-id").value = citizen.id;
            document.getElementById("citizen-nik").value = citizen.nik;
            document.getElementById("citizen-name").value = citizen.name;
            document.getElementById("citizen-gender").value = citizen.gender;
            document.getElementById("citizen-age").value = citizen.age;
            document.getElementById("citizen-rt").value = citizen.rt;
            document.getElementById("citizen-job").value = citizen.job;
        }
    } else {
        title.textContent = "Tambah Data Warga";
        submitBtn.textContent = "Simpan Warga";
        document.getElementById("edit-citizen-id").value = "";
    }

    modal.classList.add("active");
}

function closeCitizenModal() {
    document.getElementById("citizen-modal").classList.remove("active");
}

function saveCitizen(event) {
    event.preventDefault();
    
    const id = document.getElementById("edit-citizen-id").value;
    const nik = document.getElementById("citizen-nik").value;
    const name = document.getElementById("citizen-name").value;
    const gender = document.getElementById("citizen-gender").value;
    const age = parseInt(document.getElementById("citizen-age").value);
    const rt = document.getElementById("citizen-rt").value;
    const job = document.getElementById("citizen-job").value;

    // Validate NIK constraints
    if (nik.length !== 16 || !/^\d+$/.test(nik)) {
        showToast("Format NIK harus berupa 16 digit angka saja!", "danger");
        return;
    }

    // Verify NIK uniqueness (prevent duplicates except when editing own)
    const existingNIK = citizens.find(c => c.nik === nik && c.id !== id);
    if (existingNIK) {
        showToast(`NIK ${nik} sudah terdaftar atas nama ${existingNIK.name}!`, "danger");
        return;
    }

    if (id) {
        // Edit flow
        const idx = citizens.findIndex(c => c.id === id);
        if (idx !== -1) {
            citizens[idx] = { id, nik, name, gender, age, rt, job };
            showToast(`Data ${name} berhasil diperbarui.`, "success");
        }
    } else {
        // Add flow
        const newId = Date.now().toString();
        citizens.push({ id: newId, nik, name, gender, age, rt, job });
        showToast(`Warga baru ${name} berhasil ditambahkan.`, "success");
    }

    saveDatabase("citizens");
    closeCitizenModal();
    renderCitizenTable();
    updateAdminOverview();
}

function deleteCitizen(citizenId) {
    const citizen = citizens.find(c => c.id === citizenId);
    if (!citizen) return;

    if (confirm(`Apakah Anda yakin ingin menghapus data warga: ${citizen.name} (NIK: ${citizen.nik})?`)) {
        citizens = citizens.filter(c => c.id !== citizenId);
        saveDatabase("citizens");
        showToast(`Data warga ${citizen.name} telah dihapus.`, "success");
        renderCitizenTable();
        updateAdminOverview();
    }
}


// ==================== ADMIN: UMKM CRUD OPERATIONS ====================
function renderAdminUmkmTable() {
    const tbody = document.getElementById("umkm-table-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (umkms.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fa-solid fa-store-slash fa-2x" style="margin-bottom: 12px; opacity: 0.3;"></i>
                    <p>Tidak ada UMKM terdaftar.</p>
                </td>
            </tr>
        `;
        return;
    }

    umkms.forEach(u => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><strong>${u.name}</strong></td>
            <td>${u.owner}</td>
            <td><span class="tag-badge male" style="background-color: var(--primary-glow); color: var(--primary-light);">${u.category}</span></td>
            <td><a href="https://wa.me/${u.whatsapp}" target="_blank" style="color: #25d366; text-decoration:none; font-weight:600;"><i class="fa-brands fa-whatsapp"></i> +${u.whatsapp}</a></td>
            <td style="max-width: 240px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${u.description}</td>
            <td>
                <div class="actions-cell">
                    <button class="btn-icon edit" onclick="openUmkmModal(true, '${u.id}')" title="Edit Profil Usaha"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn-icon delete" onclick="deleteUmkm('${u.id}')" title="Hapus UMKM"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openUmkmModal(isEdit = false, umkmId = "") {
    const modal = document.getElementById("umkm-modal");
    const form = document.getElementById("umkm-form");
    const title = document.getElementById("umkm-modal-title");
    const submitBtn = document.getElementById("umkm-btn-submit");

    form.reset();

    if (isEdit) {
        title.textContent = "Ubah Data UMKM";
        submitBtn.textContent = "Simpan Perubahan";
        
        const u = umkms.find(item => item.id === umkmId);
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
        submitBtn.textContent = "Simpan Promosi";
        document.getElementById("edit-umkm-id").value = "";
    }

    modal.classList.add("active");
}

function closeUmkmModal() {
    document.getElementById("umkm-modal").classList.remove("active");
}

function saveUmkm(event) {
    event.preventDefault();
    
    const id = document.getElementById("edit-umkm-id").value;
    const name = document.getElementById("umkm-name").value;
    const owner = document.getElementById("umkm-owner").value;
    const category = document.getElementById("umkm-category").value;
    let whatsapp = document.getElementById("umkm-whatsapp").value.replace(/\D/g, ''); // Numbers only
    const description = document.getElementById("umkm-description").value;

    // Validation
    if (!whatsapp.startsWith("62")) {
        showToast("Nomor WhatsApp harus diawali kode negara 62!", "danger");
        return;
    }

    if (id) {
        const idx = umkms.findIndex(item => item.id === id);
        if (idx !== -1) {
            umkms[idx] = { id, name, owner, category, whatsapp, description };
            showToast(`UMKM "${name}" berhasil diubah.`, "success");
        }
    } else {
        const newId = Date.now().toString();
        umkms.push({ id: newId, name, owner, category, whatsapp, description });
        showToast(`UMKM "${name}" berhasil didaftarkan.`, "success");
    }

    saveDatabase("umkms");
    closeUmkmModal();
    renderAdminUmkmTable();
    updateAdminOverview();
}

function deleteUmkm(umkmId) {
    const u = umkms.find(item => item.id === umkmId);
    if (!u) return;

    if (confirm(`Apakah Anda yakin ingin menghapus promosi UMKM: ${u.name}?`)) {
        umkms = umkms.filter(item => item.id !== umkmId);
        saveDatabase("umkms");
        showToast(`Promosi UMKM "${u.name}" telah dihapus.`, "success");
        renderAdminUmkmTable();
        updateAdminOverview();
    }
}


// ==================== EXPORT DATA (CSV & JSON) ====================
function exportToCSV() {
    if (citizens.length === 0) {
        showToast("Database kosong, tidak ada data untuk diekspor.", "danger");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,NIK,Nama,Jenis Kelamin,Usia,Wilayah RT,Pekerjaan Utama\n";

    citizens.forEach(c => {
        // Enclose values in quotes to handle potential commas in names/jobs
        const row = [
            c.id,
            `'${c.nik}'`, // Add quote to prevent Excel auto-exponential notation truncation
            `"${c.name}"`,
            c.gender,
            c.age,
            c.rt,
            `"${c.job}"`
        ].join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `database_kependudukan_ngentak_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Database kependudukan sukses diekspor ke CSV.", "success");
}

function exportToJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(citizens, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `database_kependudukan_ngentak_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Database kependudukan sukses diekspor ke JSON.", "success");
}


// ==================== TOAST MESSAGES ====================
function showToast(message, type = "success") {
    const container = document.getElementById("toast-wrapper");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    const icon = type === "success" ? 
        '<i class="fa-solid fa-circle-check" style="color: var(--success);"></i>' : 
        '<i class="fa-solid fa-circle-exclamation" style="color: var(--danger);"></i>';

    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;

    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add("show"), 10);

    // Fade out and remove
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}


// ==================== INITIALIZATION ON LOAD ====================
window.addEventListener("DOMContentLoaded", () => {
    initDatabase();
    
    // Hook URL hashes for custom SPA refresh actions
    const currentHash = window.location.hash.substring(1);
    if (currentHash === "umkm") {
        switchView("umkm-directory");
    } else if (currentHash === "admin") {
        if (currentUser) {
            switchView("admin-dashboard");
        } else {
            switchView("admin-login");
        }
    } else {
        switchView("public-home");
    }
});
