import { ethers } from 'ethers';

export function formatEtherValue(value: string): string {
  const numberValue = parseFloat(ethers.formatEther(value || "0"));
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2, // 2 decimal places
  }).format(numberValue);
}

export function formatValue(value: string): string {
  const numberValue = parseFloat(value);
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2, // 2 decimal places
  }).format(numberValue);
}
