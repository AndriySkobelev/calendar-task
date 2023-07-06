import React, { ReactNode } from 'react';
// components
import { Box } from '../ui';
///////////////////////////////////////////////////////////////////////////////////////////////////

export const ModalComponent = ({
  isOpen,
  onClose,
  modalData
}:{
  actions?: any;
  modalData: {
    actions?: any,
    component: ReactNode
  } | any,
  isOpen: boolean,
  onClose: () => void,
}) => {
  const component: ReactNode = modalData?.component || <Box>empty</Box>;
  const modalTitle = modalData?.title || <Box>empty</Box>;
  return (
    <>
      {
        isOpen
          ? (
            <Box
              zIndex='1'
              top='auto'
              left='auto'
              right='auto'
              bottom='auto'
              width='100%'
              height='100vh'
              bg='#8F8F8D59'
              display='flex'
              position='absolute'
              alignItems='center'
              justifyContent='center'
              // onClick={() => onClose()}
            >
              <Box
                bg='white'
                padding='8px'
                display='flex'
                borderRadius='10px'
                minWidth='200px'
                minHeight='150px'
                maxHeight='400px'
                flexDirection='column'
              >
                <Box display='flex' justifyContent='space-between'>
                  <Box>
                    {modalTitle || ''}
                  </Box>
                  <Box onClick={() => onClose()}>{'X'}</Box>
                </Box>
                  <Box minHeight='inherit'>
                    {
                      component
                      ? component
                      : null
                    }
                  </Box>
              </Box>
            </Box>
          )
          : null
      }
    </>
  );
}