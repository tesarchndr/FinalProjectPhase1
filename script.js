//selector
// import swal from './node_modules/sweetalert';
const mainContainer = document.querySelector('.main');
const btnFilter = document.querySelector('.btn-filter');
const checkbox = document.querySelectorAll('input[type=checkbox]');
const inputFilterPrice = document.querySelectorAll('input[type=number]');
const btnPesan = document.getElementsByClassName('btn-order-now');
const btnLihatPesanan = document.getElementById('btn-lihat-pesanan');
const btnClosePesanan = document.querySelector('.close-pesanan');
const overlayPesanan = document.querySelector('.pesanan-overlay');

//*popup

// const btnsOpenModal = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

// const showModal = function () {
//   // alert(this.id);
//   console.log(this.id);
// };

//TODO state object
let daftarPesanan = [];

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const showModal = function () {
  console.log(this.id);

  let tempTerapis = [];

  // let selectedTerapis = listTerapis.filter((terapis) =>
  //   terapis.id.includes(this.id)
  // );

  for (const terapis of listTerapis) {
    if (terapis.id === this.id) {
      tempTerapis.push(terapis);
      break;
    }
  }

  let selectedTerapis = tempTerapis[0];
  console.log(selectedTerapis);

  //render selectedTerapis
  let modalGenderIcon = selectedTerapis === 'Pria' ? '♂' : '♀';
  let modalHTML = `<h1 class="modal-title">Detail Pesanan</h1>
    <img class="modal-image" src="${selectedTerapis.foto}" alt="" />
    <div class="modal-info-terapis">
      <h2 class="modal-nama-terapis">
        <span class="gender-icon">${modalGenderIcon}</span>${selectedTerapis.nama}
      </h2>
      <p class="modal-detail-terapis">⭐️ ${selectedTerapis.rating}</p>
      <p class="modal-detail-terapis">💆🏻 ${selectedTerapis.kategori}</p>
      <p class="modal-detail-terapis">💵 Rp${selectedTerapis.harga}rb/jam</p>
      <p class="modal-detail-terapis">📍 ${selectedTerapis.lokasi}</p>
    </div>
    <div class="modal-input-text">
      <form>
        <input type="text" id="nama" name="nama" placeholder="Nama Kamu" />
      </form>
      <form>
        <input type="text" id="alamat" name="alamat" placeholder="Alamat" />
      </form>
    </div>
    <div class="modal-input-date-time">
      <form class="modal-input-date">
        <select id="tanggal" name="tanggal">
          <option value="11 November">11 November</option>
          <option value="12 November">12 November</option>
          <option value="13 November">13 November</option>
          <option value="14 November">14 November</option>
        </select>
      </form>
      <input
        type="time"
        id="appt"
        name="appt"
        min="09:00"
        max="18:00"
        required
      />
      <form class="modal-duration">
        <select id="durasi" name="durasi">
          <option value="1 Jam">1 Jam</option>
          <option value="2 Jam">2 Jam</option>
          <option value="3 Jam">3 Jam</option>
        </select>
      </form>
    </div>
    <button class="modal-btn-pesan-terapi" id="${selectedTerapis.id}">
      Pesan Terapis Sekarang
    </button>`;

  document.querySelector('.modal-container').innerHTML = '';
  document.querySelector('.modal-container').innerHTML = modalHTML;

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');

  //TODO READ INPUT MODAL

  //local modal selector
  let btnModalPesan = document.querySelector('.modal-btn-pesan-terapi');
  let inputModalNama = document.querySelector("input[name='nama']");
  let inputModalAlamat = document.querySelector("input[name='alamat']");
  // let inputModalTanggal = document.querySelector("input[name='tanggal']");
  // let inputModalTanggal = document.querySelector('#tanggal');
  // let selectedTanggal =
  //   inputModalTanggal.options[inputModalTanggal.selectedIndex].text;

  // let tanggalSelectedIndex = document.getElementById('tanggal').selectedIndex;
  // let tanggalSelected =
  //   document.getElementById('tanggal').options[tanggalSelectedIndex].value;

  let inputModalWaktu = document.querySelector("input[name='appt']");
  let inputModalDurasi = document.querySelector("input[name='durasi']");

  // console.log(btnModalPesan);
  btnModalPesan.addEventListener('click', function () {
    // alert(this.id);
    // alert(`${inputModalWaktu.value} - ${tanggalSelected}`);
    let a = document.getElementById('tanggal');
    let i = a.selectedIndex;
    let tanggal = a.options[i].text;

    let x = document.getElementById('durasi');
    let j = x.selectedIndex;
    let durasi = x.options[j].text;
    // alert(
    //   `${inputModalNama.value} - ${inputModalAlamat.value} - ${inputModalWaktu.value} - ${tanggal} - ${durasi}`
    // );

    // let tempTerapis2 = [];
    // let terapisYangDipesan = tempTerapis2[0];
    let obj = {
      inputUser: {
        namaUser: inputModalNama.value,
        alamat: inputModalAlamat.value,
        waktu: inputModalWaktu.value,
        tanggalPijat: tanggal,
        durasiPijat: durasi,
      },
    };

    //filter obj
    for (const terapis of listTerapis) {
      if (terapis.id === this.id) {
        obj.id = terapis.id;
        obj.nama = terapis.nama;
        obj.gender = terapis.gender;
        obj.kategori = terapis.kategori;
        obj.lokasi = terapis.lokasi;
        obj.rating = terapis.rating;
        obj.harga = terapis.harga;
        obj.foto = terapis.foto;
      }
    }

    // console.log(obj);
    daftarPesanan.push(obj);
    alert(
      `Terima kasih, ${inputModalNama.value} 😊\nPesanan kamu berhasil diterima ✅`
    );

    //push obj ke daftar pesanan
  });
};

