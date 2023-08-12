'use client';
import {
  Card,
  Title,
  Text,
  LineChart,
} from "@tremor/react";

import { useState } from "react";
import { startOfYear, subDays } from "date-fns";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { useGetGraphData } from "@/api/useGraphData";

const data = [
  {
    Date: "04.05.2021",
    Price: 113.05,
    Volume: 21400410,
  },
  {
    Date: "05.05.2021",
    Price: 113,
    Volume: 29707270,
  },
  // ...
  {
    Date: "17.11.2022",
    Price: 95.32,
    Volume: 45187420,
  },
];

const dataFormatter = (number: number) => `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export default function LineChartTabs() {

  const [selectedPeriod, setSelectedPeriod] = useState("YTD");
  const [selectedIndex, setSelectedIndex] = useState(4);

  const { data: apiData, isLoading, isError } = useGetGraphData({
    from_currency: "INR",
    to_currency: "SGD",
    from_date: "2022-01-01",
    to_date: "2023-01-01",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !apiData) return <div>Error fetching data</div>;

  const data = apiData.data.map(item => ({
    Date: item.date,
    Price: parseFloat(item.value), // Assuming the value is a string representation of a float number
    fromCurrency: item.fromCurrency,
    toCurrency: item.toCurrency,
  }));

  console.log({ data })

  const getDate = (dateString: string) => {
    const [day, month, year] = dateString.split(".").map(Number);
    return new Date(year, month - 1, day);
  };

  const filterData = (startDate: Date, endDate: Date) =>
    data.filter((item) => {
      const currentDate = getDate(item.Date);
      return currentDate >= startDate && currentDate <= endDate;
    });

  const getFilteredData = (index: number) => {
    const indexMapper = ["1M", "2M", "6M", "YTD", "YTD"];
    const period = indexMapper[index];

    const lastAvailableDate = getDate(data[data.length - 1].Date);
    switch (period) {
      case "1M": {
        const periodStartDate = subDays(lastAvailableDate, 30);
        return filterData(periodStartDate, lastAvailableDate);
      }
      case "2M": {
        const periodStartDate = subDays(lastAvailableDate, 60);
        return filterData(periodStartDate, lastAvailableDate);
      }
      case "6M": {
        const periodStartDate = subDays(lastAvailableDate, 180);
        return filterData(periodStartDate, lastAvailableDate);
      }
      case "YTD": {
        const periodStartDate = startOfYear(lastAvailableDate);
        return filterData(periodStartDate, lastAvailableDate);
      }
      default:
        return data;
    }
  };

  return (
    <Card className="col-span-4">
      <Title>ETH-USD</Title>
      <Text>Daily share price of a fictive company</Text>
      <Tabs className="mt-10">
        <TabsList defaultValue="YTD">
          <TabsTrigger value="1M">1M</TabsTrigger>
          <TabsTrigger value={"2M"}>2M</TabsTrigger>
          <TabsTrigger value="6M">6M</TabsTrigger>
          <TabsTrigger value="YTD">YTD</TabsTrigger>
          <TabsTrigger value="MAX">Max</TabsTrigger>
        </TabsList>
        <TabsContent value="1M">
          <LineChart
            className="h-80 mt-8"
            data={getFilteredData(selectedIndex)}
            index="Date"
            categories={["Price"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
            showLegend={false}
            yAxisWidth={48}
          />
        </TabsContent>
        <TabsContent value="2M">
          <LineChart
            className="h-80 mt-8"
            data={getFilteredData(selectedIndex)}
            index="Date"
            categories={["Price"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
            showLegend={false}
            yAxisWidth={48}
          />
        </TabsContent>
        <TabsContent value="6M">
          <LineChart
            className="h-80 mt-8"
            data={getFilteredData(selectedIndex)}
            index="Date"
            categories={["Price"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
            showLegend={false}
            yAxisWidth={48}
          />
        </TabsContent>
        <TabsContent value="YTD">
          <LineChart
            className="h-80 mt-8"
            data={getFilteredData(selectedIndex)}
            index="Date"
            categories={["Price"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
            showLegend={false}
            yAxisWidth={48}
          />
        </TabsContent>
        <TabsContent value="MAX">
          <LineChart
            className="h-80 mt-8"
            data={getFilteredData(selectedIndex)}
            index="Date"
            categories={["Price"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
            showLegend={false}
            yAxisWidth={48}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
