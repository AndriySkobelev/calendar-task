import React, { useEffect, useState } from 'react';
// ui
import { Box } from '../ui';
///////////////////////////////////////////////////////////////////////////////////////////////////

const TextComp = ({
  value,
  onChange
}:{
  value: string,
  onChange: (e: any) => void
}) => {
  return (
    <Box>
      <Box>Label</Box>
      <textarea value={value} onChange={onChange} style={{ height: '70px', resize: 'none' }}/>
    </Box>
  );
};

const colorVariants = ['red', 'yellow', 'green', 'blue'];

const ColorVariants = ({
  handleChoose,
  selectedColors
}:{
  selectedColors: any
  handleChoose: (value: string) => void | any
}) => {
  return (
    <Box display='flex' gridGap='4px' flexDirection='column'>
      <Box>Color type:</Box>
      <Box display='flex'>
        {
          colorVariants.map((el: string, i: number) => (
            <Box
              bg={el}
              gridGap='6px'
              width='20px'
              height='10px'
              borderRadius='10px'
              border={'1px solid'}
              onClick={() => handleChoose(el)}
              borderColor={selectedColors.includes(el) ? 'green' : 'white'} />
          ))
        }
      </Box>
    </Box>
  )
}

export const CreateCardComponent = ({ ref, onSubmit, initialData }:{ ref: any, initialData?: any, onSubmit: (data: any) => void }) => {
  const [data, setData] = useState(initialData || {
    text: null,
    selectedColors: []
  });
  
  const [error, setError]: any = useState(null);

  const handleChooseColor = (value: any) => {
    const selectedColors: any = data?.selectedColors;

    setData((prevData: any) => {
      if (selectedColors.includes(value)) {
        return { ...prevData, selectedColors: prevData.selectedColors.filter((el: any) => el !== value) }
      }
      return { ...prevData, selectedColors: [...prevData.selectedColors, value] }
    })
  }

  useEffect(() => {
    return () => setError('')
  }, [])
  
  return (
    <Box
      ref={ref}
      width='300px'
      display='flex'
      minHeight='inherit'
      flexDirection='column'
    >
      <Box display='flex' gridGap='8px' alignItems='flex-start' justifyContent='flex-start'>
      <TextComp value={data.text} onChange={(e) => setData({
        ...data,
        text: e.currentTarget.value
      })}/>
      <ColorVariants
        handleChoose={handleChooseColor}
        selectedColors={data?.selectedColors} />
      </Box>
      {
        error
        ? <Box color='red'>{error}</Box>
        : null
      }
      <Box margin='auto 0 0 0'>
        <input type='button' value='Submit' onClick={() => {
          if (data?.text && data?.selectedColors.length > 0) return onSubmit(data);
          return setError('Please fill label and choose color')
        }}/>
      </Box>
    </Box>
  );
}