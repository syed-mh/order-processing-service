import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@/config/database";

interface ItemAttributes {
  itemId: number;
  name: string;
  price: number;
  inventory: number;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, "itemId"> {}

class Item
  extends Model<ItemAttributes, ItemCreationAttributes>
  implements ItemAttributes
{
  public itemId!: number;
  public name!: string;
  public price!: number;
  public inventory!: number;
}

Item.init(
  {
    itemId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    inventory: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { sequelize, modelName: "Item" }
);

export default Item;
