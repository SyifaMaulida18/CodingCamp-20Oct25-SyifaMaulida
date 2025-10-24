/* Fungsi ini dipanggil oleh 'onclick' di HTML 
  untuk mengatur section mana yang tampil.
*/
function showSection(id, clickedLink) {
  // 1. Sembunyikan semua section
  const sections = document.querySelectorAll("main section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // 2. Tampilkan section yang ID-nya sesuai
  const activeSection = document.getElementById(id);
  if (activeSection) {
    activeSection.classList.add("active");
  }

  // 3. Hapus class 'active' dari semua link navigasi
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // 4. Tambahkan class 'active' ke link yang baru saja diklik
  if (clickedLink) {
    clickedLink.classList.add("active");
  }
}

// Menjalankan kode setelah semua HTML dimuat
document.addEventListener("DOMContentLoaded", function () {
  
  // --- Validasi Form Kontak ---
  
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