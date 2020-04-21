import React from "react";
import styled from "styled-components";
import { Box, Badge, Image, Flex, Avatar, Text, Stack} from "@chakra-ui/core";

  const property = {
    imageUrl: "https://res.cloudinary.com/practicaldev/image/fetch/s--b2wKHeXZ--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://raw.githubusercontent.com/app-generator/static/master/products/flask-dashboard-black-screen.png",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Conditional rendering in React - using the && operator",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

const FeaturedDisplay = props => {
  return (
      <Box maxW="100%" borderWidth="1px" mt="40px" overflow="hidden" bg="white" className="hover-raise transition-medium">
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h2"
          lineHeight="tight"
        >
          {property.title}
        </Box>
        <Box
          mt="1"
          fontWeight="normal"
          as="p"
          lineHeight="tight"
        >
          {property.title}
        </Box>
        <Stack isInline mt="40px">
        <Avatar name="Dan Abrahmov" size="xs" src="https://bit.ly/dan-abramov" />
        <Avatar name="Kola Tioluwani" size="xs" src="https://bit.ly/tioluwani-kolawole" />
        <Avatar name="Kent Dodds" size="xs" src="https://bit.ly/kent-c-dodds" />
        </Stack>

      </Box>
    </Box>

    
  );
};

export default FeaturedDisplay;
