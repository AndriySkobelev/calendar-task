import axios from 'axios';

export const requestFunc = async ({
  url,
  data,
  method
}: {
  data?: any,
  url: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'CREATE',
}) => {
  let resData = {};
  try {
    const res = await axios({
      url,
      data,
      method,
    }).then((resolve) => {
      resData = resolve?.data;
      return;
    });
    return resData;
  } catch(e){
    console.error(e)
  }
};
