import { SearchIcon } from "@heroicons/react/solid";
import { TextInput } from "@tremor/react";
import { useState, useEffect } from "react";
import { getSymbolData } from "../../service/service";

type Props = {
  setSymbol: Function
}

const SearchBox = ({ setSymbol }: Props): React.ReactNode => {
  const [ searchText, setSearchText ]: [ string, Function ] = useState('')
  const abortController: AbortController = new AbortController();
  const handleOnSearchChange = (input: string): void => setSearchText(input)
  
  useEffect(() => {
    if (searchText === '') {
      setSymbol("IBM")
      return
    }
    
    let debounce: number
    debounce = setTimeout(async (): Promise<void> => {
      const response = await getSymbolData({
        function: 'SYMBOL_SEARCH',
        symbol: searchText,
        apikey: import.meta.env.VITE_API_KEY 
      })
      console.log(response)
    }, 500);
    
    return () => {
      clearTimeout(debounce)
      abortController.abort()
    }
  }, [ searchText ])

  return (
    <TextInput
      className="mb-2 w-5/12"
      icon={SearchIcon}
      placeholder="Search..."
      onValueChange={handleOnSearchChange}
      value={searchText}
    />
  )
}

export default SearchBox