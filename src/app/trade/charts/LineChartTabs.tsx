'use client';
import {
  Title,
  Text,
  LineChart,
} from "@tremor/react";
import { Card } from '@/components/ui/card'

import { useState } from "react";
import { startOfYear, subDays } from "date-fns";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { useGetGraphData } from "@/api/useGraphData";
import { useAtom } from "jotai";
import { selectedPairAtom } from "@/atoms/selectedPairAtom";


const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}`;

export default function LineChartTabs() {

  const [selectedPair] = useAtom(selectedPairAtom);
  const [token0, token1] = selectedPair.split('/');
  const [selectedPeriod, setSelectedPeriod] = useState("YTD");
  const [selectedIndex, setSelectedIndex] = useState(4);

  const { data: apiData, isLoading, isError } = useGetGraphData({
    from_currency: token0,
    to_currency: token1,
    from_date: "2023-08-30",
    to_date: '',
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !apiData) return <div>Error fetching data</div>;

  const data = apiData.data.map(item => ({
    Date: item.date,
    Price: parseFloat(item.value), // Assuming the value is a string representation of a float number
    fromCurrency: item.fromCurrency,
    toCurrency: item.toCurrency,
  }));


  const getDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const filterData = (startDate: Date, endDate: Date) =>
    data.filter((item) => {
      const currentDate = getDate(item.Date);
      return currentDate >= startDate && currentDate <= endDate;
    });

  const getFilteredData = (value: string) => {
    let periodStartDate: Date;

    const lastAvailableDate = getDate(data?.[0]?.Date);

    switch (value) {
      case "1M":
        return data;
      case "2M":
        return data;
      case "6M":
        return data;
      case "YTD":
        return data;
      case "MAX":
      default:
        return data;
    }

    const tempDate = data.filter(item => getDate(item.Date) >= periodStartDate);
    return tempDate;
  };

  return (

    <Tabs defaultValue="1M" className="col-span-6">
      <TabsList defaultValue="YTD">
        <TabsTrigger value={"1M"}>1M</TabsTrigger>
        <TabsTrigger value={"2M"}>2M</TabsTrigger>
        <TabsTrigger value={"6M"}>6M</TabsTrigger>
        <TabsTrigger value={"YTD"}>YTD</TabsTrigger>
        <TabsTrigger value={"MAX"}>Max</TabsTrigger>
      </TabsList>
      <Card className="mt-1">
        <TabsContent value="1M">
          <LineChart
            className="h-96 mt-8"
            data={data}
            index="Date"
            categories={["Price"]}
            colors={["emerald"]}
            valueFormatter={dataFormatter}
            autoMinValue
            showLegend={false}
            yAxisWidth={46}
          />
        </TabsContent>
        <TabsContent value="2M">
          <LineChart
            className="h-96 mt-8"
            data={data}
            index="Date"
            categories={["Price"]}
            colors={["emerald"]}
            valueFormatter={dataFormatter}
            autoMinValue
            showLegend={false}
            yAxisWidth={46}
          />
        </TabsContent>
        <TabsContent value="6M">
          <LineChart
            className="h-96 mt-8"
            data={data}
            index="Date"
            categories={["Price"]}
            colors={["emerald"]}
            valueFormatter={dataFormatter}
            showLegend={false}
            autoMinValue
            yAxisWidth={46}
          />
        </TabsContent>
        <TabsContent value="YTD">
          <LineChart
            className="h-96 mt-8"
            data={data}
            index="Date"
            categories={["Price"]}
            colors={["emerald"]}
            valueFormatter={dataFormatter}
            showLegend={false}
            autoMinValue
            yAxisWidth={46}
          />
        </TabsContent>
        <TabsContent value="MAX">
          <LineChart
            className="h-96 mt-8"
            data={data}
            index="Date"
            categories={["Price"]}
            colors={["emerald"]}
            valueFormatter={dataFormatter}
            showLegend={false}
            autoMinValue
            yAxisWidth={46}
          />
        </TabsContent>
        <div className="grid w-fit  py-2 px-12">
        </div>
      </Card>
    </Tabs>
  );
}
