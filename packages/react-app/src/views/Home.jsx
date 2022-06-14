import { Center, Flex, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ targetNetwork, price, gasPrice, yourLocalBalance, readContracts }) {
  let { address, id, chainId } = useParams();
  const [nft, setNft] = useState({});
  const [activeLoader, setLoader] = useState(true);

  useEffect(() => {
    handleNft();
  }, []);

  const handleNft = async () => {
    const resp = await axios.get(
      `https://api.covalenthq.com/v1/137/tokens/0x9498274b8c82b4a3127d67839f2127f2ae9753f4/nft_metadata/1/?quote-currency=USD&format=JSON`,
      { auth: { username: "ckey_6bf60a7bf22d4a309dbe74f3c5c" } },
    );
    setNft(
      resp.data.data.items[0].nft_data !== null
        ? resp.data.data.items[0].nft_data[0]
        : { external_data: { image: "" } },
    );
    setLoader(false);
  };

  return (
    <div>
      <Center>
        <Flex
          align="center"
          direction={"column"}
          borderRadius={10}
          bg={"black"}
          p="30px"
          style={{ boxShadow: "5px 18px 13px 3px rgba(0,0,0,0.1)" }}
        >
          <div className="nft-details">
            <h1>{nft?.external_data?.name}</h1>
            <h2>Token ID : {nft.token_id}</h2>
            <p>{nft?.external_data?.description}</p>
            <Image src={nft?.external_data?.image} />
            <table className="nft-table">
              {nft?.external_data?.attributes ? (
                <>
                  {nft.external_data.attributes.map((o, i) => {
                    return (
                      <tr key={i}>
                        <td> {o.trait_type} </td>
                        <td> {o.value} </td>
                      </tr>
                    );
                  })}
                </>
              ) : null}
            </table>
          </div>
        </Flex>
      </Center>
    </div>
  );
}

export default Home;
