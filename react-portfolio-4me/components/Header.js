import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Icon } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const handleClick = (anchor) => (e) => {
    e.preventDefault();
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const headBoxElt = useRef(null);

  useEffect(() => {
    let scrollVPos = window.scrollY || window.pageYOffset;;
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      headBoxElt.current.style.transform = scrollY > scrollVPos
        ? 'translateY(-200px)'
        : 'translateY(0)';
      scrollVPos = scrollY;
    };
    //
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);


  /*This is the replacement code:
  const handleClick = (e) => {
    e.preventDefault();
    const anchor = e.target.href + '';
    const id = `${anchor.substring(anchor.lastIndexOf('#') + 1)}`;
    //
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
*/

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration="1s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      ref={headBoxElt}
      zIndex={10}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            {/*1. Add social media links based on the `socials` data */}
            <HStack spacing={19}>{
              socials.map((social, i) =>
                <a href={social.url} key={i}><FontAwesomeIcon icon={social.icon} size='2x' /></a>
              )}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              {/* Add links to Projects and Contact me section */}
              <a href="#projects-section" onClick={handleClick('projects')}>Projects</a>
              <a href="#contactme-section" onClick={handleClick('contactme')}>Contact Me</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
