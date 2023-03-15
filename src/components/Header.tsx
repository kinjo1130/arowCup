function Header() {
  return (
    <header className="bg-gray-800">
      <div className="max-w-7xl mx-auto flex flex-row justify-between py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">AI観光案内</h1>
        <a className="text-white font-bold inline-block align-base" href="https://aitrip.canny.io/" target="_blank" rel="noreferrer">開発案募集</a>
      </div>
    </header>
  );
}
export default Header;
