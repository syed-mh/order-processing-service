import sequelize from "@/config/database";
import Customer from "@/models/customer";
import Item from "@/models/item";
import Order from "@/models/order";
import OrderItem from "@/models/orderItem";
import { faker } from "@faker-js/faker";

const NUM_CUSTOMERS = 100;
const NUM_ITEMS = 1000;
const NUM_ORDERS = 200;

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });

    const customersData = Array.from({ length: NUM_CUSTOMERS }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
    }));

    const customers = await Customer.bulkCreate(customersData);

    const itemsData = Array.from({ length: NUM_ITEMS }).map(() => ({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
      inventory: faker.number.int({ min: 0, max: 200 }),
    }));

    const items = await Item.bulkCreate(itemsData);

    const ordersData = Array.from({ length: NUM_ORDERS }).map(() => ({
      customerId:
        customers[faker.number.int({ min: 0, max: NUM_CUSTOMERS - 1 })]
          .customerId,
      status: faker.helpers.arrayElement([
        "processing",
        "shipped",
        "delivered",
      ]),
    }));

    const orders = await Order.bulkCreate(ordersData);

    const orderItemsData = [];

    for (const order of orders) {
      const numOrderItems = faker.number.int({ min: 1, max: 5 });

      for (let i = 0; i < numOrderItems; i++) {
        const item = items[faker.number.int({ min: 0, max: NUM_ITEMS - 1 })];
        const quantity = faker.number.int({ min: 1, max: 5 });

        if (item.inventory >= quantity) {
          orderItemsData.push({
            orderId: order.orderId,
            itemId: item.itemId,
            quantity: quantity,
          });

          item.inventory -= quantity;
          await item.save();
        }
      }
    }

    await OrderItem.bulkCreate(orderItemsData);

    console.log("Database seeded successfully with randomized data");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
