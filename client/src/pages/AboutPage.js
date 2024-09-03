import React from "react";
import Layout from "./../components/Layout/Mylayout";
import about from "../images/about.jpeg"
const AboutPage = () => {
  return (
    <Layout title={"من نحن - الزغبي"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={about}
            alt="الزغبي للاثاث"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            مجموعة الزغبي للاثاث نسعي دوما لتقديم منتجات عاليات الجودة و تحديث اساليبنا حسب احدث الطرق العالمية هدفنا هو ارضاء جميع عملائنا
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
