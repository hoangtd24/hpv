import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);
const Loading = () => {
  return (
    <div aria-label="Loading..." role="status" className={cx("wrapper")}>
      <div className={cx("loader")}></div>
    </div>
  );
};

export default Loading;
