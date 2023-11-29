import { CircularProgress, Modal } from "@mui/material";
import axios from "axios";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import backgroundSeminar from "../../assets/images/sau-hoi-thao/background-SAU-hoi-thao-01.jpg";
import sendbtn from "../../assets/images/sau-hoi-thao/button-gui.png";
import headline1 from "../../assets/images/sau-hoi-thao/headline-1.png";
import headline10 from "../../assets/images/sau-hoi-thao/headline-10.png";
import headline2 from "../../assets/images/sau-hoi-thao/headline-2.png";
import headline3 from "../../assets/images/sau-hoi-thao/headline-3.png";
import headline4 from "../../assets/images/sau-hoi-thao/headline-4.png";
import headline5 from "../../assets/images/sau-hoi-thao/headline-5.png";
import headline6 from "../../assets/images/sau-hoi-thao/headline-6.png";
import headline7 from "../../assets/images/sau-hoi-thao/headline-7.png";
import headline8 from "../../assets/images/sau-hoi-thao/headline-8.png";
import headline9 from "../../assets/images/sau-hoi-thao/headline-9.png";
import seminar from "../../assets/images/sau-hoi-thao/khao-sat-SAU-hoi-thao.png";
import { data, listAge } from "../../data";
import styles from "./After.module.scss";
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
  question13: number;
  question14: string;
  question15: string;
  question16: string;
  question17: string;
  event: string;
}

