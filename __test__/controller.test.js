import Controller from "../src/utils/Controller";

describe("Controller", () => {
  describe("getAll", () => {
    it("should return all records from the model", async () => {
      const mockModel = {
        findAll: jest.fn().mockResolvedValue([
          { id: 1, name: "Record 1" },
          { id: 2, name: "Record 2" },
        ]),
      };
      const controller = new Controller("Test", mockModel);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should handle error if fetching records fails", async () => {
      const mockModel = {
        findAll: jest.fn().mockRejectedValue(new Error("Database error")),
      };
      const controller = new Controller("Test", mockModel);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("getOne", () => {
    it("should return a single record from the model", async () => {
      const mockModel = {
        findOne: jest.fn().mockResolvedValue({ id: 1, name: "Record 1" }),
      };
      const controller = new Controller("Test", mockModel);

      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.getOne(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should handle error if fetching a single record fails", async () => {
      const mockModel = {
        findOne: jest.fn().mockRejectedValue(new Error("Database error")),
      };
      const controller = new Controller("Test", mockModel);

      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.getOne(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("createOne", () => {
    it("should create a new record in the model", async () => {
      const mockModel = {
        create: jest.fn().mockResolvedValue({ id: 1, name: "New Record" }),
      };
      const controller = new Controller("Test", mockModel);

      const req = { body: { name: "New Record" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.createOne(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should handle error if creating a record fails", async () => {
      const mockModel = {
        create: jest.fn().mockRejectedValue(new Error("Database error")),
      };
      const controller = new Controller("Test", mockModel);

      const req = { body: { name: "New Record" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.createOne(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("bulkCreate", () => {
    it("should create multiple records in the model", async () => {
      const mockModel = {
        bulkCreate: jest.fn().mockResolvedValue([
          { id: 1, name: "Record 1" },
          { id: 2, name: "Record 2" },
        ]),
      };
      const controller = new Controller("Test", mockModel);

      const req = { body: [{ name: "Record 1" }, { name: "Record 2" }] };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.bulkCreate(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should handle error if bulk creating records fails", async () => {
      const mockModel = {
        bulkCreate: jest.fn().mockRejectedValue(new Error("Database error")),
      };
      const controller = new Controller("Test", mockModel);

      const req = { body: [{ name: "Record 1" }, { name: "Record 2" }] };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.bulkCreate(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("updateOne", () => {
    it("should update a single record in the model", async () => {
      const mockModel = {
        update: jest.fn().mockResolvedValue([1]), // Mocking affected rows count
      };
      const controller = new Controller("Test", mockModel);

      const req = { params: { id: 1 }, body: { name: "Updated Record" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.updateOne(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should handle error if updating a record fails", async () => {
      const mockModel = {
        update: jest.fn().mockRejectedValue(new Error("Database error")),
      };
      const controller = new Controller("Test", mockModel);

      const req = { params: { id: 1 }, body: { name: "Updated Record" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.updateOne(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