//*

const Terapis = function (
  id,
  nama,
  gender,
  kategori,
  lokasi,
  rating,
  harga,
  foto
) {
  this.id = id;
  this.nama = nama;
  this.gender = gender;
  this.kategori = kategori;
  this.lokasi = lokasi;
  this.rating = rating;
  this.harga = harga;
  this.foto = foto;
};

new Terapis('Iir', 'Pria', 'Pijat Olahraga', 'Jakarta Pusat', 4.5, 600, 'foto');

let listTerapis = [
  {
    id: '011',
    nama: 'Bulay',
    gender: 'Pria',
    kategori: 'Aromaterapi',
    lokasi: 'Jakarta Pusat',
    rating: 4.8,
    harga: 550,
    foto: './img/011.jpg',
  },
  {
    id: '012',
    nama: 'Dimas',
    gender: 'Pria',
    kategori: 'Jaringan Dalam',
    lokasi: 'Jakarta Selatan',
    rating: 4.7,
    harga: 600,
    foto: './img/012.jpg',
  },

  {
    id: '013',
    nama: 'Ghozali',
    gender: 'Pria',
    kategori: 'Prenatal',
    lokasi: 'Jakarta Barat',
    rating: 4.6,
    harga: 650,
    foto: './img/013.jpg',
  },

  {
    id: '014',
    nama: 'Downey',
    gender: 'Pria',
    kategori: 'Refleksi',
    lokasi: 'Jakarta Timur',
    rating: 4.5,
    harga: 700,
    foto: './img/014.jpg',
  },

  {
    id: '015',
    nama: 'Fachry',
    gender: 'Pria',
    kategori: 'Olahraga',
    lokasi: 'Jakarta Utara',
    rating: 4.4,
    harga: 750,
    foto: './img/015.jpg',
  },

  {
    id: '016',
    nama: 'Roni',
    gender: 'Pria',
    kategori: 'Olahraga',
    lokasi: 'Jakarta Utara',
    rating: 4.3,
    harga: 725,
    foto: './img/016.jpg',
  },

  {
    id: '017',
    nama: 'Richan',
    gender: 'Pria',
    kategori: 'Refleksi',
    lokasi: 'Jakarta Timur',
    rating: 4.2,
    harga: 675,
    foto: './img/017.jpg',
  },

  {
    id: '018',
    nama: 'Zahra',
    gender: 'Wanita',
    kategori: 'Jaringan Dalam',
    lokasi: 'Jakarta Barat',
    rating: 4.1,
    harga: 625,
    foto: './img/018.jpg',
  },

  {
    id: '019',
    nama: 'Kaira',
    gender: 'Wanita',
    kategori: 'Prenatal',
    lokasi: 'Jakarta Pusat',
    rating: 4.0,
    harga: 575,
    foto: './img/019.jpg',
  },

  {
    id: '020',
    nama: 'Cheri',
    gender: 'Wanita',
    kategori: 'Aromaterapi',
    lokasi: 'Jakarta Selatan',
    rating: 5.0,
    harga: 800,
    foto: './img/020.jpg',
  },

  {
    id: '021',
    nama: 'Vita',
    gender: 'Wanita',
    kategori: 'Olahraga',
    lokasi: 'Jakarta Utara',
    rating: 4.3,
    harga: 525,
    foto: './img/021.jpg',
  },
  {
    id: '022',
    nama: 'Yuga',
    gender: 'Pria',
    kategori: 'Prenatal',
    lokasi: 'Jakarta Selatan',
    rating: 4.9,
    harga: 850,
    foto: './img/22.jpeg',
  },
  {
    id: '023',
    nama: 'Lina',
    gender: 'Wanita',
    kategori: 'Jaringan Dalam',
    lokasi: 'Jakarta Utara',
    rating: 4.9,
    harga: 600,
    foto: './img/23.jpeg',
  },
  {
    id: '024',
    nama: 'Bintang',
    gender: 'Pria',
    kategori: 'Refleksi',
    lokasi: 'Jakarta Barat',
    rating: 4.6,
    harga: 950,
    foto: './img/24.jpeg',
  },
  {
    id: '025',
    nama: 'Sam',
    gender: 'Pria',
    kategori: 'Olahraga',
    lokasi: 'Jakarta Pusat',
    rating: 4.3,
    harga: 300,
    foto: './img/25.jpeg',
  },
  {
    id: '026',
    nama: 'Fahmi',
    gender: 'Pria',
    kategori: 'Jaringan Dalam',
    lokasi: 'Jakarta Selatan',
    rating: 4.5,
    harga: 950,
    foto: './img/26.jpeg',
  },
  {
    id: '027',
    nama: 'Argoy',
    gender: 'Pria',
    kategori: 'Prenatal',
    lokasi: 'Jakarta Timur',
    rating: 4.8,
    harga: 800,
    foto: './img/27.jpeg',
  },
  {
    id: '028',
    nama: 'Duwi',
    gender: 'Wanita',
    kategori: 'Aromaterapi',
    lokasi: 'Jakarta Barat',
    rating: 4.7,
    harga: 300,
    foto: './img/28.jpeg',
  },
  {
    id: '029',
    nama: 'Paja',
    gender: 'Pria',
    kategori: 'Prenatal',
    lokasi: 'Jakarta Selatan',
    rating: 1.0,
    harga: 1,
    foto: './img/29.jpeg',
  },
  {
    id: '030',
    nama: 'Dominique',
    gender: 'Wanita',
    kategori: 'Refleksi',
    lokasi: 'Jakarta Barat',
    rating: 3.5,
    harga: 500,
    foto: './img/30.jpeg',
  },
  {
    id: '031',
    nama: 'Nabil',
    gender: 'Pria',
    kategori: 'Aromaterapi',
    lokasi: 'Jakarta Selatan',
    rating: 4.2,
    harga: 700,
    foto: './img/31.jpeg',
  },
  {
    id: '032',
    nama: 'Yana',
    gender: 'Pria',
    kategori: 'Olahraga',
    lokasi: 'Jakarta Timur',
    rating: 4.0,
    harga: 300,
    foto: './img/32.jpeg',
  },
  {
    id: '001',
    nama: 'Batu',
    gender: 'Pria',
    kategori: 'Prenatal',
    lokasi: 'Jakarta Selatan',
    rating: 4.9,
    harga: 500,
    foto: './img/001.jpg',
  },
  new Terapis(
    '002',
    'Mas Kacang',
    'Pria',
    'Olahraga',
    'Jakarta Pusat',
    4.5,
    600,
    './img/2.webp'
  ),
  new Terapis(
    '003',
    'Kebaya Merah',
    'Wanita',
    'Refleksi',
    'Jakarta Utara',
    4.5,
    400,
    './img/003.jpg'
  ),
  new Terapis(
    '004',
    'Miniwati',
    'Wanita',
    'Jaringan Dalam',
    'Jakarta Timur',
    4.5,
    300,
    './img/004.jpeg'
  ),
  new Terapis(
    '005',
    'Ariel',
    'Wanita',
    'Aromaterapi',
    'Jakarta Timur',
    4.5,
    200,
    './img/005.png'
  ),
  new Terapis(
    '006',
    'Wawan',
    'Pria',
    'Refleksi',
    'Jakarta Barat',
    4.5,
    100,
    './img/3.jpeg'
  ),
  new Terapis(
    '007',
    'Daddy',
    'Pria',
    'Jaringan Dalam',
    'Jakarta Timur',
    4.5,
    800,
    './img/007.jpg'
  ),
  new Terapis(
    '008',
    'Meng',
    'Wanita',
    'Aromaterapi',
    'Jakarta Timur',
    4.5,
    150,
    './img/1.jpg'
  ),
];

