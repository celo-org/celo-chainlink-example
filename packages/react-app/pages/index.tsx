import { usePriceFeed } from "@/hooks/usePriceFeed";
import { useEffect, useState } from "react";

interface PriceProps {
  name: string;
  price: string;
  address: string;
}

export default function Home() {
  const { getAllPrices } = usePriceFeed();
  const [allPrices, setAllPrices] = useState<PriceProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllPrices().then((prices) => {
      setAllPrices(prices);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full ">
        <p className="text-4xl font-bold">
          Price Feed Example CELO {"<>"} CHAINLINK
        </p>
        <p className="mt-5">
          Network: <span className="font-bold">Celo Alfajores</span>
        </p>
        <p className="">
          Souce:{" "}
          <span className="font-bold text-blue-500">
            <a href="https://github.com/celo-org">
              https://github.com/celo-org
            </a>
          </span>
        </p>
        <p className="mb-5">
          Price Feed Contract Addresses:{" "}
          <span className="font-bold text-blue-500">
            <a href="https://docs.chain.link/data-feeds/price-feeds/addresses?network=celo">
              https://docs.chain.link/data-feeds/price-feeds/addresses?network=celo
            </a>
          </span>
        </p>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg relative overflow-x-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Pair
              </th>
              <th scope="col" className="px-6 py-3">
                Price in USD
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {allPrices.map((price, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {price.name}
                </th>
                <td className="px-6 py-4">
                  ${parseFloat(price.price).toPrecision(6)}
                </td>
                <td className="px-6 py-4 text-blue-500">
                  <a
                    href={
                      "https://alfajores.celoscan.io/address/" + price.address
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {price.address}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
