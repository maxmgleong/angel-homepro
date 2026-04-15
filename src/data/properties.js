// Initial properties data for Rumah Sewa Malaysia
export const INITIAL_PROPERTIES = [
  {
    id: 1,
    name: 'Rumah Sewa Melati',
    location: 'Kuala Lumpur',
    image: 'https://placehold.co/800x500/4A9B8C/ffffff?text=Kamar+1+Melati',
    description: ' Bilik lengkap dengan katil, almari, meja. Shared bathroom dengan bilik sebelah. WiFi percuma.',
    rooms: [
      { id: 101, name: 'Kamar 1A', price: 350, status: 'kosong', beds: [{ id: 1, name: 'Katil 1', occupied: false }], description: 'Kamar luas dengan window' },
      { id: 102, name: 'Kamar 1B', price: 380, status: 'kosong', beds: [{ id: 2, name: 'Katil 2', occupied: true }], description: 'Kamar dengan AC' },
      { id: 103, name: 'Kamar 1C', price: 350, status: 'ditempah', beds: [{ id: 3, name: 'Katil 3', occupied: false }], description: 'Kamar standard' }
    ]
  },
  {
    id: 2,
    name: 'Apartmen Seri',
    location: 'Petaling Jaya',
    image: 'https://placehold.co/800x500/2ECC71/ffffff?text=Kamar+2+Seri',
    description: 'Shared house dengan bilik tidur dan bilik air. Lokasi strategik near LRT.',
    rooms: [
      { id: 201, name: 'Kamar 2A', price: 420, status: 'kosong', beds: [{ id: 4, name: 'Katil 4', occupied: false }], description: 'Kamar dengan balcony' },
      { id: 202, name: 'Kamar 2B', price: 450, status: 'kosong', beds: [{ id: 5, name: 'Katil 5', occupied: false }], description: 'Kamar besar dengan wardrobe' }
    ]
  },
  {
    id: 3,
    name: 'Kondominium Emas',
    location: 'Shah Alam',
    image: 'https://placehold.co/800x500/9B59B6/ffffff?text=Kamar+3+Emas',
    description: 'Condo dengan security 24 jam. Shared pool dan gym. Bilik fully furnished.',
    rooms: [
      { id: 301, name: 'Kamar 3A', price: 550, status: 'kosong', beds: [{ id: 6, name: 'Katil 6', occupied: false }], description: 'Master room dengan attached bath' },
      { id: 302, name: 'Kamar 3B', price: 480, status: 'ditempah', beds: [{ id: 7, name: 'Katil 7', occupied: false }], description: 'Medium room' },
      { id: 303, name: 'Kamar 3C', price: 420, status: 'kosong', beds: [{ id: 8, name: 'Katil 8', occupied: true }], description: 'Standard room' }
    ]
  },
  {
    id: 4,
    name: 'Villa Heights',
    location: 'Cyberjaya',
    image: 'https://placehold.co/800x500/E74C3C/ffffff?text=Kamar+4+Villa',
    description: 'Near university. Bilik bersih dan宽敞. Included utility bills.',
    rooms: [
      { id: 401, name: 'Kamar 4A', price: 380, status: 'kosong', beds: [{ id: 9, name: 'Katil 9', occupied: false }], description: 'Single bed room' },
      { id: 402, name: 'Kamar 4B', price: 400, status: 'kosong', beds: [{ id: 10, name: 'Katil 10', occupied: false }], description: 'Queen bed room' }
    ]
  },
  {
    id: 5,
    name: 'Rumah Sewa Zahra',
    location: 'Nilai',
    image: 'https://placehold.co/800x500/F39C12/ffffff?text=Kamar+5+Zahra',
    description: 'Near KTM station. Rumah bersih dan safe. Parking available.',
    rooms: [
      { id: 501, name: 'Kamar 5A', price: 320, status: 'kosong', beds: [{ id: 11, name: 'Katil 11', occupied: false }], description: 'Budget room' },
      { id: 502, name: 'Kamar 5B', price: 350, status: 'ditempah', beds: [{ id: 12, name: 'Katil 12', occupied: false }], description: 'Standard room' }
    ]
  },
  {
    id: 6,
    name: 'Seri Ivy Apartment',
    location: 'Serdang',
    image: 'https://placehold.co/800x500/1ABC9C/ffffff?text=Kamar+6+Seri',
    description: 'Near hospital and university. Fully furnished. WiFi and water included.',
    rooms: [
      { id: 601, name: 'Kamar 6A', price: 480, status: 'kosong', beds: [{ id: 13, name: 'Katil 13', occupied: false }], description: 'Premium room' },
      { id: 602, name: 'Kamar 6B', price: 450, status: 'kosong', beds: [{ id: 14, name: 'Katil 14', occupied: true }], description: 'AC room' },
      { id: 603, name: 'Kamar 6C', price: 400, status: 'kosong', beds: [{ id: 15, name: 'Katil 15', occupied: false }], description: 'Fan room' }
    ]
  }
]

export const FACILITIES_LIST = [
  'WiFi',
  'Air-Cond',
  'Katil',
  'Almari',
  'Meja',
  'Kerusi',
  'Peti Sejuk',
  'Dapur',
  'Bilik Air Berkongsi',
  'Parking',
  '24/7 Security',
  'CCTV'
]
