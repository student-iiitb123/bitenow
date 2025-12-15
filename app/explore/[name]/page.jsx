import React from 'react'

const page = async ({params}) => {
 let name = await params.name;
 console.log(name)
  
  return (
    <>
     <main className="min-h-screen bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden">
      

      {/* Decorative Image */}
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
        className="hidden md:block absolute left-0 top-32 w-56 opacity-90"
        alt=""
      />
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
        className="hidden md:block absolute right-0 top-20 w-60 opacity-90"
        alt=""
      />

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 py-20">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-10">
          {/* {decodeURI(name)} */}
          
        </h1>

      
      </section>


      
    </main>
    </>
  )
}

export default page