console.log(listTerapis);

const renderCard = function (daftarTerapis) {
  for (const terapis of daftarTerapis) {
    let genderIcon = terapis.gender === 'Pria' ? '♂' : '♀';
    let markup = `<div class="cards">
        <img src="${terapis.foto}" alt="" />
        <div class="card-description">
          <p class="card-name" id="card-name">
            <span class="gender-icon">${genderIcon}</span>${terapis.nama}
          </p>
          <p class="card-rating">⭐️ ${terapis.rating}</p>
          <p class="card-category">💆🏻 ${terapis.kategori}</p>
          <p class="card-price">💵 Rp${terapis.harga}rb/jam</p>
          <p class="card-location">📍 ${terapis.lokasi}</p>
          <button class="btn-order-now" id="${terapis.id}">Pesan</button>
        </div>
          </div>`;

    mainContainer.insertAdjacentHTML('afterbegin', markup);

    // for (const btn of btnPesan) {
    //   btn.removeEventListener('click', showModal);
    //   btn.addEventListener('click', showModal);
    // }
  }

  //   console.log(mainContainer);
};

const renderDaftarPesanan = function () {
  document.querySelector('.pesanan-container').innerHTML = '';

  for (const pesanan of daftarPesanan) {
    let strTotal;

    let total = pesanan.harga * Number(pesanan.inputUser.durasiPijat[0]);

    if (total >= 1000) {
      strTotal = String((total / 1000).toFixed(1)) + 'jt';
    } else {
      strTotal = String(total) + 'rb';
    }

    let html = `<div class="pesanan-card">
    <div class="hapus-pesanan" id="${pesanan.id}"><img src="./img/hapus.png" alt="" /></div>
    <div class="pesanan-image-container">
      <img class="pesanan-image" src="${pesanan.foto}" alt="" />
    </div>
    <div class="pesanan-terapis-detail">
      <h3>${pesanan.nama} </h3>
      <p class="pesanan-detail-terapis">
        💆🏻 Pijat ${pesanan.kategori} · Rp${pesanan.harga} rb/jam
      </p>
      <p class="pesanan-detail-terapis">🗓️ ${pesanan.inputUser.tanggalPijat} · ${pesanan.inputUser.waktu} · ${pesanan.inputUser.durasiPijat}</p>
      <p class="pesanan-detail-terapis">📍 ${pesanan.inputUser.alamat}</p>
      <p class="pesanan-detail-terapis" id="total-pesanan">
        💰 Total ${strTotal}
      </p>
    </div>
  </div>`;

    document
      .querySelector('.pesanan-container')
      .insertAdjacentHTML('afterbegin', html);
  }

  if (daftarPesanan.length !== 0) {
    let btnHapus = document.querySelectorAll('.hapus-pesanan');

    for (const btn of btnHapus) {
      btn.addEventListener('click', function () {
        // alert(daftarPesanan.findIndex((pesanan) => pesanan.id === this.id));

        let index = daftarPesanan.findIndex(
          (pesanan) => pesanan.id === this.id
        );

        daftarPesanan.splice(index, 1);

        console.log(index, this.id);
        console.log(daftarPesanan);

        renderDaftarPesanan();
      });
    }
  }
};

