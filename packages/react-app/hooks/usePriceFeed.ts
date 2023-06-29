import { readContract } from '@wagmi/core';
import { utils } from 'ethers';

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const priceFeedAddresses = [
  {
    name: 'BTC/USD',
    address: "0xC0f1567a0037383068B1b269A81B07e76f99710c",
    decimal: 8,
  },
  {
    name: 'CELO/USD',
    address: "0x022F9dCC73C5Fb43F2b4eF2EF9ad3eDD1D853946",
    decimal: 8,
  },
  {
    name: 'ETH/USD',
    address: "0x7b298DA61482cC1b0596eFdb1dAf02C246352cD8",
    decimal: 8,
  },
  {
    name: 'LINK/USD',
    address: "0x9E4e3D77b0302e93dA68633Ad370E3e8C9D84eea",
    decimal: 8,
  },
  {
    name: 'USDC/USD',
    address: "0x642Abc0c069dC5041dEA5bFC155D38D844779274",
    decimal: 8,
  },
  {
    name: 'USDT/USD',
    address: "0x7bcB65B53D5a7FfD2119449B8CbC370c9058fd52",
    decimal: 8,
  },
];

export const usePriceFeed = () => {
  const getPrices = async (address: `0x${string}`) => {
    const data: any = await readContract({
      address,
      abi: aggregatorV3InterfaceABI,
      functionName: 'latestRoundData',
    });
    return utils.formatUnits(data[1], 8);
  }

  const getAllPrices = async () => {
    const prices = await Promise.all(
      priceFeedAddresses.map(async (item) => {
        var res = await getPrices(item.address as `0x${string}`);
        return {
          name: item.name,
          price: res,
          address: item.address,
        }
      })
    );
    return prices;
  }

  return { getPrices, getAllPrices };
}