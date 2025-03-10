import { getAllData, getDataById } from "../src/contollers/dataConroller.js";
import { getAllDataFromDB, getDataByIdFromDB } from "../src/models/dataModel.js";

// 🛠 Mock the database functions to avoid real DB calls
jest.mock("../src/models/dataModel.js");

describe("Data Controller Unit Tests", () => {
  
  /**
   * 📌 Test `getAllData`
   */
  it("should return all data", async () => {
    const mockData = [
      { id: 1, Brand: "Nike", Description: "Shoes", Price: 50.0 },
      { id: 2, Brand: "Adidas", Description: "Shirt", Price: 30.0 }
    ];

    getAllDataFromDB.mockResolvedValue(mockData); // Mock DB response

    const req = {};  // Fake request object
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; // Mock response object

    await getAllData(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: "Data retrieved successfully",
      data: mockData
    });
  });

  /**
   * 📌 Test `getDataById`
   */
  it("should return data by ID", async () => {
    const mockData = [{ id: 1, Brand: "Nike", Description: "Shoes", Price: 50.0 }];
    getDataByIdFromDB.mockResolvedValue(mockData);

    const req = { params: { id: 1 } };  
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; 

    await getDataById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: "Data retrieved successfully",
      data: mockData
    });
  });

  /**
   * 📌 Test `uploadData`
   */

});
