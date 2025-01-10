import React, { useState } from 'react';

const wallets = [
  { name: 'Phantom', icon: '👻' },
  { name: 'Solflare', icon: '🌞' },
  { name: 'Sollet', icon: '💼' },
];

const WalletSelector = ({ onConnect }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const handleConnect = () => {
    if (selectedWallet) {
      const fakeAddress = 'So1' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      onConnect({ ...selectedWallet, address: fakeAddress });
    }
  };

  return (
    <div className="wallet-selector">
      <h2>Select a Wallet</h2>
      <div className="wallet-list">
        {wallets.map((wallet) => (
          <button
            key={wallet.name}
            className={`wallet-option ${selectedWallet === wallet ? 'selected' : ''}`}
            onClick={() => setSelectedWallet(wallet)}
          >
            {wallet.icon} {wallet.name}
          </button>
        ))}
      </div>
      <button onClick={handleConnect} disabled={!selectedWallet}>
        Connect
      </button>
    </div>
  );
};

export default WalletSelector;
