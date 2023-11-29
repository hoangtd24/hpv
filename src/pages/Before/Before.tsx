import { CircularProgress, Modal } from "@mui/material";
import axios from "axios";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import bgSurvey from "../../assets/images/truoc-hoi-thao/background-truoc-hoi-thao-01.jpg";
import sendbtn from "../../assets/images/truoc-hoi-thao/button-gui.png";
import head1 from "../../assets/images/truoc-hoi-thao/headline-1.png";
import head2 from "../../assets/images/truoc-hoi-thao/headline-2.png";
import head3 from "../../assets/images/truoc-hoi-thao/headline-3.png";
import head4 from "../../assets/images/truoc-hoi-thao/headline-4.png";
import head5 from "../../assets/images/truoc-hoi-thao/headline-5.png";
import beforeSur from "../../assets/images/truoc-hoi-thao/khao-sat-TRUOC-hoi-thao.png";
import { data, listAge } from "../../data";
import styles from "./Before.module.scss";
import Loading from "../../component/loading/Loading";

const cx = classNames.bind(styles);

interface formValues {
  question1: number;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string[];
  question7: string[];
  question8: string;
  question9: string;
  question10: string;
  question11: string;
  event: string;
}

const Before = () => {
  const [headlineAns1, setHeadlineAns1] = useState<string[]>([]);
  const [headlineAns2, setHeadlineAns2] = useState<string[]>([]);
  const [headlineAns3, setHeadlineAns3] = useState<string[]>([]);
  const [district, setDistrict] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imgLoaded, setImgLoaded] = useState<boolean>(true);

  const { register, handleSubmit } = useForm<formValues>();
  const handleCheck = (
    ans: string[],
    setAns: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    const checked = ans.includes(value);
    if (checked) {
      const ans6 = ans.filter((ans) => ans !== value);
      setAns(ans6);
    } else {
      setAns([...ans, value]);
    }
  };

  function unique(arr: string[]) {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) === -1) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }
  const handleSurvey = async (data: formValues) => {
    const dataSurvey = {
      ...data,
      question1: String(data.question1),
      question4: data.question4 ? data.question4 : "",
      question5: data.question5 ? data.question5 : "",
      question6: headlineAns1.join(","),
      question7: headlineAns2.join(","),
      question8: data.question8 ? data.question8 : "",
      question9: headlineAns3.join(","),
      question10: "",
      question11: "",
      question12: "trước hội thảo",
      event: "Tuyên truyền cộng đồng về HPV",
    };

    setLoading(true);
    await axios
      .post("https://api.landingpage.tcgh.com.vn/api/survey", dataSurvey)
      .then((res) => {
        if (res.status === 200) {
          window.location.replace(
            "https://hpv.vn?utm_source=OfflineEvent&utm_medium=QR&utm_campaign=Women-Union&utm_term=2122023&utm_product=GSL&category=UN"
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // useEffect(() => {
  //   const timeId = setTimeout(() => setImgLoaded(true), 2000);
  //   return clearTimeout(timeId);
  // });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>VÉN MÀN NGÀN THẮC MẮC VỀ HPV KHẢO SÁT TRƯỚC HỘI THẢO</title>
        <meta name="description" content="Trước " />
        <link rel="canonical" href="https://hpv.tcgh.com.vn/before" />
      </Helmet>
      {imgLoaded && <Loading />}
      <div style={{ visibility: imgLoaded ? "hidden" : "visible" }}>
        <div className={cx("background-survey")}>
          <img alt="background-seminar" src={bgSurvey} />
        </div>
        <div className={cx("container")}>
          <div className={cx("header")}>
            <img
              src={beforeSur}
              alt="seminar-name"
              className={cx("seminar-img")}
              onLoad={() => setImgLoaded(false)}
            />
            <form onSubmit={handleSubmit(handleSurvey)} id="form_survey_before">
              <div className={cx("info-user")}>
                <div className={cx("provide-field")}>
                  <label>Tuổi của bạn:</label>
                  <div className={cx("age-select")}>
                    <select
                      placeholder=""
                      defaultValue=""
                      {...register("question1")}
                      id="#age"
                    >
                      <option value={""}>Tuổi</option>
                      {listAge.map((data) => (
                        <option value={data} key={data}>
                          {data}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={cx("provide-field")}>
                  <label>Nơi cư trú :</label>
                  <div className={cx("wrapper-select")}>
                    <select
                      placeholder="Huyện"
                      defaultValue=""
                      {...register("question2")}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                      }}
                    >
                      <option value="" data-default>
                        Huyện
                      </option>
                      {unique(data.map((item) => item.district)).map(
                        (district) => (
                          <option value={district} key={district}>
                            {district}
                          </option>
                        )
                      )}
                    </select>
                    <div className={cx("arrow-down")}></div>
                  </div>
                  <div className={cx("wrapper-select")}>
                    <select
                      placeholder="Phường/Xã"
                      defaultValue={""}
                      {...register("question3")}
                    >
                      <option value="" data-default>
                        Phường/Xã
                      </option>
                      {data
                        .filter((item) => item.district === district)
                        .map((item2) => (
                          <option key={item2.wardcode}>{item2.ward}</option>
                        ))}
                    </select>
                    <div className={cx("arrow-down")}></div>
                  </div>
                </div>
                <div className={cx("job-field")}>
                  <label htmlFor="" className={cx("current-job")}>
                    Công việc hiện tại :
                  </label>
                  <div className={cx("job-option")}>
                    <div className={cx("job-title")}>
                      <input
                        value="Học sinh/Sinh viên"
                        type="radio"
                        {...register("question4")}
                        id="#student"
                      />
                      <label htmlFor="#student">Học sinh/Sinh viên</label>
                    </div>
                    <div className={cx("job-title")}>
                      <input
                        type="radio"
                        {...register("question4")}
                        value={"Thành viên hội phụ nữ"}
                        id="#girl"
                      />
                      <label htmlFor="#girl">Thành viên hội phụ nữ</label>
                    </div>
                    <div className={cx("job-title")}>
                      <input
                        type="radio"
                        {...register("question4")}
                        value={"Giáo viên"}
                        id="#teacher"
                      />
                      <label htmlFor="#teacher">Giáo viên</label>
                    </div>
                    <div className={cx("job-title")}>
                      <input
                        type="radio"
                        {...register("question4")}
                        value={"Khác"}
                        id="#different"
                      />
                      <label htmlFor="#different">Khác</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("headline-1")}>
                <img
                  src={head1}
                  alt="headline-1"
                  className={cx("headline-1-img")}
                />
                <div className={cx("headline-1-options")}>
                  <div className={cx("wrapper-label")}>
                    <label>Chưa có thông tin</label>
                    <label>Đã tìm hiểu và nắm rõ</label>
                  </div>
                  <div className={cx("survey_user")}>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question5")}
                        value={"0"}
                        id="#s1"
                      />
                      <label htmlFor="#s1"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question5")}
                        value={"1"}
                        id="#s2"
                      />
                      <label htmlFor="#s2"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question5")}
                        value={"2"}
                        id="#s3"
                      />
                      <label htmlFor="#s3"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question5")}
                        value={"3"}
                        id="#s4"
                      />
                      <label htmlFor="#s4"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question5")}
                        value={"4"}
                        id="#s5"
                      />
                      <label htmlFor="#s5"></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("headline-2")}>
                <img
                  src={head2}
                  alt="headline-2"
                  className={cx("headline-2-img")}
                />
                <div className={cx("headline-2-options")}>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      checked={headlineAns1.includes("Qua quan hệ tình dục")}
                      onClick={() =>
                        handleCheck(
                          headlineAns1,
                          setHeadlineAns1,
                          "Qua quan hệ tình dục"
                        )
                      }
                      onChange={() => {}}
                      id="#h11"
                    />
                    <label htmlFor="#h11">Qua quan hệ tình dục</label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      checked={headlineAns1.includes("Lây truyền mẹ sang con")}
                      onClick={() =>
                        handleCheck(
                          headlineAns1,
                          setHeadlineAns1,
                          "Lây truyền mẹ sang con"
                        )
                      }
                      onChange={() => {}}
                      id="#h12"
                    />
                    <label htmlFor="#h12">Lây truyền mẹ sang con</label>
                  </div>
                  <div className={cx("job-title-special")}>
                    <input
                      type="radio"
                      checked={headlineAns1.includes(
                        "Tiếp xúc với vật dụng chứa dịch tiết cơ thể của người nhiễm HPV"
                      )}
                      onClick={() =>
                        handleCheck(
                          headlineAns1,
                          setHeadlineAns1,
                          "Tiếp xúc với vật dụng chứa dịch tiết cơ thể của người nhiễm HPV"
                        )
                      }
                      onChange={() => {}}
                      style={{ position: "relative", marginTop: "-4px" }}
                      id="#h13"
                    />
                    <label htmlFor="#h13">
                      Tiếp xúc với vật dụng chứa
                      <br />
                      dịch tiết cơ thể của người nhiễm HPV
                    </label>
                  </div>
                </div>
              </div>
              <div className={cx("headline-3")}>
                <img
                  src={head3}
                  alt="headline-3"
                  className={cx("headline-3-img")}
                />
                <div className={cx("headline-3-options")}>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      checked={headlineAns2.includes("Ung thư hầu họng")}
                      onClick={() =>
                        handleCheck(
                          headlineAns2,
                          setHeadlineAns2,
                          "Ung thư hầu họng"
                        )
                      }
                      onChange={() => {}}
                      id="#h21"
                    />
                    <label htmlFor="#h21">Ung thư hầu họng</label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      checked={headlineAns2.includes("Ung thư cổ tử cung (Nữ)")}
                      onClick={() =>
                        handleCheck(
                          headlineAns2,
                          setHeadlineAns2,
                          "Ung thư cổ tử cung (Nữ)"
                        )
                      }
                      onChange={() => {}}
                      id="#h22"
                    />
                    <label htmlFor="#h22">Ung thư cổ tử cung (Nữ)</label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      checked={headlineAns2.includes("Mụn cóc sinh dục")}
                      onClick={() =>
                        handleCheck(
                          headlineAns2,
                          setHeadlineAns2,
                          "Mụn cóc sinh dục"
                        )
                      }
                      onChange={() => {}}
                      id="#h23"
                    />
                    <label htmlFor="#h23">Mụn cóc sinh dục</label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      checked={headlineAns2.includes("Ung thư dương vật")}
                      onClick={() =>
                        handleCheck(
                          headlineAns2,
                          setHeadlineAns2,
                          "Ung thư dương vật"
                        )
                      }
                      onChange={() => {}}
                      id="#h24"
                    />
                    <label htmlFor="#h24">Ung thư dương vật</label>
                  </div>
                </div>
              </div>
              <div className={cx("headline-4")}>
                <img
                  src={head4}
                  alt="headline-4"
                  className={cx("headline-4-img")}
                />
                <div className={cx("headline-4-options")}>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      {...register("question8")}
                      value={"HPV chỉ gây bệnh ở nữ giới"}
                      id="#h31"
                    />
                    <label htmlFor="#h31">HPV chỉ gây bệnh ở nữ giới</label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      {...register("question8")}
                      value={"Dự phòng HPV càng sớm càng tốt"}
                      id="#h32"
                    />
                    <label htmlFor="#h32">Dự phòng HPV càng sớm càng tốt</label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      {...register("question8")}
                      value={"HPV gây ra nhiều bệnh khác nhau"}
                      id="#h33"
                    />
                    <label htmlFor="#h33">
                      HPV gây ra nhiều bệnh khác nhau
                    </label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      {...register("question8")}
                      value={
                        "Độ tuổi thích hợp để bắt đầu dự phòng HPV từ 9 tuổi"
                      }
                      id="#h34"
                    />
                    <label htmlFor="#h34">
                      Độ tuổi thích hợp để bắt đầu dự phòng HPV từ 9 tuổi
                    </label>
                  </div>
                </div>
              </div>
              <div className={cx("headline-5")}>
                <img
                  src={head5}
                  alt="headline-5"
                  className={cx("headline-5-img")}
                />
                <div className={cx("headline-5-options")}>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      value={
                        "Sử dụng bao cao su khi quan hệ tình dục sẽ tránh được HPV"
                      }
                      checked={headlineAns3.includes(
                        "Sử dụng bao cao su khi quan hệ tình dục sẽ tránh được HPV"
                      )}
                      id="#h41"
                      onClick={() =>
                        handleCheck(
                          headlineAns3,
                          setHeadlineAns3,
                          "Sử dụng bao cao su khi quan hệ tình dục sẽ tránh được HPV"
                        )
                      }
                      onChange={() => {}}
                    />
                    <label htmlFor="#h41">
                      Sử dụng bao cao su khi quan hệ tình dục sẽ tránh được HPV
                    </label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      value={"Dự phòng HPV sớm giảm nguy cơ lây nhiễm HPV"}
                      id="#h42"
                      checked={headlineAns3.includes(
                        "Dự phòng HPV sớm giảm nguy cơ lây nhiễm HPV"
                      )}
                      onClick={() =>
                        handleCheck(
                          headlineAns3,
                          setHeadlineAns3,
                          "Dự phòng HPV sớm giảm nguy cơ lây nhiễm HPV"
                        )
                      }
                      onChange={() => {}}
                    />
                    <label htmlFor="#h42">
                      Dự phòng HPV sớm giảm nguy cơ lây nhiễm HPV
                    </label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      value={
                        "Sau khi đã bị nhiễm HPV thì sẽ không bị nhiễm lại"
                      }
                      id="#h43"
                      checked={headlineAns3.includes(
                        "Sau khi đã bị nhiễm HPV thì sẽ không bị nhiễm lại"
                      )}
                      onClick={() =>
                        handleCheck(
                          headlineAns3,
                          setHeadlineAns3,
                          "Sau khi đã bị nhiễm HPV thì sẽ không bị nhiễm lại"
                        )
                      }
                      onChange={() => {}}
                    />
                    <label htmlFor="#h43">
                      Sau khi đã bị nhiễm HPV thì sẽ không bị nhiễm lại
                    </label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      value={"HPV chỉ lây qua đường quan hệ tình dục"}
                      id="#h44"
                      checked={headlineAns3.includes(
                        "HPV chỉ lây qua đường quan hệ tình dục"
                      )}
                      onClick={() =>
                        handleCheck(
                          headlineAns3,
                          setHeadlineAns3,
                          "HPV chỉ lây qua đường quan hệ tình dục"
                        )
                      }
                      onChange={() => {}}
                    />
                    <label htmlFor="#h44">
                      HPV chỉ lây qua đường quan hệ tình dục
                    </label>
                  </div>
                </div>
              </div>
              <div className={cx("outtro")}>
                <span>
                  Nội dung này được Hội Y học Dự phòng Việt Nam cung cấp, phối
                  hợp với Hội Phụ Nữ tỉnh Hải Dương và được MSD tài trợ vì mục
                  đích giáo dục
                </span>
                <span>VN-GSL-00474 28112025</span>
              </div>
              <button
                className={cx("send_btn", "btn_send_before")}
                id="btn_send_before"
                type="submit"
              >
                <img
                  src={sendbtn}
                  alt="send_btn"
                  className={cx("pointer-event-none")}
                />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Modal
        open={loading}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress color="success" size={64} />
      </Modal>
    </>
  );
};

export default Before;
