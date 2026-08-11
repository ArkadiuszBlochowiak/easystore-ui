import PageTitle from "../../../components/heading/PageTitle";
import { useEffect, useRef } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";

export default function Contact() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    console.log(actionData);
    console.log(formRef.current);
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Your message has been submitted successfully!");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userConfirmed = window.confirm(
      "Are you sure you want to submit the form?",
    );

    if (userConfirmed) {
      const formData = new FormData(formRef.current);
      submit(formData, { method: "POST" });
    } else {
      toast.info("Form submittion cancelled");
    }
  };

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";

  return (
    <div className="grow max-w-6xl min-h-213 mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      {/* Page Title */}
      <PageTitle title="Contact Us" />
      {/* Contact Info */}
      <p className="max-w-3xl mx-auto mt-8 text-gray-600 dark:text-lighter mb-8 text-center">
        We’d love to hear from you! If you have any questions, feedback, or
        suggestions, please don’t hesitate to reach out.
      </p>

      {/* Contact Form */}
      <Form
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-6 max-w-3xl mx-auto"
      >
        {/* Name Field */}
        <div>
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={30}
          />
          {actionData?.errors?.name && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.name}
            </p>
          )}
        </div>

        {/* Email and mobile Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Your email"
              className={textFieldStyle}
              required
            />
            {actionData?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.email}
              </p>
            )}
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobileNumber" className={labelStyle}>
              Mobile number
            </label>
            <input
              name="mobileNumber"
              type="tel"
              required
              pattern="^\d{9}$"
              title="Mobile number must be exactly 9 digits"
              placeholder="Your mobile number"
              className={textFieldStyle}
            />
            {actionData?.errors?.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.mobileNumber}
              </p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className={labelStyle}>
            Message
          </label>
          <textarea
            name="message"
            rows="4"
            placeholder="Your message"
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={500}
          ></textarea>
          {actionData?.errors?.message && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </Form>
    </div>
  );
}
