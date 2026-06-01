export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Hubungi Kami</h1>
        <p className="text-gray-500">Kami siap membantu Anda</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">WhatsApp</h3>
              <p className="text-gray-500 text-sm">0812-3456-7890</p>
            </div>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 text-sm font-medium shrink-0">Chat Sekarang &rarr;</a>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="text-gray-500 text-sm">hello@pipebloom.com</p>
            </div>
            <a href="mailto:hello@pipebloom.com" className="text-pink-600 hover:text-pink-700 text-sm font-medium shrink-0">Kirim Email &rarr;</a>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Lokasi</h3>
              <p className="text-gray-500 text-sm">Jakarta, Indonesia</p>
            </div>
            <span className="text-gray-400 text-sm shrink-0">Lihat Map &rarr;</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Jam Operasional</h3>
          <div className="space-y-3 text-gray-500">
            <div className="flex justify-between"><span>Senin - Jumat</span><span className="font-medium text-gray-700">09:00 - 18:00</span></div>
            <div className="flex justify-between"><span>Sabtu</span><span className="font-medium text-gray-700">09:00 - 15:00</span></div>
            <div className="flex justify-between"><span>Minggu</span><span className="font-medium text-gray-700">Libur</span></div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-400">Respon biasanya dalam 1-2 jam pada jam kerja.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
