import { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mh8anwa",   // 🔴 your service ID
        "template_l1wrhjj",   // 🔴 your template ID
        form.current,
        "1is2TvfZtRyWbncE5"       // 🔴 your public key
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        () => {
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <section id="contact" className="py-24 px-4">
      <h2 className="text-4xl font-bold text-center mb-8">
        Contact Me
      </h2>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="max-w-xl mx-auto space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full p-3 rounded bg-white/80 dark:bg-white/10"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full p-3 rounded bg-white/80 dark:bg-white/10"
        />

        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          className="w-full p-3 rounded bg-white/80 dark:bg-white/10"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
