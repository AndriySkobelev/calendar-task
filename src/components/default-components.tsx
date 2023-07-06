import React, { useEffect, useRef, useState } from 'react';
import { Box } from '../ui';
import { download, upload } from '../icons';

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

export const ExportImport = (props: any) => {
  const [files, setFiles] = useState(null);
  const uploadRef: any = useRef(null);
  const handleChange = (upFiles: any) => {
    const fileReader = new FileReader();
    if (upFiles && upFiles.target) {
      fileReader.readAsText(upFiles.target.files[0], "UTF-8");
      fileReader.onload = (e: any) => {
        setFiles(e.target.result);
      };
    }
    
  };

  useEffect(() => {
    if (files !== null) {
      props?.uploadTasks(JSON.parse(files))
    }
  }, [files])

  const downloadFile = () => {
    const downloadData = props?.downloadData;
  
    const fileName = "my-file";
    const json = JSON.stringify(downloadData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
  
    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  return (
    <Box display='flex' gridGap='6px'>
      <Box width='20px' height='20px' onClick={downloadFile}>
        {download({ w: '15px', h: '15px' })}
      </Box>
      <Box
        position='relative'
        display='flex'
        width='20px'
        justifyContent='center'
        alignItems='center'
        height='20px'
      >
        <Box position='absolute'>
          {upload({ w: '15px', h: '15px' })}
        </Box>
        <input
          ref={uploadRef}
          onClick={(e: any) => handleChange(e?.target?.files)}
          type="file"
          style={{ opacity: '0', width: '20px', height: '20px'  }}
          onChange={handleChange} />
      </Box>
    </Box>
  )
}
