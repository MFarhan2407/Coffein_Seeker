let konsumsiHariIni = [];
let dataUser = [];

const BATAS_KAFEIN = 400;
// Function nya agak acak ga usah bingung

// Mendapatkan jenis kopi yg dipilih oleh user, default nya arabika
function getJenisKopi() {
  const jenisList = document.getElementsByName("jenisKopi");
  for (let jenis of jenisList) {
    if (jenis.checked) return jenis.value;
  }
  return "arabika"; //default nya
}

// Menghitung jumlah kafeinnya
function hitungKafein(jenis, minum) {
  if (jenis === "arabika") return minum * 12; // 12 mg
  if (jenis === "robusta") return minum * 22; // 22 mg
  return 0;
}

function tambahMinuman(nama, jumlahMg) {
  // Data minuman yg diminum hari ini
  // console.log(nama, jumlahMg);

  // Menambahkan data minuman ke konsumsiHariIni
  konsumsiHariIni.push({
    nama: nama,
    kafein: jumlahMg,
    // waktu: new Date()
  });
  // Lalu memanggil update tampilan, untuk memperbarui UI
  updateTampilan();
}
// console.log(tambahMinuman());

function hitungTotal() {
  // Menjumlahkan semua kafein yg sudah dikonsumsi
  let total = 0;
  for (let item of konsumsiHariIni) {
    total += item.kafein;
  }
  return total;
}
// console.log(hitungTotal());

function cekStatus(total) {
  if (total < 300) return "Masih amaaan, ngopi lagi skuuyy";
  if (total <= BATAS_KAFEIN)
    return "Mulai hati-hati yaa sebaiknya ditahan dulu ngopinya ⚠️";
  return "Waduh! kamu udah kelebihan kafein, saatnya berhenti ngopiii 🚫";
}

function handleTambah() {
  const minum = parseInt(document.getElementById("jumlahMinum").value);
  const jenis = getJenisKopi();
  const kafein = hitungKafein(jenis, minum);

  if (isNaN(minum) || minum <= 0) {
    alert("Masukkin jumlahnya dulu doongg");
    return;
  }
  tambahMinuman(jenis.charAt(0).toUpperCase() + jenis.slice(1), kafein);

  document.getElementById("jumlahMinum").value = "";
}

function updateTampilan() {
  // Menampilkan daftar minuman yang sudah ditambahkan, nnti kita combo dgn minuman" lain
  const ul = document.getElementById("riwayatList");
  ul.innerHTML = "";

  let totalSementara = 0;

  for (let item of konsumsiHariIni) {
    totalSementara += item.kafein;

    const status = cekStatus(totalSementara);
    const li = document.createElement("li");

    li.innerHTML = `${item.nama} (${item.kafein} mg)
        <br><small> Status: ${status}</small>`;
    // Untuk membuat list didalam ul
    ul.appendChild(li);
  }
}

//------------------------------------ SCRIPT FORM-PENDAFTARAN ------------------------------------
function register() {
  let username = document.getElementById("username").value; // Mendapatkan input dari html dengan id "username"
  let password = document.getElementById("password").value; // Mendapatkan input dari html dengan id "password"
  let newId = dataUser.length > 0 ? dataUser[dataUser.length - 1].id + 1 : 1; // Generate otomatis id (dari code kak kriss kamis)
  let regex = /^[A-Za-z0-9]+$/; // Validasi password (misal penasaran cari aja "regex js")

  //   Cek regex di password
  if (regex.test(password)) {
    dataUser.push({ id: newId, username: username, password: password });
  } else {
    alert("Password hanya boleh huruf dan angka!");
  }
  console.log(dataUser); //Buat cek datanya masuk engga
}
