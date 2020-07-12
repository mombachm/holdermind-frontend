import Axios from "axios";

export enum StockControllerRoute {
  GetStocksInfo = "/getStocksInfo",
  GetStockMainInfo = "/getStockMainInfo",
}

export class StockService {
  public static async getStocksInfo(
    stocksCode: string | string[]
  ): Promise<any[]> {
    const response = await Axios.get(
      process.env.REACT_APP_STOCK_SERVICE_URI + StockControllerRoute.GetStocksInfo,
      this.buildGetStocksInfoParameters(stocksCode)
    );
    return response.data;
  }

  public static async getStockMainInfo(
    stockCode: string
  ): Promise<any | null> {
    const response = await Axios.get(
      process.env.REACT_APP_STOCK_SERVICE_URI + StockControllerRoute.GetStockMainInfo,
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
