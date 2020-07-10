// import '@material/list/dist/mdc.list.css';
// import './DonationList.css';
import React, { useState, useEffect, forwardRef } from "react";
import { StockService } from "../services/StockService";
import MaterialTable, { Column, Icons } from "material-table";
// import { List, ListItem, ListItemGraphic, ListItemText, ListItemPrimaryText, ListItemSecondaryText, ListItemMeta } from '@rmwc/list';
// import { Donation } from '../../models/Donation';
// import { DonationService } from '../../services/DonationService';
// import { DonationIntention } from '../../models/DonationIntention';
// import { DonationIntentionService } from '../../services/DonationIntentionService';
// import { DonationItemService } from '../../services/DonationItemService';
// import { Link } from 'react-router-dom';
// import FolderIcon from '@material-ui/icons/Folder';
import AddIcon from "@material-ui/icons/Add";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { MainFormatter } from "../formatters/MainFormatter";

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

interface TableState {
  columns: Array<Column<any>>;
  data: Array<any>;
}

const StocksTable: React.FC = () => {
  const [stocksCode, setStocksCode] = useState<string[]>([
    "FLRY3",
    "EGIE3",
    "ITSA4",
    "CNTO3",
  ]);
  const [tableState, setTableState] = useState<TableState>({
    columns: [
      { title: "Código", field: "symbol", type: "string" },
      {
        title: "Variação (%)",
        field: "regularMarketChangePercent",
        type: "numeric",
        render: rowData => MainFormatter.formatDecimalValue(rowData.regularMarketChangePercent)
      },
      {
        title: "Valor de Mercado (R$)",
        field: "regularMarketPrice",
        type: "numeric",
        render: rowData => MainFormatter.formatDecimalValue(rowData.regularMarketPrice)
      },
      {
        title: "Dividend Yield (%)",
        field: "dividendYield",
        type: "numeric",
        render: rowData => MainFormatter.formatDecimalValue(rowData.dividendYield)
      },
      {
        title: "Dividend Yield Passado Anual (%)",
        field: "trailingAnnualDividendYield",
        type: "numeric",
        render: rowData => MainFormatter.formatPercentValue(rowData.trailingAnnualDividendYield)
      },
      {
        title: "P/L Passado",
        field: "trailingPE",
        type: "numeric",
        render: rowData => MainFormatter.formatDecimalValue(rowData.trailingPE)
      },
      {
        title: "P/L Futuro",
        field: "forwardPE",
        type: "numeric",
        render: rowData => MainFormatter.formatDecimalValue(rowData.forwardPE)
      },
      {
        title: "ROA (%)",
        field: "returnOnAssets",
        type: "numeric",
        render: rowData => MainFormatter.formatPercentValue(rowData.returnOnAssets)
      },
      {
        title: "ROE (%)",
        field: "returnOnEquity",
        type: "numeric",
        render: rowData => MainFormatter.formatPercentValue(rowData.returnOnEquity)
      }
    ],
    data: [],
  });

  async function fetchStocks(): Promise<void> {
    const stocksDataPromises: any[] = stocksCode.map(async stockCode => {
      return await StockService.getStockMainInfo(stockCode);
    });
    Promise.all(stocksDataPromises).then((stocksData) => {
      setTableState((prevState) => {
        return { ...prevState, data: stocksData };
      });
    });
  }

  const saveStockInfoItem = async (stockInfoItem: any): Promise<void> => {
    if (stockInfoItem.symbol && !isStockCodeAlreadyInTable(stockInfoItem.symbol)) {
      setStocksCode((prevState) => {
        return [...prevState, stockInfoItem.symbol];
      })
    }
  };

  const deleteStockInfoItem = async (oldStockInfoItem: any): Promise<void> => {
    debugger;
    if (oldStockInfoItem.symbol) {
      removeStockCodeFromStocksCodeState(oldStockInfoItem.symbol);
    }
  };

  const isStockCodeAlreadyInTable = (stockCode: string): boolean => {
    return Boolean(
      getStockInfoInTable(stockCode)
    );
  };

  const getStockInfoInTable = (stockCode: string): any => {
    return stocksCode.find((code) => {
      return stockCode.includes(code);
    })
  };

  const removeStockCodeFromStocksCodeState = (stockCode: string): void  => {
    const newStocksCode = stocksCode.filter((code) => {
      return !stockCode.includes(code);
    })
    setStocksCode(newStocksCode);
  };

  useEffect(() => {
    fetchStocks();
  }, [stocksCode]);

  return (
    <div className="MaterialTable-div">
      <MaterialTable
        options={{
          paging: false,
        }}
        icons={tableIcons}
        title="Ações"
        columns={tableState.columns}
        data={tableState.data}
        editable={{
          onRowAdd: (newData) => {
            return saveStockInfoItem(newData);
          },
          onRowDelete: oldData => {
            return deleteStockInfoItem(oldData);
          },
        }}
      />
    </div>
  );
};

export default StocksTable;
