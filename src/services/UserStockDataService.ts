import Axios from "axios";

export enum StockControllerRoute {
  GetUserStockCodes = "/getUserStockCodes",
  AddUserStockCode = "/createStockCodeForUser",
  RemoveUserStockCode = "/deleteStockCodeFromUser"
}

export class UserStockDataService {

  public static async GetUserStockCodes(): Promise<any[]> {
    const response = await Axios.get(
      process.env.REACT_APP_HOLDERMIN_BACKEND_URI + StockControllerRoute.GetUserStockCodes
    );
    return response.data;
  }

  public static async addUserStockCode(stockCode: string): Promise<any> {
    const response = await Axios.post(
      process.env.REACT_APP_HOLDERMIN_BACKEND_URI + StockControllerRoute.AddUserStockCode, { code: stockCode }
    );
    return response.data;
  }

  public static async removeStockCodeFromUser(stockCode: string): Promise<any> {
    const response = await Axios.post(
      process.env.REACT_APP_HOLDERMIN_BACKEND_URI + StockControllerRoute.RemoveUserStockCode, { code: stockCode }
    );
    return response.data;
  }
}