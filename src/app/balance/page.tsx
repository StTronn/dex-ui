'use client';
import { useGetAccountBalances } from "@/api/useGetAccountBalances";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ethers } from "ethers";
import { MainNav } from "../liquidity/components/main-nav";
import { TopBar } from "../liquidity/components/top-bar";
import { formatNumber } from "@/utils";

const Balance = () => {
  return (
    <>
      <TopBar />
      <div className="grid gap-8 grid-cols-1 h-full px-4 py-6 lg:px-8 ">
        <Section title="Currency" description="Balances of User currencies holding">
          <OverviewBalance type="currency" />
        </Section>
        <Section title="Liquidity Tokens" description="Liquidity Tokens Held by user">
          <Overview type="currency" />
        </Section>

      </div>
    </>
  )
}

const Section = ({ title, description, children }: SectionProps) => (
  <div className="grid gap-4">
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

const Overview = ({ type }: OverviewProps) => {
  const { data, isLoading, isError, error } = useGetAccountBalances();
  console.log({ data })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  // We assume here that for liquidity type, you'll have another way to fetch data. 
  // For now, we focus on the currency type.
  if (type === "currency") {
    const balances = data.data;

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 col-span-2">
        {Object.keys(data.liquidity).map(currency => (
          <BalanceCard
            key={currency}
            title={`${currency.toUpperCase()} Balance`}
            balance={data.liquidity[currency]}
          />
        ))}
      </div>
    );
  }

  // Default return for liquidity type for now.
  return <div>Liquidity Overview</div>;
}

const OverviewBalance = ({ type }: OverviewProps) => {
  const { data, isLoading, isError, error } = useGetAccountBalances();
  console.log({ data })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  // We assume here that for liquidity type, you'll have another way to fetch data. 
  // For now, we focus on the currency type.
  if (type === "currency") {

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 col-span-2">
        {Object.keys(data.balances).map(currency => (
          <BalanceCard
            key={currency}
            title={`${currency.toUpperCase()} Balance`}
            balance={data.balances[currency]}
          />
        ))}
      </div>
    );
  }

  // Default return for liquidity type for now.
  return <div>Liquidity Overview</div>;
}

const BalanceCard = ({ title, balance }: BalanceCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{formatNumber(balance)}</div>
      {/* You can add more details here if needed */}
    </CardContent>
  </Card>
);

type BalanceProps = {
  title: string;
  description: string;
};


type SectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};


type OverviewProps = {
  type: 'currency' | 'liquidity';
};

type BalanceCardProps = {
  title: string;
  balance: string;
};

function formatNumberForUI(value) {
  // Convert to Number and then to string to remove leading zeros
  const nValue = parseFloat(value).toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

  if (nValue.indexOf('.') > -1 && nValue.split('.')[1] === '00') {
    return nValue.split('.')[0];  // Return value without redundant .00
  }

  return nValue;
}
export default Balance;
