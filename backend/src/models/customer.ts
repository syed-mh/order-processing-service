import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@/config/database";

interface CustomerAttributes {
  customerId: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "customerId"> {}

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public customerId!: number;
  public name!: string;
  public email!: string;
  public phone?: string;
  public address?: string;
}

Customer.init(
  {
    customerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, unique: true },
    address: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "Customer" }
);

export default Customer;
