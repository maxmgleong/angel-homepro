import { useState, useRef } from 'react'
import { ArrowLeft, Camera, Bed } from 'lucide-react'

export default function TenantForm({ room, property, onBack, onSubmit }) {
  const [form, setForm] = useState({
    nama: '',
    ic: '',
    telefon: '',
    tarikhMasuk: '',
    selectedBedId: room.beds.find(b => !b.occupied)?.id || ''
  })
  const [icImage, setIcImage] = useState(null)
  const [icPreview, setIcPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const fileRef = useRef()

  const availableBeds = room.beds.filter(b => !b.occupied)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      setIcImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setIcPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  function validate() {
    const errs = {}
    if (!form.nama.trim()) errs.nama = 'Sila masukkan nama penuh'
    if (!form.ic.trim()) errs.ic = 'Sila masukkan No. IC'
    else if (form.ic.length < 6) errs.ic = 'No. IC tidak sah'
    if (!form.telefon.trim()) errs.telefon = 'Sila masukkan no. telefon'
    else if (form.telefon.length < 9) errs.telefon = 'No. telefon tidak sah'
    if (!form.tarikhMasuk) errs.tarikhMasuk = 'Sila pilih tarikh masuk'
    if (!form.selectedBedId) errs.bed = 'Sila pilih katil'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const selectedBed = room.beds.find(b => b.id === +form.selectedBedId)
    onSubmit({ ...form, selectedBedName: selectedBed?.name || '' })
  }

  return (
    <div className="min-h-screen bg-accent">
      <div className="bg-primary px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-white text-lg font-bold">Borang Tempahan</h1>
            <p className="text-secondary text-sm">{room.name}</p>
            <p className="text-secondary/70 text-xs">{property.name}</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl card-shadow p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">Pilih Katil *</label>
            <div className="grid grid-cols-2 gap-2">
              {availableBeds.map(bed => (
                <button
                  key={bed.id}
                  type="button"
                  onClick={() => { setForm(prev => ({ ...prev, selectedBedId: bed.id })); setErrors(prev => ({ ...prev, bed: '' })) }}
                  className={`p-3 rounded-xl border-2 text-left transition-colors ${form.selectedBedId == bed.id ? 'border-primary bg-accent' : 'border-accent'}`}
                >
                  <Bed size={16} className="text-primary mb-1" />
                  <p className="text-sm font-semibold text-primary">{bed.name}</p>
                  <p className="text-xs text-green-600">🟢 Tersedia</p>
                </button>
              ))}
            </div>
            {errors.bed && <p className="text-red-500 text-xs mt-1">{errors.bed}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">Nama Penuh</label>
            <input name="nama" value={form.nama} onChange={handleChange} placeholder="Contoh: Ahmad bin Ali"
              className={`w-full border-2 ${errors.nama ? 'border-red-400' : 'border-accent'} rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors`} />
            {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">No. Kad Pengenalan (IC)</label>
            <input name="ic" value={form.ic} onChange={handleChange} placeholder="Contoh: 900101-01-1234"
              className={`w-full border-2 ${errors.ic ? 'border-red-400' : 'border-accent'} rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors`} />
            {errors.ic && <p className="text-red-500 text-xs mt-1">{errors.ic}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">No. Telefon (WhatsApp)</label>
            <input name="telefon" value={form.telefon} onChange={handleChange} placeholder="Contoh: 012-345 6789"
              className={`w-full border-2 ${errors.telefon ? 'border-red-400' : 'border-accent'} rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors`} />
            {errors.telefon && <p className="text-red-500 text-xs mt-1">{errors.telefon}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">Tarikh Masuk</label>
            <input type="date" name="tarikhMasuk" value={form.tarikhMasuk} onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full border-2 ${errors.tarikhMasuk ? 'border-red-400' : 'border-accent'} rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors`} />
            {errors.tarikhMasuk && <p className="text-red-500 text-xs mt-1">{errors.tarikhMasuk}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">Gambar Kad Pengenalan (IC)</label>
            <div onClick={() => fileRef.current.click()} className="border-2 border-dashed border-accent rounded-2xl p-6 text-center cursor-pointer hover:border-primary transition-colors">
              {icPreview ? (
                <div className="relative">
                  <img src={icPreview} alt="IC Preview" className="max-h-48 mx-auto rounded-xl object-contain" />
                  <p className="text-xs text-muted mt-2">📷 Klik untuk tukar gambar</p>
                </div>
              ) : (
                <div className="text-muted">
                  <Camera size={32} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm">Klik untuk muat naik gambar IC</p>
                  <p className="text-xs mt-1">Format: JPG, PNG (Maks: 5MB)</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="hidden" />
          </div>

          <div className="bg-accent rounded-xl p-3">
            <p className="text-xs text-muted">Bilik Dipilih:</p>
            <p className="font-bold text-primary">{room.name}</p>
            <p className="text-sm text-muted">RM {room.price}/bulan · {room.beds.find(b => b.id === +form.selectedBedId)?.name || '...'}</p>
          </div>

          <button type="submit" className="btn-primary w-full text-center mt-2">
            ✅ Hantar Permohonan
          </button>
        </form>
        <p className="text-center text-muted text-xs mt-4 mb-6">⚠️ Maklumat disimpan secara tempatan untuk demo sahaja.</p>
      </div>
    </div>
  )
}
