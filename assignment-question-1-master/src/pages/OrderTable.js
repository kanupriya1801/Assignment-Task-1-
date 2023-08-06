import React from "react";

const OrderTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Submitted Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr key={order["&id"]}> 
            <td>{order.id}</td>
            <td>{order.product}</td>
            <td>{order.quantity}</td>
            <td>{order.submitted_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default OrderTable;