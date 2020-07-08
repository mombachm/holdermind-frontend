import Axios from "axios";
import { StockServiceURI } from "./settings/Settings";

enum StockRoute {
  GetStockInfo = "/getStockInfo"
}

export class StockService {

  public static async getStockinfo(): Promise<any> {
    const response = await Axios.get(StockServiceURI + StockRoute.GetStockInfo);
    return response.data;
  }
}
