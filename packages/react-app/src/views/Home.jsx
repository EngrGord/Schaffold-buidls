import { useContractReader, useGasPrice } from "eth-hooks";
import {
  Center,
  Flex,
  NumberInput,
  NumberInputField,
  Box,
  Heading,
  RadioGroup,
  Stack,
  Radio,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";

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

  const [valueRadio, setValueRadio] = useState("Fast");

  let gasPriceNum = typeof gasPrice === "undefined" ? 0 : parseInt(gasPrice, 10) / 10 ** 9;

  if (valueRadio == "SafeLow" && gasPriceS !== "undefined") {
    gasPriceNum = parseInt(gasPriceS, 10) / 10 ** 9;
  } else if (valueRadio == "Average" && !gasPriceA !== "undefined") {
    gasPriceNum = parseInt(gasPriceA, 10) / 10 ** 9;
  } else if (valueRadio == "Fast" && gasPrice !== "undefined") {
    gasPriceNum = parseInt(gasPrice, 10) / 10 ** 9;
  } else if (valueRadio == "Fastest" && gasPriceF !== "undefined") {
    gasPriceNum = parseInt(gasPriceF, 10) / 10 ** 9;
  } else {
    gasPriceNum = 0;
  }
  const [gasL, setGasL] = useState(774113);
  console.log(valueRadio);
  let weiValue = (gasPriceNum * 10 ** 9 * gasL) / 10 ** 18;

  let gasFee = weiValue * price;

  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");

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
          <Heading transition={"all .5s ease-in-out"}>Ethereum Gas Fee Calculator</Heading>
          <RadioGroup onChange={setValueRadio} value={valueRadio}>
            <Stack direction="row">
              <Tooltip label="Top" placement="top">
                <Radio value="SafeLow">Safe Low</Radio>
              </Tooltip>
              <Radio value="Average">Average</Radio>
              <Radio value="Fast">Fast</Radio>
              <Radio value="Fastest">Fastest</Radio>
            </Stack>
          </RadioGroup>
          <Stack my={70} direction={"row"}>
            <Box mr={10} borderRadius={10}>
              <Box p={"auto"} mb={3} h={12} borderTopRadius="15px" bg="blue.700">
                <Heading lineHeight={""} fontSize={{ base: "2xl", md: "2xl" }}>
                  Gas Amount
                </Heading>
              </Box>
              <NumberInput defaultValue={gasL} borderColor="gray">
                <NumberInputField autoFocus onChange={e => setGasL(e.target.value)} />
              </NumberInput>
            </Box>
            <Box borderRadius={10}>
              {/* <Stat>
              <StatLabel>Gas Fee</StatLabel>
              <StatNumber fontSize={50}>{"$" + " " + gasFee.toFixed(2)}</StatNumber>
              <StatHelpText>Gas fee required for the Input gas.</StatHelpText>
            </Stat> */}
              <Box mb={3} h={12} borderTopRadius="15px" bg="green">
                <Heading lineHeight={""} fontSize={{ base: "2xl", md: "2xl" }}>
                  Gas Fee
                </Heading>
              </Box>
              <NumberInput value={"$" + " " + gasFee.toFixed(2)} borderColor="gray">
                <NumberInputField />
              </NumberInput>
            </Box>
          </Stack>
          <Stack mb={5} direction={"row"}>
            <Box mr={10} borderRadius={10}>
              <Box mb={3} h={12} borderTopRadius="15px" bg="blue.700">
                <Heading lineHeight={""} fontSize={{ base: "2xl", md: "2xl" }}>
                  Gas Price
                </Heading>
              </Box>
              <NumberInput value={gasPriceNum} borderColor="gray">
                <NumberInputField />
              </NumberInput>
            </Box>
            <Box mr={4} borderRadius={10}>
              <Box mb={3} h={12} borderTopRadius="15px" bg="blue.700">
                <Heading lineHeight={""} fontSize={{ base: "2xl", md: "2xl" }}>
                  Gas Fee(ETH)
                </Heading>
              </Box>
              <NumberInput value={"Ξ" + " " + weiValue} borderColor="gray">
                <NumberInputField />
              </NumberInput>
            </Box>
          </Stack>
          <Box mr={4} borderRadius={10}>
            <Stat>
              <StatLabel>ETH Dollar Price</StatLabel>
              <StatNumber color={"green"}>{"$" + " " + price}</StatNumber>
              <StatHelpText>Realtime ETH price</StatHelpText>
            </Stat>
          </Box>
        </Flex>
      </Center>
    </div>
  );
}

export default Home;
