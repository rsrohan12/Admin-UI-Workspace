export const formatPrice = (value: string) => {
  return `$${value ? parseFloat(value)?.toFixed(2) : '0.00'}`;
};

 export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

 export function convertSecondTimesToHoursAndMintues(seconds: number): { hours: number; minutes: number } {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes };
  }