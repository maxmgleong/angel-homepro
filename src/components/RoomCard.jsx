import { Wifi, Snowflake, Refrigerator, MapPin } from 'lucide-react'
import { FACILITIES } from '../data/rooms'

const ICONS = { Wifi, Snowflake, Refrigerator }

export default function RoomCard({ room, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden card-shadow cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="relative">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-44 object-cover"
          onError={e => { e.target.src = 'https://placehold.co/600x300/e8f5f1/4A9B8C?text=Bilik' }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            room.status === 'kosong'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}>
            {room.status === 'kosong' ? '🟢 Kosong' : '🔴 Telah Ditempah'}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-dark/80 text-white px-3 py-1 rounded-xl text-sm font-bold">
          RM {room.price}/<span className="text-xs font-normal">bulan</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-primary text-base mb-1">{room.name}</h3>
        <div className="flex items-center gap-1 text-muted text-xs mb-3">
          <MapPin size={12} />
          {room.location}
        </div>
        <div className="flex items-center gap-3">
          {room.facilities.map(f => {
            const Facility = ICONS[f] || FACILITIES[f]?.icon
            return (
              <div key={f} className="flex items-center gap-1 bg-accent px-2 py-1 rounded-lg">
                {Facility && <Facility size={13} className="text-primary" />}
                <span className="text-xs text-primary font-medium">
                  {FACILITIES[f]?.label || f}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
