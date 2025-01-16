export const setData = (key: string, data: any, expireIn: number) => {
  const cache = {
    data,
    expires: new Date().getTime() + expireIn,
  };

  localStorage.setItem(key, JSON.stringify(cache));
};

export const getData = (key: string) => {
  const currentTime = new Date().getTime();
  const string = localStorage.getItem(key.toLowerCase());

  if (!string) {
    return null;
  }

  const { data, expires } = JSON.parse(string);

  if (currentTime > new Date(expires).getTime()) {
    return null;
  }

  return data;
};
