export interface storageResponse {
  total: string;
  free: string;
  used: string;
}

export const getStoragePercentage = (data: storageResponse) => {
  const numData = {
    total: Number(data?.total.split(" ")[0]),
    free: Number(data?.free.split(" ")[0]),
    used: Number(data?.used.split(" ")[0]),
  };

  const usedPercentage = (numData.used / numData.total) * 100;

  return usedPercentage;
};
