export const handleAdClick = (realAction?: () => void) => {
  // All malicious Monetag links and pop ads completely removed
  if (realAction) realAction();
};
