import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@/config/database";
import Order from "@/models/order";
import Item from "@/models/item";

interface OrderItemAttributes {
  orderItemId: number;
  orderId: number;
  itemId: number;
  quantity: number;
}

interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, "orderItemId"> {}

class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public orderItemId!: number;
  public orderId!: number;
  public itemId!: number;
  public quantity!: number;
}

OrderItem.init(
  {
    orderItemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: { model: Order, key: "orderId" },
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: { model: Item, key: "itemId" },
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "OrderItem" }
);

export default OrderItem;