renderCard(listTerapis);

const filterCard = function () {
  //*LOCATION---
  //get checked location
  let filterLocation = [];
  let chechkboxLocation = document.querySelectorAll(
    '.location input[type=checkbox]:checked'
  );

  for (let i = 0; i < chechkboxLocation.length; i++) {
    filterLocation.push(chechkboxLocation[i].value);
  }

  //filter array based on checked location
  let filtered1 = [];
  for (const filter of filterLocation) {
    for (const terapis of listTerapis) {
      //   console.log(terapis.lokasi, filter, terapis.lokasi === filter);
      if (terapis.lokasi === filter) {
        if (!filtered1.includes(terapis)) {
          filtered1.push(terapis);
        }
      }
    }
  }

  //if thereis no location filter, copy all the original array
  if (!filterLocation.length) {
    for (const terapis of listTerapis) {
      filtered1.push(terapis);
    }
  }

  //*CATEGORY---
  //get checked category
  let filterCategory = [];
  let checkBoxCategory = document.querySelectorAll(
    '.massage-category input[type=checkbox]:checked'
  );
  for (let i = 0; i < checkBoxCategory.length; i++) {
    filterCategory.push(checkBoxCategory[i].value);
  }

  //filter array based on checked category
  let filtered2 = [];
  for (const filter of filterCategory) {
    for (const terapis of filtered1) {
      if (terapis.kategori === filter) {
        if (!filtered2.includes(terapis)) {
          filtered2.push(terapis);
        }
      }
    }
  }

  //if there's no category filter, copy from the previous filter
  if (!filterCategory.length) {
    for (const terapis of filtered1) {
      filtered2.push(terapis);
    }
  }

  //*GENDER---
  //get checked category
  let filterGender = [];
  let checkboxGender = document.querySelectorAll(
    '.gender input[type=checkbox]:checked'
  );
  for (let i = 0; i < checkboxGender.length; i++) {
    filterGender.push(checkboxGender[i].value);
  }

  //filter array based on checked category
  let filtered3 = [];
  for (const filter of filterGender) {
    for (const terapis of filtered2) {
      //   console.log(terapis.gender, filter, terapis.gender === filter);
      if (terapis.gender === filter) {
        if (!filtered3.includes(terapis)) {
          filtered3.push(terapis);
        }
      }
    }
  }

  //if there's no category filter, copy from the previous filter
  if (!filterGender.length) {
    for (const terapis of filtered2) {
      filtered3.push(terapis);
    }
  }

  //*PRICE -----
  let min = document.querySelector('#price-min').value / 1000;
  let max = document.querySelector('#price-max').value / 1000;

  if (!min) min = -Infinity;
  if (!max) max = Infinity;

  let filtered4 = [];
  for (const terapis of filtered3) {
    // console.log(terapis.gender, filter, terapis.gender === filter);
    if (terapis.harga >= min && terapis.harga <= max) {
      if (!filtered4.includes(terapis)) {
        filtered4.push(terapis);
      }
    }
  }

  //   console.log('1', filtered1);
  //   console.log(`2`, filtered2);
  console.log(3, filtered3);
  console.log(4, filtered4);

  mainContainer.innerHTML = '';
  renderCard(filtered4);
  for (const btn of btnPesan) {
    btn.removeEventListener('click', showModal);
    btn.addEventListener('click', showModal);
  }
  console.log(filtered4);
};

