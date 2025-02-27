import mongoose from "mongoose";
import { database_urls } from "../common/constant.js";
import "dotenv/config";
import { Employee } from "../../models/user.js";

const connectDB = async () => {
  try {
    (async function () {
      const dbUri = database_urls.connection + database_urls.db_name;
      const dbconnect = await mongoose.connect(dbUri, {});
      if (dbconnect) {
        const existingAdmin = await Employee.findOne({
          email: "admin@gmail.com",
        });
        if (!existingAdmin) {
          const userData = new Employee({
            firstName: "Admin",
            gender: "Male",
            phoneNumber: "1234567890",
            email: "admin@gmail.com",
            password: "admin123",
            role: "superAdmin",
            permissions: [
              "Dashboard",
              "POS",
              "Order",
              "Categories",
              "Items",
              "Modifiers",
              "Ingredients",
              "Expense Type",
              "Expenses",
              "Overall Report",
              "Employees",
              "Customers",
              "Expense Report",
            ],
          });
          await userData.save();
          console.log(`New Admin is Created`);
        }
      }
    })();
  } catch (error) {
    console.error("database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
