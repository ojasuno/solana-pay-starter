import React, { useEffect, useState } from "react";
import Product from "../components/Product";

import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import HeadComponent from '../components/Head';

// Constants
const BY_TWITTER_HANDLE = "ojasuno";
const BY_TWITTER_LINK = `https://twitter.com/${BY_TWITTER_HANDLE}`;
const ON_TWITTER_HANDLE = "_buildspace";
const ON_TWITTER_LINK = `https://twitter.com/${ON_TWITTER_HANDLE}`;


const App = () => {
  // This will fetch the users' publick key (wallet address) from any wallet we support
  const { publicKey } = useWallet();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderNotConnectedContainer = () => (
    <div>
      {/* <img src="https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif" alt="emoji" /> */}

      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>
    </div>
  );

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
  
  return (
    <div className="App">
      {/* <HeadComponent/> */}
      <div className="container">
        <header className="header-container">
          <p className="header"> 👾 Konnichiwa 🐉</p>
          <p className="sub-text">... this store accepts web3 currency!</p>
        </header>

        <main>
          {/* We only render the connect button if publickey doesn't exist */}
          {/* {publicKey ? 'Connected!' : renderNotConnectedContainer()} */}
          
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
          
          {/* <img src="https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif" alt="emoji" /> */}

        </main>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
          <a
            className="footer-text"
            href={BY_TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${BY_TWITTER_HANDLE}`}</a>
        </div>

      </div>
    </div>
  );
};

export default App;
