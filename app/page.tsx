import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden">
      <CustomerHeader />

      {/* Background Food Images */}
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
        className="absolute left-0 top-32 w-40 md:w-56 opacity-90"
        alt="burger"
      />

      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
        className="absolute right-0 top-20 w-44 md:w-60 opacity-90"
        alt="pizza"
      />

      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Biryani.png"
        className="absolute left-10 bottom-10 w-36 md:w-52 opacity-90"
        alt="noodles"
      />

      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Noodles.png"
        className="absolute right-16 bottom-12 w-36 md:w-48 opacity-90"
        alt="sushi"
      />

      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Samosa.png"
        className="absolute left-60 bottom-10 w-36 md:w-52 opacity-90"
        alt="sushi"
      />

      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Momo.png"
        className="absolute right-60 bottom-10 w-36 md:w-52 opacity-90"
        alt="sushi"
      />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24">
        
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-8">
          Order food & groceries. <br />
          Discover best restaurants. <br />
          <span className="text-yellow-200">BiteNow it!</span>
        </h1>

      <div className="bg-orange-500 p-4 rounded-2xl flex gap-4 max-w-5xl mx-auto">

  {/* Location Input (Smaller) */}
  <div className="flex items-center gap-3 w-1/3 bg-white rounded-full px-5 py-3 shadow-md 
                  hover:shadow-lg transition-all duration-300 group">
    <span className="text-orange-500 text-xl">📍</span>

    <input
      type="text"
      placeholder="Enter your delivery location"
      className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
    />

    <span className="text-gray-400 group-hover:text-orange-500 transition">⌄</span>
  </div>

  {/* Search Input (Bigger) */}
  <div className="flex items-center gap-3 w-2/3 bg-white rounded-full px-6 py-3 shadow-md
                  hover:shadow-xl transition-all duration-300">
    <input
      type="text"
      placeholder="Search for restaurant, item or more"
      className="w-full outline-none text-gray-800 placeholder-gray-400 text-base"
    />

    <span className="text-gray-500 text-xl hover:text-orange-500 transition">🔍</span>
  </div>

</div>

      </section>

     
    </main>
  );
}
