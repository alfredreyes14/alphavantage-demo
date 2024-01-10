import { useState, useEffect } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/outline";
import {
  Badge,
  Card,
  Table as TremorTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import Pagination from "../Pagination";
import { ChartData } from '../../interface/ChartData';

type TableProp = {
  tableHeaders: string[],
  tableData: ChartData[],
  symbol: string
}

const Table = ({ tableHeaders, tableData }: TableProp): React.ReactNode => {
  const itemsPerPage: number = 10
  const [ offset, setOffset ]: [ number, Function ] = useState(0)
  const [ endOffset, setEndOffset ]: [ number, Function ] = useState(offset  + itemsPerPage)
  const [ data, setData ]: [ ChartData[], Function ] = useState(tableData)

  useEffect(() => {
    if (tableData.length < 1) return
    const displayData: ChartData[] = tableData.slice(offset, endOffset)
    setData(displayData)
  }, [ offset, endOffset, tableData ])
  
  return (
    <Card className="mt-5">
      <TremorTable className="mt-5">
        <TableHead>
          <TableRow>
            {tableHeaders.map((item: string, index: number): React.ReactNode => 
              <TableHeaderCell key={index}>{ item }</TableHeaderCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: ChartData): React.ReactNode => (
            <TableRow key={item.date}>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <Text>{item['5. volume'].toLocaleString()}</Text>
              </TableCell>
              <TableCell>
                <Badge color="red" icon={ArrowDownIcon}>
                  {item['3. low']}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge color="emerald" icon={ArrowUpIcon}>
                  {item['2. high']}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TremorTable>
      <Pagination
        setOffset={setOffset}
        setEndOffset={setEndOffset}
        itemsPerPage={itemsPerPage}
        pageCount={Math.ceil(tableData.length / itemsPerPage)}
        totalRecordLength={tableData.length}
      />
    </Card>
  )
}

export default Table