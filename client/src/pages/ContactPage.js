import React from "react";
import Layout from "./../components/Layout/Mylayout";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import contact from "../images/contact.jpeg"
const ContactPage = () => {
  return (
    <Layout title={"اتصل بنا - الزغبي"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={contact}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">اتصل بنا</h1>
          <p className="text-justify mt-2">
            في خدمتكم طول ايام الاسبوع 24 ساعة
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : ahmed@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 01012345567
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
