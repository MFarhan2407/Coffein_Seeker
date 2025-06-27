
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
    if (jenis === "arabika") return minum * 12 // 12 mg
    if (jenis === "robusta") return minum * 22 // 22 mg
    return 0
}

function tambahMinuman(nama, jumlahMg) {
    // Data minuman yg diminum hari ini
    // console.log(nama, jumlahMg);

    // Menambahkan data minuman ke konsumsiHariIni
    konsumsiHariIni.push({
        nama: nama,
        kafein: jumlahMg,
        // waktu: new Date()
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
    if (total < 300) return "Masih amaaan, ngopi lagi skuuyy";
    if (total <= BATAS_KAFEIN) return "Mulai hati-hati yaa sebaiknya ditahan dulu ngopinya ⚠️"
    return "Waduh! kamu udah kelebihan kafein, saatnya berhenti ngopiii 🚫"

}


function handleTambah() {
    const minum = parseInt(document.getElementById("jumlahMinum").value);
    const jenis = getJenisKopi()
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

    let totalSementara = 0

    for (let item of konsumsiHariIni) {
        totalSementara += item.kafein

        const status = cekStatus(totalSementara)
        const li = document.createElement("li");
        
        li.innerHTML = `${item.nama} (${item.kafein} mg)
        <br><small> Status: ${status}</small>`;
        // Untuk membuat list didalam ul
        ul.appendChild(li);
    }
}
