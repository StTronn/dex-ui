'use client';
import { useGetAccountBalances } from "@/api/useGetAccountBalances";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Balance = () => {
  return (
    <div className="grid gap-8 grid-cols-1 h-full px-4 py-6 lg:px-8 ">
      <Section title="Currency Balance" description="Balances of all your currency holdings">
        <Overview type="currency" />
      </Section>

      <Section title="Liquidity Balance" description="Top picks for you. Updated daily.">
        <Overview type="liquidity" />
      </Section>
    </div>
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 col-span-2">
        {Object.keys(balances).map(currency => (
          <BalanceCard
            key={currency}
            title={`${currency.toUpperCase()} Balance`}
            balance={balances[currency]}
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-4 w-4 text-muted-foreground"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{balance}</div>
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


export default Balance;
