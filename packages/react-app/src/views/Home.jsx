import {
  useBalance,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from "eth-hooks";
import {
  Center,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Heading,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ targetNetwork, price, gasPrice, yourLocalBalance, readContracts }) {
  const gasPriceF = useGasPrice(targetNetwork, "fastest");
  const gasPriceS = useGasPrice(targetNetwork, "safeLow");
  const gasPriceA = useGasPrice(targetNetwork, "average");

  console.log(gasPriceF);
  console.log(gasPriceA);
  console.log(gasPriceS);

  let gasPriceNum = typeof gasPrice === "undefined" ? 0 : parseInt(gasPrice, 10) / 10 ** 9;

  const [value, setValue] = useState("Fast");
  const [gasL, setGasL] = useState(774113);

  let weiValue = (gasPriceNum * 10 ** 9 * gasL) / 10 ** 18;

  let gasFee = weiValue * price;

  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");

  return (
    <div>
      <Center>
        <Flex
          w={"60%"}
          wrap="wrap"
          h="60%"
          borderRadius={10}
          bg={"black"}
          p="10px"
          style={{ boxShadow: "5px 18px 13px 3px rgba(0,0,0,0.1)" }}
        >
          <Box mr={4} borderRadius={10}>
            <Box mb={3} h={12} borderTopRadius="15px" bg="blue">
              <Heading>Gas Limit</Heading>
            </Box>
            <NumberInput defaultValue={gasL} borderColor="gray">
              <NumberInputField onChange={e => setGasL(e.target.value)} />
            </NumberInput>
          </Box>
          <Box mr={4} borderRadius={10}>
            <Box mb={3} h={12} borderTopRadius="15px" bg="green">
              <Heading>1 ETH to $</Heading>
            </Box>
            <NumberInput value={"$" + " " + price} borderColor="gray">
              <NumberInputField />
            </NumberInput>
          </Box>
          <Box mr={4} borderRadius={10}>
            <Box mb={3} h={12} borderTopRadius="15px" bg="blue">
              <Heading>cost(wei)</Heading>
            </Box>
            <NumberInput value={weiValue} borderColor="gray">
              <NumberInputField />
            </NumberInput>
          </Box>
          <Box mr={3} borderRadius={10}>
            <Box mb={3} h={12} borderTopRadius="15px" bg="blue">
              <Heading>Gas Price</Heading>
            </Box>
            <NumberInput value={gasPriceNum} borderColor="gray">
              <NumberInputField />
            </NumberInput>
          </Box>
          <Box borderRadius={10}>
            <Box mb={3} h={12} borderTopRadius="15px" bg="green">
              <Heading>Gas Fee $</Heading>
            </Box>
            <NumberInput value={"$" + " " + gasFee} borderColor="gray">
              <NumberInputField />
            </NumberInput>
          </Box>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="row">
              <Radio value="SafeLow">Safe Low</Radio>
              <Radio value="Average">Average</Radio>
              <Radio value="Fast">Fast</Radio>
              <Radio value="Fastest">Fastest</Radio>
            </Stack>
          </RadioGroup>
        </Flex>
      </Center>
    </div>
  );
}

export default Home;
