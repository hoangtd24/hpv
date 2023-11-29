import { useEffect, useState } from "react";
import styles from "./Redirect.module.scss";
import classNames from "classnames/bind";
import backgroundThank from "../../assets/images/truoc-hoi-thao/background-truoc-hoi-thao-cam-on.jpg";
import qr from "../../assets/images/truoc-hoi-thao/redirectbefore.png";

const cx = classNames.bind(styles);
const Redirect = () => {
  const [countdown, setCountDown] = useState<number>(3);
  useEffect(() => {
    const timerId = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.location.replace(
        "https://hpv.vn?utm_source=OfflineEvent&utm_medium=QR&utm_campaign=Women-Union&utm_term=2122023&utm_product=GSL&category=UN"
      );
    }, 3000);
  }, []);
  return (
    <div
      className={cx("thank")}
      style={{ backgroundImage: `url(${backgroundThank})` }}
    >
      <div className={cx("thank-content")}>
        <span className={cx("text-thank")}>
          Cảm ơn bạn đã dành thời gian tham gia <br /> chương trình và trả lời
          câu hỏi .<br /> Bạn có thể tìm hiểu thêm thông tin <br /> về virus HPV
          thông qua đường link hpv.vn .<br /> Thời gian chuyển hướng giảm xuống
          còn {countdown} giây
        </span>
        <img src={qr} alt="qr-code" className={cx("qr-code")} />
      </div>
    </div>
  );
};

export default Redirect;
