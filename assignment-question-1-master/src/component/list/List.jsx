import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css"


const currencyExchangeRates = {
  USD: 1, // 1 USD is equivalent to 1 USD
  EUR: 0.85, // Exchange rate for USD to EUR
  GBP: 0.73, // Exchange rate for USD to GBP
  JPY: 110.23, // Exchange rate for USD to JPY
};

const List = ({ rows, timestamps, currency, onSelectOrder }) => {
  const convertToCurrency = (usdValue) => {
    const exchangeRate = currencyExchangeRates[currency] || 1;
    const convertedValue = usdValue * exchangeRate;
    return convertedValue.toFixed(2);
  };
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / USD</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row,index) => (
          <ListRow key={index} onClick={() => onSelectOrder(row)}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{getBuySellIndicator(row.executionDetails.buySellIndicator)}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{getOrderSubmitted(row["&id"])}</ListRowCell>
            <ListRowCell>{convertToCurrency(row.bestExecutionData.orderVolume.USD, currency)}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
  function getOrderSubmitted(orderID) {
    const orderTimestamp = timestamps.results.find(
      (order) => order["&id"] === orderID
    );
    return orderTimestamp ? orderTimestamp.timestamps.orderSubmitted : "N/A";
  }
  function getBuySellIndicator(indicator) {
    // Assuming the data has a different representation for "BUY" and "SELL"
    if (indicator === "buy") {
      return "BUY";
    } else if (indicator === "sell") {
      return "SELL";
    } else {
      // Handle other cases, or provide a default value if necessary
      return "BUYI";
    }
  }
};

export default List;
