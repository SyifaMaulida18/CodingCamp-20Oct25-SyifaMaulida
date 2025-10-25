// Menjalankan kode setelah semua HTML dimuat
document.addEventListener("DOMContentLoaded", function () {
  
  // --- FITUR BARU: POIN 4 (Welcome Speech) ---
  function showWelcomeMessage() {
    // 1. Tampilkan box untuk menanyakan nama
    const userName = prompt("Halo! Siapa nama Anda?");
    
    // 2. Cari elemen <h2> yang kita buat di HTML
    const welcomeElement = document.getElementById("welcome-message");

    // 3. Cek apakah pengguna mengisi nama
    if (userName) {
      // Jika diisi, tampilkan sapaan
      welcomeElement.textContent = `Hi, ${userName}! Welcome to TechSolution ID.`;
    } else {
      // Jika tidak diisi (klik cancel atau OK tapi kosong), tampilkan sapaan default
      welcomeElement.textContent = `Welcome to TechSolution ID!`;
    }
  }

  // Panggil fungsinya saat halaman dimuat
  showWelcomeMessage(); 
  // --- FITUR 1: Smooth Scroll saat Navigasi di-klik ---
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // 1. Mencegah link anchor melompat
      e.preventDefault();

      // 2. Ambil ID dari href (misal: "#about")
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      // 3. Scroll ke section tersebut
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // --- FITUR 2: Update Link Navigasi 'active' saat di-scroll ---
  const sections = document.querySelectorAll("main section");
  
  // Opsi: 40% bagian section harus terlihat untuk dianggap 'active'
  const options = {
    threshold: 0.4 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 1. Ambil ID section yang sedang terlihat
        const id = entry.target.getAttribute("id");
        
        // 2. Hapus 'active' dari SEMUA link
        navLinks.forEach(link => {
          link.classList.remove("active");
        });

        // 3. Tambahkan 'active' ke link yang sesuai
        const activeLink = document.querySelector(`nav a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, options);

  // 4. Amati semua section
  sections.forEach(section => {
    observer.observe(section);
  });

  
  // --- Validasi Form Kontak ---
  // (Kode validasi form kamu di sini TIDAK BERUBAH)
  
  const contactForm = document.getElementById("contact-form");

  // Pastikan form-nya ada sebelum menambahkan event listener
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      // Mencegah halaman reload saat tombol 'Kirim' diklik
      e.preventDefault();

      // Ambil nilai dari setiap input
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validasi 1: Cek apakah ada yang kosong
      if (name === "" || email === "" || phone === "" || message === "") {
        alert("Semua kolom (Nama, Email, Telepon, Pesan) wajib diisi!");
        return; // Hentikan fungsi
      }

      // Validasi 2: Cek email sederhana
      if (!email.includes("@") || !email.includes(".")) {
        alert("Format email tidak valid! Harus mengandung '@' dan '.'");
        return;
      }

      // Validasi 3: Cek nomor telepon (harus angka dan minimal 10 digit)
      if (isNaN(phone) || phone.length < 10) {
        alert("Nomor telepon tidak valid! Harus berupa angka (minimal 10 digit).");
        return;
      }

      // Jika semua validasi lolos
      alert(`Terima kasih, ${name}! Pesan kamu telah terkirim 💌`);
      
      // Kosongkan form setelah berhasil
      contactForm.reset();
    });
  }
});
