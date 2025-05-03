import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React from 'react'

const Airdrop = () => {
    const wallet = useWallet()
    const {connection} = useConnection();
    function sendAirDropToUser() {
       connection.requestAirdrop(wallet.publicKey,1) 
    }
  return (
    <div>
        <h1>Hey Blockchain Dev! Grab Some Free Devnet SOL 🚀</h1>
        
        <input type="text" placeholder='Your Sol Adress ' />
        <button onClick={sendAirDropToUser}>Send Airdrop</button>
    </div>
  )
}

export default Airdrop