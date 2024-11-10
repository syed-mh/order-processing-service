import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@/config/database";
import Customer from "@/models/customer";

interface OrderAttributes {
  orderId: number;
  customerId: number;
  status: "processing" | "shipped" | "delivered";
}

interface OrderCreationAttributes
  extends Optional<OrderAttributes, "orderId" | "status"> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public orderId!: number;
  public customerId!: number;
  public status!: "processing" | "shipped" | "delivered";
}

Order.init(
  {
    orderId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Customer, key: "customerId" },
    },
    status: {
      type: DataTypes.ENUM("processing", "shipped", "delivered"),
      defaultValue: "processing",
    },
  },
  { sequelize, modelName: "Order" }
);

export default Order;
