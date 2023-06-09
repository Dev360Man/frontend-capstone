import React from "react";
import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import createPlaceholderURI from "./image-fallback";

const Card = ({ title, description, imageSrc, imageDim }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack bg="#fff" color="#000" borderTopRadius="20px">
      <Image src={imageSrc} fallbackSrc={createPlaceholderURI(imageDim.w, imageDim.h, "#937380")} width="100%" borderRadius="20px" />
      <VStack alignItems="start" p={3}>
        <Heading>{title}</Heading>
        <Text>{description}</Text>
        <HStack alignItems="start" >
          <b>See more</b>
          <FontAwesomeIcon icon={faArrowRight} size="1x"></FontAwesomeIcon>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;
