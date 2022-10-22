import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <header>
        <Box
          display="flex"
          align-items="center"
          justifyContent="space-between"
          ml={6}
          mr={6}
        >
          <Box>
            <Image boxSize="90px" src="" alt="brand" />
          </Box>
          <Box>Navigation options</Box>
          <Box>
            <Button pr={3} colorScheme="gray.600" fontSize="sm" variant="link">
              Login
            </Button>
            <Button colorScheme="gray.600" fontSize="sm" variant="link">
              Sign up
            </Button>
          </Box>
        </Box>
      </header>
    </>
  );
};

export default Header;
