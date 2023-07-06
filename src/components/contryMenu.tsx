import React, { useState } from 'react';
// ui
import { Box } from '../ui';

export const CountryMenu = ({ countries }:{ countries: Array<{ countryCode: string, name: string }> } ) => {
  const [show, setShow] = useState(false);

  return (
    <Box width='max-content' margin='0 0 10px 0'>
      <Box
        padding='2px 5px'
        position='relative'
        border='1px solid grey'
        borderRadius='10px'
        onClick={() => setShow(!show)}
      >
        Countries
      </Box>
      {
        show
          ? (
            <Box
              margin='10px 0 0 0'
              bg='white'
              overflow='auto'
              maxHeight='200px'
              position='absolute'
              borderRadius='10px'
              border='1px solid green'
              boxShadow='1px 0 0 0 1px grey'
            >
              {
                countries.map((el, i) => {
                  return (
                    <Box key={i}>{`${el?.name} - ${el?.countryCode}`}</Box>
                  );
                })
              }
            </Box>
          )
          : null
      }
    </Box>
  )
};

export default CountryMenu;