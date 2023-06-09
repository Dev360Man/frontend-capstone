import React, { useEffect, useReducer } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  //
  Spinner,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();


  const formik = useFormik({
    initialValues: {
      firstName: '',//The name of the user
      email: '', //The email of the user
      type: 'hireMe', //'hireMe' | 'openSource' | 'other'
      comment: '', //A message from the user

    },

    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2))
      submit("/", values)
        .then(() => {
          // alert(JSON.stringify(values, null, 2));
          if (response.type === 'success') {
            onOpen('success', response.message)
            formik.resetForm();
          }
          else {
            onOpen(response.type, response.message)
            // onClose('error', response.message) 
          }
        })
        .catch(err => onOpen('error', 'Something went wrong, please try again later!')); //JSON.stringify(err, null, 2)alert(
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),//.min(3).max(25),
      email: Yup.string().required('Required').email('Invalid email address'),
      type: Yup.string().oneOf(
        ['hireMe', 'openSource', 'other'],
        'Select a message category please!'
      ).notRequired(),
      comment: Yup.string().required('Required')
        .min(25, 'Must be at least 25 characters').max(250)
    }),
  });

  const isInvalidField = (name) =>
    (formik.touched[name] === true && formik.errors[name] !== undefined)


  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              {/* <FormControl isInvalid={() => isInvalidField('firstName')}> */}
              <FormControl isInvalid={isInvalidField('firstName')}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Your name please?"
                  {...formik.getFieldProps("firstName")}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={isInvalidField('email')}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your e-mail please?"
                  {...formik.getFieldProps('email')}
                />
                <FormErrorMessage>{formik.errors['email']}</FormErrorMessage>
              </FormControl>
              <FormControl >
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type"
                  {...formik.getFieldProps("type")}>
                  <option value="hireMe" style={{ color: 'blue' }} >Freelance project proposal</option>
                  <option value="openSource" style={{ color: 'blue' }} >
                    Open source consultancy session
                  </option>
                  <option value="other" style={{ color: 'blue' }} >Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={isInvalidField('comment')}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  placeholder="Enter your message here please?"
                  height={250}
                  {...formik.getFieldProps('comment')}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                {isLoading && <Spinner color='red.500' />}&nbsp;Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
