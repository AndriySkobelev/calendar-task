import React, { useState, createContext } from 'react';
// components
import { ModalComponent } from '../components/modalComp';
///////////////////////////////////////////////////////////////////////////////////////////////////

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }:{ children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    component: null,
    actions: null
  });
  const valueProvider: {
    setOpen: () => void,
    setModalData: () => void} | any = {
    setOpen,
    setModalData
  };
  return (
    <ModalContext.Provider value={valueProvider}>
      <ModalComponent modalData={modalData} isOpen={open} onClose={() => setOpen(false)} />
      {children}
    </ModalContext.Provider>
  );
}
