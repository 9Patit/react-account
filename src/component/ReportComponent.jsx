import { useContext } from "react";
import DataContext from "../data/DataContext";
import "./ReportComponent.css";

const ReportComponent = () => {
  const { income, expense } = useContext(DataContext);
  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
  return (
    <div>      
      <div className="balance">
        <h4>คงเหลือ {formatNumber((income - expense).toFixed(2))}฿</h4>        
      </div>
      <div className="report-container">
        <div>
          <h4>รายรับ</h4>
          <p className="report plus">{formatNumber(income)}฿</p>
        </div>
        <div>
          <h4>รายจ่าย</h4>
          <p className="report minus">{formatNumber(expense)}฿</p>
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
