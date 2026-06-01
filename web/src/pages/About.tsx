export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tentang PipeBloom</h1>
        <p className="text-gray-500">Cerita di balik bunga-bunga cantik dari pipe cleaner</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cerita Kami</h2>
          <p className="text-gray-500 leading-relaxed mb-4">
            PipeBloom lahir dari kecintaan kami terhadap kerajinan tangan dan keindahan bunga.
            Berawal dari hobi membuat bunga dari pipe cleaner, kami ingin berbagi kebahagiaan
            melalui karya-karya kami kepada lebih banyak orang.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Setiap produk PipeBloom dibuat dengan penuh ketelitian dan cinta. Kami percaya
            bahwa hadiah buatan tangan memiliki nilai lebih karena mengandung perhatian dan
            kehangatan di setiap detailnya.
          </p>
        </div>
        <div className="bg-pink-100 rounded-xl aspect-square flex items-center justify-center">
          <img src="/logo.svg" alt="PipeBloom" className="w-32 h-32" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Visi</h3>
          <p className="text-gray-500">Menjadi brand bunga handmade pipe cleaner terdepan di Indonesia yang dikenal dengan kualitas dan kreativitasnya.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Misi</h3>
          <ul className="text-gray-500 space-y-2">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-pink-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Menghasilkan produk handmade berkualitas tinggi</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-pink-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Memberikan pengalaman berbelanja yang menyenangkan</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-pink-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Mendukung kreativitas dan ekonomi lokal</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-pink-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Menjadi pilihan utama untuk hadiah spesial</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
