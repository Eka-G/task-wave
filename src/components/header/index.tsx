import logo from "/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <a href="/" className="header__link">
        <img src={logo} className="header__logo" alt="logo" />
      </a>
      <div className="header__deciration"></div>
    </header>
  );
}
