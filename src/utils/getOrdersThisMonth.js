import { endOfMonth, isWithinInterval, startOfMonth } from 'date-fns';

const getOrdersThisMonth = (orders) => {
  const now = new Date();
  const firstDay = startOfMonth(now);
  const lastDay = endOfMonth(now);

  return orders.filter((order) =>
    isWithinInterval(new Date(order.deliveryDate), {
      start: firstDay,
      end: lastDay
    })
  );
};

export default getOrdersThisMonth;