// btnFilter.addEventListener('click', filterCard);

// btnFilter.addEventListener('click', function () {
//   let min = document.querySelector('#price-min').value / 1000;
//   let max = document.querySelector('#price-max').value / 1000;

//   if (!min) min = -Infinity;
//   if (!max) max = Infinity;

//   //   let filterGender = [];
//   //   let checkboxGender = document.querySelectorAll(
//   //     '.gender input[type=checkbox]:checked'
//   //   );
//   //   for (let i = 0; i < checkboxGender.length; i++) {
//   //     filterGender.push(checkboxGender[i].value);
//   //   }

//   //filter array based on checked category
//   let filtered4 = [];

//   for (const terapis of listTerapis) {
//     // console.log(terapis.gender, filter, terapis.gender === filter);
//     if (terapis.harga >= min && terapis.harga <= max) {
//       if (!filtered4.includes(terapis)) {
//         filtered4.push(terapis);
//       }
//     }
//   }

//   //if there's no category filter, copy from the previous filter
//   //   if (!filterGender.length) {
//   //     for (const terapis of filtered2) {
//   //       filtered3.push(terapis);
//   //     }
//   //   }
//   mainContainer.innerHTML = '';
//   renderCard(filtered4);

//   //   alert(`${min} and ${max}`);
// });

