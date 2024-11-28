import { useState } from "react";
import BaseDataTable from "../shared/BaseDataTable";
import { BalanceSheetRow } from "./BalanceSheetRow";
import { BalanceSheetEntry } from "./types";

const mockData: BalanceSheetEntry[] = [
  {
    id: "1",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    asset: "FRAX",
    network: "Fraxtal",
    quantity: 51000.00,
    exchangeRate: 0.9965,
    value: 50821.50
  },
  {
    id: "2",
    address: "0x2345678901abcdef2345678901abcdef23456789",
    asset: "sFRAX",
    network: "Fraxtal",
    quantity: 920000.00,
    exchangeRate: 1.0875,
    value: 1000000.00
  },
  {
    id: "3",
    address: "0x3456789012abcdef3456789012abcdef34567890",
    asset: "USDC",
    network: "Fraxtal",
    quantity: 48828.00,
    exchangeRate: 1.0000,
    value: 48828.00
  },
  {
    id: "4",
    address: "0x4567890123abcdef4567890123abcdef45678901",
    asset: "dUSD/FRAX Curve LP",
    network: "Fraxtal",
    quantity: 500000.00,
    exchangeRate: 1.0000,
    value: 500000.00
  },
  {
    id: "5",
    address: "0x5678901234abcdef5678901234abcdef56789012",
    asset: "dUSD (unallocated)",
    network: "Ethereum",
    quantity: 400000.00,
    exchangeRate: 1.0000,
    value: 400000.00
  },
  {
    id: "6",
    address: "0x6789012345abcdef6789012345abcdef67890123",
    asset: "FRAX",
    network: "Fraxtal",
    quantity: 75000.00,
    exchangeRate: 0.9965,
    value: 74737.50
  },
  {
    id: "7",
    address: "0x7890123456abcdef7890123456abcdef78901234",
    asset: "sFRAX",
    network: "Fraxtal",
    quantity: 150000.00,
    exchangeRate: 1.0875,
    value: 163125.00
  }
];

const BalanceSheetTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: value >= 1000000 ? 'compact' : 'standard'
    }).format(value);
  };

  const formatQuantity = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatExchangeRate = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    }).format(value);
  };

  const formatDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <BaseDataTable
      data={mockData}
      columns={["address", "asset", "network", "quantity", "exchangeRate", "value"]}
      renderRow={(entry) => (
        <BalanceSheetRow
          key={entry.id}
          entry={entry}
          formatQuantity={formatQuantity}
          formatExchangeRate={formatExchangeRate}
          formatValue={formatValue}
        />
      )}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      title="Balance Sheet Details"
      formatDate={formatDate}
    />
  );
};

export default BalanceSheetTable;