import Order from "@/models/order";
import OrderItem from "@/models/orderItem";
import Item from "@/models/item";
import Customer from "@/models/customer";

Order.belongsTo(Customer, { foreignKey: "customerId", onDelete: "SET NULL" });
Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });

OrderItem.belongsTo(Order, { foreignKey: "orderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Item, { foreignKey: "itemId", onDelete: "CASCADE" });

export { Order, OrderItem, Item, Customer };
