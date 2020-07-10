import Axios from "axios";
import { StockServiceURI } from "./settings/Settings";

export enum StockControllerRoute {
  GetStocksInfo = "/getStocksInfo",
  GetStockMainInfo = "/getStockMainInfo",
}

export class StockService {
  public static async getStocksInfo(
    stocksCode: string | string[]
  ): Promise<any[]> {
    const response = await Axios.get(
      StockServiceURI + StockControllerRoute.GetStocksInfo,
      this.buildGetStocksInfoParameters(stocksCode)
    );
    return response.data;
  }

  public static async getStockMainInfo(
    stockCode: string
  ): Promise<any | null> {
    const response = await Axios.get(
      StockServiceURI + StockControllerRoute.GetStockMainInfo,
      {
        params: {
          stockCode: stockCode,
        },
      }
    );
    if(response.data) {
      return response.data;
    }
    return null;
  }

  private static buildGetStocksInfoParameters(stocksCode: string | string[]) {
    let stocksCodeParam = stocksCode;
    if (Array.isArray(stocksCode)) {
      stocksCodeParam = stocksCode.join(",");
    }
    return {
      params: {
        stocksCode: stocksCodeParam,
      },
    };
  }
}
