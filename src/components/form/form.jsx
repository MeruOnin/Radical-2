import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "./input/Input";
import NormalBtn from "../butttons/Normal/NormalBtn";

const FormComponent = ({ inputs, btn, onSubmit }) => {
  const validationSchema = Yup.object(
    inputs.reduce((acc, input) => {
      acc[input.name] = input.validationSchema;
      return acc;
    }, {}),
  );

  const initialValues = inputs.reduce((acc, input) => {
    acc[input.name] = input.initialValue || "";
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {() => (
        <Form className="w-full max-w-sm mx-auto flex flex-col items-center">
          {/* eslint-disable-next-line react/prop-types */}
          {inputs.map((input, index) => (
            <div key={index}>
              <Input title={input.title} name={input.name} type={input.type} />
            </div>
          ))}
          <div className="mt-10">{btn}</div>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
