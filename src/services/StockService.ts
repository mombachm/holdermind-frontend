import Axios from "axios";
import { StockServiceURI } from "./settings/Settings";

export enum StockControllerRoute {
  GetStocksInfo = "/getStocksInfo"
}

export class StockService {

  public static async getStocksInfo(stocksCode: string | string[]): Promise<any[]> {
    const response = await Axios.get(StockServiceURI + StockControllerRoute.GetStocksInfo, this.buildGetStocksInfoParameters(stocksCode));
    return response.data;
  }

  private static buildGetStocksInfoParameters(stocksCode: string | string[]) {
    let stocksCodeParam = stocksCode;
    if(Array.isArray(stocksCode)) {
      stocksCodeParam = stocksCode.join(",")
    }
    return {
      params: {
        stocksCode: stocksCodeParam
      }
    }
  }
}
