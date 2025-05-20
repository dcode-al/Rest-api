const fs = require('fs');
const path = './percakapan.json';
const EXPIRE_TIME = 10 * 60 * 1000; // 10 menit dalam milidetik

// Fungsi untuk menyimpan id percakapan ke file JSON dengan waktu kedaluwarsa
function simpanPercakapan(userName, chatId) {
    let percakapan = {};

    // Baca file JSON jika ada
    if (fs.existsSync(path)) {
        let data = fs.readFileSync(path);
        percakapan = JSON.parse(data);
    }

    // Simpan id percakapan dengan waktu saat ini
    const timestamp = new Date().getTime();
    percakapan[userName] = { chatId, timestamp };

    // Tulis kembali data ke file JSON
    fs.writeFileSync(path, JSON.stringify(percakapan, null, 2));

    console.log(`Percakapan dengan user ${userName} telah disimpan dengan ID ${chatId}`);
}

// Fungsi untuk mengambil id percakapan dari file JSON dan menghapus jika kedaluwarsa
function ambilPercakapan(userName) {
    if (fs.existsSync(path)) {
        let data = fs.readFileSync(path);
        let percakapan = JSON.parse(data);

        if (percakapan[userName]) {
            const now = new Date().getTime();
            const { chatId, timestamp } = percakapan[userName];

            // Cek apakah data sudah kedaluwarsa (lebih dari 10 menit)
            if (now - timestamp > EXPIRE_TIME) {
                hapusPercakapan(userName); // Hapus percakapan
                return ""
            } else {
                return chatId;
            }
        } else {
            return ""
        }
    } else {
        return ""
    }
}

// Fungsi untuk menghapus id percakapan dari file JSON
function hapusPercakapan(userName) {
    if (fs.existsSync(path)) {
        let data = fs.readFileSync(path);
        let percakapan = JSON.parse(data);

        if (percakapan[userName]) {
            delete percakapan[userName]; // Hapus ID percakapan

            // Tulis kembali data yang sudah dihapus ke file JSON
            fs.writeFileSync(path, JSON.stringify(percakapan, null, 2));

        }
    }
}

module.exports = { simpanPercakapan, ambilPercakapan, hapusPercakapan }