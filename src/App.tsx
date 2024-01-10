import { useState, useEffect } from 'react'

import './App.css'
import { Card, Title, LineChart } from "@tremor/react";
import { getSymbolData } from './service/service';
import Table from './components/Table';
import Select from './components/Select';
import { ChartData } from './interface/ChartData';

function App(): React.ReactNode {
  const [ chartData, setChartData ]: [ ChartData[], Function ] = useState([])
  const [ highestValue, setHighestValue ]: [ number, Function] = useState(200)
  const [ symbol ]: [ string, Function ] = useState("IBM")
  const [ timeFrame, setTimeFrame ]: [ string, Function ] = useState('TIME_SERIES_WEEKLY')
  const [ tableHeaders, setTableHeaders ]: [ string[], Function ] = useState([])
  // const [ title, setTitle ]: [ string, Function ] = useState("")

  const formatApiResponse = (data: any) => {
    const keys: string[] = Object.keys(data)
    const chartDataKey: string = keys[1]
    const processedData: ChartData[] = []
    for (const key in data[chartDataKey]) {
      processedData.push({
        date: key,
        ...data[chartDataKey][key]
      })
    }

    const highestNumber: number = Math.max(...processedData.map(item => parseFloat(item['4. close'])))
    setChartData(processedData)
    processTableHeaders(processedData)
    setHighestValue(Math.ceil(highestNumber))
  }

  const processTableHeaders = (processedData: any): void => {
    const toBeDisplayedHeaders = [
      'date',
      'high',
      'low',
      'volume'
    ]
    const { date, ...rest } = processedData[0]
    const objectKeys: string[] = Object.keys(rest)
    const processedKeys: string[] = objectKeys.map(item => item.split('.')[1].trim())
    processedKeys.push('date')
    const reversedHeader = processedKeys.reverse()
    setTableHeaders(reversedHeader.filter((item: string): boolean => toBeDisplayedHeaders.includes(item)))
  }


  useEffect(() => {
    (async () => {
      const response = await getSymbolData({ apikey: import.meta.env.VITE_API_KEY, symbol, function: timeFrame })
      if (response.data.length === 0) {
        setChartData([])
        return
      }
      formatApiResponse(response.data)
    })();

    return () => {
      setChartData([])
    }
  }, [ symbol, timeFrame ])

  return (
    <>
      <div className="flex justify-between">
        <div></div>
        <Select
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
        />
      </div>
      <Card>
        <Title>IBM (USD)</Title>
        <LineChart
          className="mt-4 h-96"
          data={chartData}
          index="date"
          maxValue={highestValue}
          categories={["1. open", "4. close"]}
          colors={["emerald", "red"]}
        />
      </Card>
      <Table
        tableHeaders={tableHeaders}
        tableData={chartData}
        symbol={symbol}
      />
    </>
  )
}

export default App