const After = () => {
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
      question11: data.question11 ? data.question11 : "",
      question12: "sau hội thảo",
      question13: data.question13 ? data.question13 : "",
      question14: data.question14 ? data.question14 : "",
      question15: data.question15 ? data.question15 : "",
      question16: data.question16 ? data.question16 : "",
      question17: data.question17 ? data.question17 : "",
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
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

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
          <img src={backgroundSeminar} alt="background-seminar" />
        </div>
        <div className={cx("container")}>
          <div className={cx("header-after")}>
            <img
              src={seminar}
              alt="seminar-name"
              className={cx("seminar-img")}
              onLoad={() => setImgLoaded(false)}
            />
            <form
              onSubmit={handleSubmit(handleSurvey)}
              className={cx("form")}
              id="form_survey_after"
            >
              <div className={cx("info-user")}>
                <div className={cx("provide-field")}>
                  <label>Tuổi của bạn :</label>
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
                  src={headline1}
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
                  src={headline2}
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
                  src={headline3}
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
                  src={headline4}
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
                  src={headline5}
                  alt="headline-5"
                  className={cx("headline-5-img")}
                />
                <div className={cx("headline-5-options")}>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
                      checked={headlineAns3.includes(
                        "Sử dụng bao cao su khi quan hệ tình dục sẽ tránh được HPV"
                      )}
                      onClick={() =>
                        handleCheck(
                          headlineAns3,
                          setHeadlineAns3,
                          "Sử dụng bao cao su khi quan hệ tình dục sẽ tránh được HPV"
                        )
                      }
                      id="#h41"
                      onChange={() => {}}
                    />
                    <label htmlFor="#h41">
                      Sử dụng bao cao su khi quan hệ tình dục sẽ tránh được HPV
                    </label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
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
                      id="#h42"
                      onChange={() => {}}
                    />
                    <label htmlFor="#h42">
                      Dự phòng HPV sớm giảm nguy cơ lây nhiễm HPV
                    </label>
                  </div>
                  <div className={cx("job-title")}>
                    <input
                      type="radio"
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
                      {...register("question9")}
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
              <div className={cx("headline-6")}>
                <img
                  src={headline6}
                  alt="headline-6"
                  className={cx("headline-6-img")}
                />
                <div className={cx("headline-6-options")}>
                  <div className={cx("wrapper-label")}>
                    <label>Chưa hiểu rõ</label>
                    <label>Rất đầy dủ</label>
                  </div>
                  <div className={cx("survey_user")}>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question13")}
                        value={"0"}
                        id="#61"
                      />
                      <label htmlFor="#61"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question13")}
                        value={"1"}
                        id="#62"
                      />
                      <label htmlFor="#62"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question13")}
                        value={"2"}
                        id="#63"
                      />
                      <label htmlFor="#63"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question13")}
                        value={"3"}
                        id="#64"
                      />
                      <label htmlFor="#64"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question13")}
                        value={"4"}
                        id="#65"
                      />
                      <label htmlFor="#65"></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("headline-7")}>
                <img
                  src={headline7}
                  alt="headline-7"
                  className={cx("headline-7-img")}
                />
                <div className={cx("headline-7-options")}>
                  <div className={cx("wrapper-label")}>
                    <label>Chưa mong muốn</label>
                    <label>Rất mong muốn</label>
                  </div>
                  <div className={cx("survey_user")}>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question14")}
                        value={"0"}
                        id="#71"
                      />
                      <label htmlFor="#71"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question14")}
                        value={"1"}
                        id="#72"
                      />
                      <label htmlFor="#72"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question14")}
                        value={"2"}
                        id="#73"
                      />
                      <label htmlFor="#73"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question14")}
                        value={"3"}
                        id="#74"
                      />
                      <label htmlFor="#74"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question14")}
                        value={"4"}
                        id="#75"
                      />
                      <label htmlFor="#75"></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("headline-8")}>
                <img
                  src={headline8}
                  alt="headline-8"
                  className={cx("headline-8-img")}
                />
                <div className={cx("headline-8-options")}>
                  <div className={cx("wrapper-label")}>
                    <label>Không cảm thấy</label>
                    <label>Hoàn toàn đồng ý</label>
                  </div>
                  <div className={cx("survey_user")}>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question15")}
                        value={"0"}
                        id="#81"
                      />
                      <label htmlFor="#81"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question15")}
                        value={"1"}
                        id="#82"
                      />
                      <label htmlFor="#82"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question15")}
                        value={"2"}
                        id="#83"
                      />
                      <label htmlFor="#83"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question15")}
                        value={"3"}
                        id="#84"
                      />
                      <label htmlFor="#84"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question15")}
                        value={"4"}
                        id="#85"
                      />
                      <label htmlFor="#85"></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("headline-9")}>
                <img
                  src={headline9}
                  alt="headline-9"
                  className={cx("headline-9-img")}
                />
                <div className={cx("headline-9-options")}>
                  <div className={cx("wrapper-label")}>
                    <label>Chưa sẵn sàng</label>
                    <label>Rất sẵn sàng</label>
                  </div>
                  <div className={cx("survey_user")}>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question16")}
                        value={"0"}
                        id="#91"
                      />
                      <label htmlFor="#91"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question16")}
                        value={"1"}
                        id="#92"
                      />
                      <label htmlFor="#92"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question16")}
                        value={"2"}
                        id="#93"
                      />
                      <label htmlFor="#93"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question16")}
                        value={"3"}
                        id="#94"
                      />
                      <label htmlFor="#94"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question16")}
                        value={"4"}
                        id="#95"
                      />
                      <label htmlFor="#95"></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("headline-10")}>
                <img
                  src={headline10}
                  alt="headline-10"
                  className={cx("headline-10-img")}
                />
                <div className={cx("headline-10-options")}>
                  <div className={cx("wrapper-label")}>
                    <label>Chưa có ý định</label>
                    <label>Rất sẵn sàng</label>
                  </div>
                  <div className={cx("survey_user")}>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question17")}
                        value={"0"}
                        id="#101"
                      />
                      <label htmlFor="#101"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question17")}
                        value={"1"}
                        id="#102"
                      />
                      <label htmlFor="#102"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question17")}
                        value={"2"}
                        id="#103"
                      />
                      <label htmlFor="#103"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question17")}
                        value={"3"}
                        id="#104"
                      />
                      <label htmlFor="#104"></label>
                    </div>
                    <div className={cx("wrapper-survey-user")}>
                      <input
                        type="radio"
                        {...register("question17")}
                        value={"4"}
                        id="#105"
                      />
                      <label htmlFor="#105"></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("outtro")}>
                <span>
                  Nội dung này được Hội Y học Dự phòng Việt Nam cung cấp, phối
                  hợp với Hội Phụ Nữ tỉnh Hải Dương và được MSD tài trợ vì mục
                  đích giáo dục
                </span>
                <span>VN-GSL-00473 28112025</span>
              </div>
              <button
                className={cx("send_btn", "btn_send_after")}
                id="btn_send_after"
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

export default After;
