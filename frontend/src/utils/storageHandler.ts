export interface storageResponse {
  total: string;
  free: string;
  used: string;
}

export const getStoragePercentage = ({
  total,
  free,
  used,
}: storageResponse) => {
  const numData = {
    total: Number(total.split(" ")[0]),
    free: Number(free.split(" ")[0]),
    used: Number(used.split(" ")[0]),
  };

  const usedPercentage = (numData.used / numData.total) * 100;

  return usedPercentage;
};
