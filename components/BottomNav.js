import { HomeIcon, TeamIcon, WalletIcon, UserIcon } from './NavIcons';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <a href="/">
        <HomeIcon />
        <span>Home</span>
      </a>

      <a href="/team">
        <TeamIcon />
        <span>Team</span>
      </a>

      <a href="/wallet">
        <WalletIcon />
        <span>Wallet</span>
      </a>

      <a href="/account">
        <UserIcon />
        <span>Account</span>
      </a>
    </nav>
  );
}
