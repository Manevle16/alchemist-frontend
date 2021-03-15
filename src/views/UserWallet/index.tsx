import React, { useContext, useState, useEffect } from "react";
import Web3Context from "../../Web3Context";
import { getTokenBalances } from "../../contracts/getTokenBalances";
import { toMaxDecimalsRound } from "../Widget/utils";
import { Spinner } from "@chakra-ui/react";
import { CSSTransition } from "react-transition-group";
import { Badge, Box, HStack, Text } from "@chakra-ui/layout";

export default function UserAddress() {
  const [inProp, setInProp] = useState(false);
  const { signer, provider } = useContext(Web3Context);
  const [tokenBalance, setTokenBalance] = useState<{
    alchemist: string;
    lp: string;
  }>();

  useEffect(() => {
    (async () => {
      if (signer) {
        const balances = await getTokenBalances(signer);
        setTokenBalance(balances);
      }
    })();
  }, [signer]);

  useEffect(() => {
    setInProp(true);
  }, []);

  return (
    <CSSTransition in={inProp} timeout={1000} classNames="slideDown">
      {provider ? (
        <Box
          py={2}
          px={2}
          borderRadius="lg"
          bg="gray.800"
          shadow="xl"
          borderWidth={1}
          borderColor="cyan.500"
        >
          <HStack>
            <Text color="gray.300">My wallet:</Text>
            {!tokenBalance && <Spinner />}
            {tokenBalance && (
              <Badge px={2} py={1} borderRadius="md" boxShadow="sm">
                Alchemist: {toMaxDecimalsRound(tokenBalance.alchemist, 0.01)} ⚗️
              </Badge>
            )}
            {tokenBalance && (
              <Badge px={2} py={1} borderRadius="md" boxShadow="sm">
                LP: {toMaxDecimalsRound(tokenBalance.lp, 0.01)} ⚗️
              </Badge>
            )}
          </HStack>
        </Box>
      ) : (
        <></>
      )}
    </CSSTransition>
  );
}