//TODO activate later
for (const item of checkbox) {
  item.addEventListener('change', filterCard);
}

// const filterCategory = function () {
//   let filtered1 = [];
//   let filterCategory = [];

//   for (const filter of filterCategory) {
//     for (const terapis of listTerapis) {
//       if (terapis.kategori === item) {
//         if (!filter.includes(item)) {
//           filtered1.push(terapis);
//         }
//       }
//     }
//   }
//   console.log(filtered1);
// };

// console.log(inputFilterPrice);

for (const input of inputFilterPrice) {
  input.addEventListener('change', filterCard);
}

// for (const btn of btnPesan) {
//   btn.addEventListener('click', function () {
//     alert(this.id);
//   });
// }

//*modal popup window

for (const btn of btnPesan) {
  btn.addEventListener('click', showModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//*popup pesanan

const elPesanan = document.querySelector('.pesanan');
const elOverlayPesanan = document.querySelector('.pesanan-overlay');

btnLihatPesanan.addEventListener('click', function () {
  renderDaftarPesanan();

  // if (daftarPesanan.length !== 0) {
  //   let btnHapus = document.querySelectorAll('.hapus-pesanan');

  //   for (const btn of btnHapus) {
  //     btn.addEventListener('click', function () {
  //       // alert(daftarPesanan.findIndex((pesanan) => pesanan.id === this.id));

  //       let index = daftarPesanan.findIndex(
  //         (pesanan) => pesanan.id === this.id
  //       );

  //       daftarPesanan.splice(index, 1);

  //       console.log(index, this.id);
  //       console.log(daftarPesanan);

  //       // renderDaftarPesanan();
  //     });
  //   }
  // }

  elPesanan.classList.remove('hidden');
  elOverlayPesanan.classList.remove('hidden');
});

btnClosePesanan.addEventListener('click', function () {
  elPesanan.classList.add('hidden');
  elOverlayPesanan.classList.add('hidden');
});

overlayPesanan.addEventListener('click', function () {
  elPesanan.classList.add('hidden');
  elOverlayPesanan.classList.add('hidden');
});
