import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
// ui
import { Box } from '../ui';
// icons
import { download, upload, downloadImage } from '../icons';
///////////////////////////////////////////////////////////////////////////////////////////////////

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
  };

  const downloadCalendarImage = () => {
    html2canvas(props?.calendarRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'calendar.png';
      link.click();
    });
  };


  return (
    <Box display='flex' gridGap='10px'>
      <Box width='20px' height='20px' onClick={downloadFile} title='Download JSON' >
        {download({ w: '20px', h: '20px' })}
      </Box>
      <Box
        width='20px'
        display='flex'
        height='20px'
        position='relative'
        alignItems='center'
        justifyContent='center'
        title='Upload JSON'
      >
        <Box position='absolute'>
          {upload({ w: '20px', h: '20px' })}
        </Box>
        <input
          ref={uploadRef}
          onClick={(e: any) => handleChange(e?.target?.files)}
          type="file"
          style={{ opacity: '0', width: '20px', height: '20px'  }}
          onChange={handleChange} />
      </Box>
      <Box title='Download Image' onClick={downloadCalendarImage}>
        {downloadImage({ w: '20px', h: '20px' })}
      </Box>
    </Box>
  )
}

export default ExportImport;
