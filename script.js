
let konsumsiHariIni = []

const BATAS_KAFEIN = 400;
// Function nya agak acak ga usah bingung

// Mendapatkan jenis kopi yg dipilih oleh user, default nya arabika
function getJenisKopi() {
    const jenisList = document.getElementsByName("jenisKopi");
    for (let jenis of jenisList) {
        if (jenis.checked) return jenis.value
    }
    return "arabika" //default nya
}

// Menghitung jumlah kafeinnya
function hitungKafein(jenis, minum) {
    if (jenis === "arabika") return minum * 12
    if (jenis === "robusta") return minum * 22
    return 0
}

function tambahMinuman(nama, jumlahMg) {
    // Data minuman yg diminum hari ini
    // console.log(nama, jumlahMg);

    // Menambahkan data minuman ke konsumsiHariIni
    konsumsiHariIni.push({
        nama: nama,
        kafein: jumlahMg,
        waktu: new Date()

    })
    // Lalu memanggil update tampilan, untuk memperbarui UI
    updateTampilan()
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
    if (total < 300) return "Aman";
    if (total <= 400) return "Waspada! ⚠️"
    return "Bahaya! 🚫"

}


function handleTambah() {
    const minum = parseInt(document.getElementById("jumlahMinum").value);
    const jenis = getJenisKopi()
    const kafein = hitungKafein(jenis, minum);
    // Memanggil fungsi" yg lain agar ketika button "tambah" di klik hasilnya berubah

    if (isNaN(minum) || minum <= 0) {
        alert("Masukkan jumlah minum kopi yang valid");
        return;
    }
    tambahMinuman(jenis.charAt(0).toUpperCase() + jenis.slice(1), kafein);

    document.getElementById("jumlahMinum").value = "";
    document.getElementById("hasilKafein").innerText = "Total Kafein: 0 mg";
    document.getElementById("statusCaffeine").innerText = `Total: ${hitungTotal()} mg | Status : ${cekStatus(hitungTotal())}`;
}

function updateTampilan() {
    const total = hitungTotal();
    const status = cekStatus(total);

    // Memperbarui total konsumsi dan status
    document.getElementById("statusCaffeine").innerText = `Total: ${total} mg | Status: ${status}`;

    // Menampilkan daftar minuman yang sudah ditambahkan, nnti kita combo dgn minuman" lain
    const ul = document.getElementById("riwayatList");
    ul.innerHTML = "";
    for (let item of konsumsiHariIni) {
        const li = document.createElement("li");
        li.textContent = `${item.nama} (${item.kafein} mg)`;
        ul.appendChild(li);
    }
}

// Ini optional, bisa kita hapus agar user tidak langsung tau berapa kafein ditubuh dia hari ini
function updatePreviewKafein() {
    const minum = parseInt(document.getElementById("jumlahMinum").value) || 0;
    const jenis = getJenisKopi();
    const kafein = hitungKafein(jenis, minum);
    const status = cekStatus(hitungTotal() + kafein);

    document.getElementById("hasilKafein").innerText = `Total Kafein: ${kafein} mg`;
    // // Menampilkan prediksi statusnya, bisa kita hapus aja
    document.getElementById("statusCaffeine").innerText = `Jika ditambahkan: ${hitungTotal() + kafein} mg | Status: ${status}`

}

// Event otomatis ketika input bertambah / berubah
document.getElementById("jumlahMinum").addEventListener("input", updatePreviewKafein);
const jenisRadios = document.getElementsByName("jenisKopi");
for (let  radio of jenisRadios) {
    radio.addEventListener("change", updatePreviewKafein);
}