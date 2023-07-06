import React from 'react';
import { Box } from '../ui';

export const GridWrapper = (props: any) => (
  <Box
    gridGap='4px'
    display='grid'
    gridTemplateColumns='repeat(7, 1fr)'
    {...props} />
);
const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
const dayOfWeekNumbers = ['1', '2', '3', '4', '5', '6', '7'];

export const DayNames = () => (
  <GridWrapper height='40px' width='100%'>
    {
      dayOfWeekNames.map((el, i) => <Box key={i} color='gray' fontSize='12px'>{el}</Box>)
    }
  </GridWrapper>
);

export const DayNumbers = () => (
  <GridWrapper mt='10px' height='40px' width='100%'>
    {
      dayOfWeekNumbers.map((el, i) => <Box key={i} color='grey' fontSize='10px'>{el}</Box>)
    }
  </GridWrapper>
);
