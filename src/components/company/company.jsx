import React, { useState } from "react";
import * as Yup from "yup";
import Header from "../header/Header";
import FormComponent from "../form/form";
import NormalBtn from "../butttons/Normal/NormalBtn";
import BingForm from "../form/BigForm";
import BigInput from "../form/input/BigInput";
import { validateYupSchema } from "formik";

const CompanyInfo = () => {
  const [isChecked, setIsChecked] = useState([]);

  const InfoTemplate = ({ title, inputs, desc, descDisplay }) => {
    return (
      <div className="p-2 relative top-3">
        <header className="text-background-white text-3xl">
          <h2 className="mb-4 mt-10">{title}</h2>
        </header>
        <main>
          <span
            className={`${descDisplay} text-md bg-background-elm text-background-white rounded-full p-2`}
          >
            <i className="fa-solid fa-circle-info ml-2"></i>
            {desc}
          </span>
          {inputs}
        </main>
      </div>
    );
  };

  const inputFieldes = [
    [
      {
        title: "لوگو",
      },
      {
        title: "شعار",
      },
      {
        title: "رنگ",
      },
      {
        title: "المان های شخصیتی",
      },
      {
        title: "تبلیغات ",
      },
    ],
    [
      {
        title: "نام شرکت",
        name: "companyname",
        type: "text",
        validationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
      {
        title: "سال تاسیس کسب و کار",
        name: "yearofbi",
        type: "text",
        validationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
      {
        title: "سایز شرکت",
        name: "sizeofcompany",
        type: "text",
        validationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
      {
        title: "آدرس",
        name: "address",
        type: "text",
        validationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
      {
        title: "بازار شروع کار",
        name: "startedwork",
        type: "text",
        validationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
      {
        title: "بازار چشم انداز",
        name: "eyework",
        type: "text",
        validationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
      {
        title: "وبسایت",
        name: "website",
        type: "text",
        validationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
    ],
    [
      {
        title: "مهم ترین بخش این محصول چیه؟",
        name: "productimportant",
        type: "text",
        validationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
      {
        title: "در چه بخش از محصول خودتون را قوی تر می بینید؟",
        name: "strongers",
        type: "text",
        validationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
      {
        title: "مهم ترین رقیب برای بخش مهم محصول چه شرکتیه؟",
        name: "theenemy",
        type: "text",
        validationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
      {
        title: "بهترین کارکرد این محصول برای مشتری چیه؟",
        name: "forcustomers",
        type: "text",
        validationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
    ],
    [
      {
        title: "استراتژی بازاریابی",
        name: "strategy",
        type: "text",
        idationSchema: Yup.string().required("این فیلد اجباری است"),
        initialValue: "",
      },
    ],
  ];

  const handleCheck = (id) => {
    setIsChecked((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((checkedId) => checkedId !== id)
        : [...prevChecked, id]
    );
  };

  const CheckBox = ({ title, id }) => {
    return (
      <li className="relative top-4 m-1">
        <input
          type="checkbox"
          className="hidden"
          checked={isChecked.includes(id)}
          onChange={() => handleCheck(id)}
          name={title}
          id={id}
        />
        <label
          htmlFor={id}
          className={` text-background-white border-1 transition-all duration-200 hover:border-background-elm w-fit p-4 cursor-pointer rounded-xl ${
            isChecked.includes(id)
              ? "border-background-elm bg-background-elm"
              : "bg-background-elm2 border-background-elm2"
          }`}
        >
          {title}
        </label>
      </li>
    );
  };

  const HistoryOfCompany = () => {
    return (
      <InfoTemplate
        title={`سابقه شرکت`}
        desc={`کدوم یکی از موارد زیر رو برای محصول تون از قبل انجام دادید؟`}
        inputs={
          <ul className="flex justify-center flex-wrap mt-4 items-center">
            {inputFieldes[0].map((option, index) => (
              <CheckBox
                title={option.title}
                id={`option-${index + 1}`}
                key={index}
              />
            ))}
          </ul>
        }
      />
    );
  };

  const CompanyInformation = () => {
    return (
      <div className="relative top-10">
        <InfoTemplate
          title={`مشخصات شرکت`}
          descDisplay={`hidden`}
          inputs={
            <ul>
              <FormComponent inputs={inputFieldes[1]} />
            </ul>
          }
        />
      </div>
    );
  };

  const ProductCoordinates = () => {
    return (
      <>
        <InfoTemplate
          title={`مختصات محصول`}
          desc={`به سوالات زیر پاسخ ترجیحا کوتاه یا متوسط بدهید.`}
          inputs={<BingForm inputs={inputFieldes[2]} />}
        />
      </>
    );
  };

  const Strategy = () => {
    return (
      <>
        <InfoTemplate
          title={`استراتژی بازاریابی شما`}
          inputs={<BingForm inputs={inputFieldes[3]} />}
          desc={`هر مورد که بالا نمی شد توضیح بدید،در کنار بازاریابیتون بنویسید.`}
        />
      </>
    );
  };

  const PdfInput = () => {
    const [selectedFile, setSelectedFile] = useState("No file chosen");

    return (
      <InfoTemplate
        title={`ارسال پی دی اف`}
        desc={`یک فایل پی دی اف حاوی اطلاعات مورد نیاز ارسال کنید`}
        inputs={
          <form>
            <div class="flex flex-row items-center justify-evenly m-4">
              <input
                type="file"
                id="custom-input"
                onChange={(e) => setSelectedFile(e.target.files[0].name)}
                hidden
              />
              <label
                for="custom-input"
                class="block text-sm text-background-org mr-4 py-2 px-4
              rounded-md border-0 font-semibold bg-background-elm
              hover:bg-background-white transition-all duration-200 cursor-pointer"
              >
                <i className="fa-solid fa-paperclip ml-2"></i>
                انتخاب فایل
              </label>
              <label class="text-sm text-background-elm">{selectedFile}</label>
            </div>
          </form>
        }
      />
    );
  };

  return (
    <div className="rounded-3xl p-4 max-w-100 w-fit flex flex-col justify-center items-center absolute top-[30%] left-[50%] translate-x-[-50%] translate-y-[-10%]">
      <Header
        title={`رادیکال`}
        desc={`سابقه خود را در فعالیت شرکت های مختلف بنویسید`}
        content={
          <>
            <HistoryOfCompany />
            {/* <CompanyInformation /> */}
            <ProductCoordinates />
            <Strategy />
            <PdfInput />
            <FormComponent
              inputs={inputFieldes[1]}
              btn={<NormalBtn title={`ثبت اطلاعات`} />}
            />
          </>
        }
      />
    </div>
  );
};

export default CompanyInfo;
