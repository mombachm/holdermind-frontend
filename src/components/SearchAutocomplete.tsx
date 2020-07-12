import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StockService } from '../services/StockService';
import { Autocomplete, AutocompleteInputChangeReason } from "@material-ui/lab";

interface StockOption {
  symbol: string;
}

export default function SearchAutocomplete(props: any, context: any) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<StockOption[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [textFieldValue, setTextFieldValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState<StockOption | null>(null);

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const quotes = await StockService.searchStocks(textFieldValue);
      if (active && quotes) {
        setOptions(quotes);
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [textFieldValue]);

  const handleInputChange = (event: ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason) => {
    setTextFieldValue(value);
  };

  const handleSelectedOptionChange = (event: ChangeEvent<{}>, value: StockOption | null) => {
    setSelectedValue(value);
    props.onSelectedOptionChange(event, value);
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-autocomplete"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.symbol === value.symbol}
      getOptionLabel={(option) => option.symbol}
      filterOptions={(options) => options}
      options={options}
      loading={loading}
      inputValue={textFieldValue}
      onChange={handleSelectedOptionChange}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Código do Ativo"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}