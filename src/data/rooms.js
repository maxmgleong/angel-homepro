export const ROOMS = [
  {
    id: 1,
    name: 'Bilik Master Katil Queen',
    price: 750,
    status: 'kosong',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
    facilities: ['wifi', 'ac', 'peti_sejuk'],
    description: 'Bilik master luas dengan katil queen size, almari besar, dan meja study. Bilik air dalam私人厕所在房内。',
    location: 'Bangsar, Kuala Lumpur',
    size: '180 sqft'
  },
  {
    id: 2,
    name: 'Bilik Single Bilik Kongsi',
    price: 450,
    status: 'ditempah',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    facilities: ['wifi', 'ac'],
    description: 'Bilik single dengan katil single, sesuai untuk pelajar atau pekerja. Kongsi bilik air dengan 2 penyewa lain.',
    location: 'TTDI, Kuala Lumpur',
    size: '120 sqft'
  },
  {
    id: 3,
    name: 'Bilik Double Shared Room',
    price: 550,
    status: 'kosong',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    facilities: ['wifi', 'ac', 'peti_sejuk'],
    description: 'Bilik double untuk 2 orang, ideal untuk pasangan atau rakan serumah. Shared bathroom.',
    location: 'Mont Kiara, Kuala Lumpur',
    size: '150 sqft'
  },
  {
    id: 4,
    name: 'Studio Apartment',
    price: 1200,
    status: 'kosong',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    facilities: ['wifi', 'ac', 'peti_sejuk'],
    description: 'Studio lengkap dengan dapur kecil dan bilik air sendiri. Sesuai untuk profesional tunggal.',
    location: 'Bangssar South, Kuala Lumpur',
    size: '280 sqft'
  },
  {
    id: 5,
    name: 'Bilik AC Budget',
    price: 380,
    status: 'ditempah',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
    facilities: ['wifi', 'ac'],
    description: 'Bilik AC budget dengan katil single. Shared bilik mandi. Lokasi strategik near LRT.',
    location: 'Wangsa Maju, Kuala Lumpur',
    size: '100 sqft'
  },
  {
    id: 6,
    name: 'Medium Room Near LRT',
    price: 600,
    status: 'kosong',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80',
    facilities: ['wifi', 'ac', 'peti_sejuk'],
    description: 'Bilik sederhana dengan katil queen dan kabin lengkap. 5 minit ke LRT Abdullah Hukum.',
    location: 'Bangsar South, Kuala Lumpur',
    size: '140 sqft'
  }
]

export const FACILITIES = {
  wifi: { label: 'WiFi', icon: 'Wifi' },
  ac: { label: 'AC', icon: 'Snowflake' },
  peti_sejuk: { label: 'Peti Sejuk', icon: 'Refrigerator' },
  parking: { label: 'Parking', icon: 'Car' },
 洗衣机: { label: 'Mesin Basuh', icon: 'WashingMachine' }
}
