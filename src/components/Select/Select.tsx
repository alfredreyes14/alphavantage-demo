import { Select as TremorSelect, SelectItem } from "@tremor/react";

type SelectProps = {
  timeFrame: string,
  setTimeFrame: any
}


const Select = ({ timeFrame, setTimeFrame }: SelectProps) => {
  return (
    <div className="flex space-y-6 mb-2">
      <TremorSelect value={timeFrame} onValueChange={setTimeFrame}>
        <SelectItem value="TIME_SERIES_WEEKLY">
          Weekly
        </SelectItem>
        <SelectItem value="TIME_SERIES_MONTHLY">
          Monthly
        </SelectItem>
      </TremorSelect>
    </div>
  )
}

export default Select