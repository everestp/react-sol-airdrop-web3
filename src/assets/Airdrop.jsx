import React, { useRef, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

const Airdrop = () => {
  const { connection } = useConnection();
  const publicKeyRef = useRef();
  const amountRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const wallet = useWallet();

  const sendAirDropToUser = async () => {
    const address = publicKeyRef.current.value.trim();
    const amount = parseFloat(amountRef.current.value);

    if (!address || isNaN(amount) || amount <= 0) {
      setStatus('Please enter a valid address and amount.');
      return;
    }

    try {
      setLoading(true);
      setStatus('Airdropping...');
      const pubkey = new PublicKey(address);
      await connection.requestAirdrop(pubkey, amount * 1e9);
      setStatus('✅ Airdrop successful!');
    } catch (error) {
      console.error(error);
      setStatus('❌ Airdrop failed. Check the address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="airdrop-container">
      <h1 className="airdrop-title">Hey Blockchain Dev! Grab Some Free Devnet SOL 🚀</h1>

      <input
        ref={amountRef}
        type="number"
        placeholder="Amount in SOL"
        className="airdrop-input"
      />

      <input
        ref={publicKeyRef}
        type="text"
        placeholder="Your Solana Wallet Address"
        defaultValue={wallet.publicKey?.toBase58() || ''}
        className="airdrop-input"
      />

      <button
        onClick={sendAirDropToUser}
        disabled={loading}
        className="airdrop-button"
      >
        {loading ? 'Sending...' : 'Send Airdrop'}
      </button>

      {status && <p className="airdrop-status">{status}</p>}

      {/* Footer using same class for consistent styling */}
      <p className="airdrop-status">
        Developed by Everest Paudel ·{' '}
        <a
          href="https://x.com/everestpaudel"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Follow on X
        </a>
      </p>
    </div>
  );
};

export default Airdrop;
