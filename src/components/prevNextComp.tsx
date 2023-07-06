import React from 'react';
// ui
import {Box} from '../ui';
///////////////////////////////////////////////////////////////////////////////////////////////////

const ButtonComponent = ({action, children}:{action: () => void | any, children: React.ReactNode}) => (
  <Box onClick={action} padding='2px 4px' border='1px solid grey' cursor='default'>
    {children}
  </Box>
);

export const PrevNextComponent = ({
  handleNext,
  handlePrev
}: {
  handleNext: () => void,
  handlePrev: () => void
}) => {
  return (
    <Box display='flex' gridGap='4px'>
      <ButtonComponent action={handlePrev}>{'< Prev'}</ButtonComponent>
      <ButtonComponent action={handleNext}>{'Next >'}</ButtonComponent>
    </Box>
  )
};

export default PrevNextComponent;