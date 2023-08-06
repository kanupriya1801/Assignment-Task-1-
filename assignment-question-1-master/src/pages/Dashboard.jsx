import { useState, useEffect } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const orders = mockData.results;
    const totalOrders = orders.length;
    setTotalOrders(totalOrders);
  }, []);

  const findOrderTimestamps = (orderID) => {
    const orderTimestamps = timestamps.results.find(
      (order) => order["&id"] === orderID
    );
    return orderTimestamps ? orderTimestamps.timestamps : null;
  };

  const handleSelectOrder = (selectedOrder) => {
    setSelectedOrderDetails(selectedOrder);
    const orderTimestamps = findOrderTimestamps(selectedOrder["&id"]);
    setSelectedOrderTimeStamps(orderTimestamps);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredOrders = mockData.results.filter((order) =>
    order["&id"].toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${totalOrders} order${totalOrders !== 1 ? 's' : ''}`} />
        <div className={styles.actionBox}>
          <Search value={searchText} onChange={handleSearchChange} />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
        {selectedOrderDetails && (
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
        )}
        {selectedOrderTimeStamps && (
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        )}
        </div>
        <List rows={filteredOrders} timestamps={timestamps} currency={currency} onSelectOrder={handleSelectOrder} />
      </div>
    </div>
  );
};

export default Dashboard;

