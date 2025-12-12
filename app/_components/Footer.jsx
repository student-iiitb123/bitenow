const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">

        <h2 className="text-lg font-semibold tracking-wide">BiteNow</h2>

        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} BiteNow. All rights reserved.
        </p>

        <div className="flex gap-6 mt-2 text-gray-400">
          <a className="hover:text-white cursor-pointer transition">Privacy</a>
          <a className="hover:text-white cursor-pointer transition">Terms</a>
          <a className="hover:text-white cursor-pointer transition">Support</a>
        </div>

      </div>
    </footer>
  )
}

export default Footer
