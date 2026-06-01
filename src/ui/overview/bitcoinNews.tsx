"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";

interface Coin {
  image: string | undefined;
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const CryptoTicker = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
              price_change_percentage: "24h",
            },
          }
        );

        setCoins(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCoins();

    const interval = setInterval(fetchCoins, 60000); // refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-[#07111f] py-3 ">
      <Marquee
  direction="left"
  speed={45}
  gradient={false}
  pauseOnHover={true}
  autoFill={true}
>
{coins.map((coin) => {
  const positive = coin.price_change_percentage_24h >= 0;

  return (
    <div
      key={coin.id}
      className="mx-4 mainmarquee flex h-12 items-center rounded-lg border border-white/10 bg-white/[0.03] px-4"
    >
      <img
        src={coin.image}
        alt={coin.name}
        className="marquee mr-2 h-7 w-7 flex-shrink-0 rounded-full"
        style={{marginRight:6}}
        
      />

      <span className="mr-3 min-w-[45px] font-semibold text-white">
        {coin.symbol.toUpperCase()}
      </span>

      <span className="mr-3 min-w-[100px] text-sm text-slate-300">
        ${coin.current_price.toLocaleString()}
      </span>

      <span
        className={`text-sm font-bold ${
          positive ? "text-green-400" : "text-red-400"
        }`}
      >
        {positive ? "+" : ""}
        {coin.price_change_percentage_24h.toFixed(2)}%
      </span>
    </div>
  );
})}
</Marquee>
    </div>
  );
};

export default CryptoTicker;