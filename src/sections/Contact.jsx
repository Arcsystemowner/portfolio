import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiCheckCircle,
} from "react-icons/fi";

const initialForm = { name: "", email: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Invalid email";
  if (!form.message.trim()) errors.message = "Message is required";
  else if (form.message.trim().length < 10)
    errors.message = "Message too short";
  return errors;
}

const socials = [
  {
    icon: <FiMail size={20} />,
    label: "Email",
    value: "archityadav959@gmail.com",
    href: "mailto:archityadav959@gmail.com",
  },
  {
    icon: <FiLinkedin size={20} />,
    label: "LinkedIn",
    value: "linkedin.com/in/archit-yadav-bb0a47187",
    href: "https://linkedin.com/in/archit-yadav-bb0a47187",
  },
  {
    icon: <FiGithub size={20} />,
    label: "GitHub",
    value: "github.com/Arcsystemowner",
    href: "https://github.com/Arcsystemowner",
  },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSending(true);
    // Simulate send (integrate EmailJS here)
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
    setForm(initialForm);
  };

  const inputClass = (field) =>
    `w-full bg-white/5 border ${errors[field] ? "border-rose-500/60" : "border-white/10"}
     rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500
     focus:outline-none focus:border-primary-500/60 focus:bg-white/8
     transition-all duration-200`;

  return (
    <section id="contact" className="relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-primary-400 font-mono text-sm tracking-widest mb-2">
            05. CONTACT
          </p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full mb-4" />
          <p className="section-subtitle">
            Have a project in mind or just want to chat? I'd love to hear from
            you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-slate-400 leading-relaxed">
              I'm currently open to freelance opportunities and full-time roles.
              Whether you have a question or want to start a project together —
              drop me a message, I try to respond within 24 hours.
            </p>
            <div className="space-y-4">
              {socials.map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 card rounded-xl group"
                >
                  <div
                    className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20
                                  flex items-center justify-center text-primary-400
                                  group-hover:bg-primary-500/20 transition-colors"
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                    <p className="text-sm text-white font-medium">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-8 flex flex-col items-center justify-center text-center h-full min-h-[320px] gap-4"
              >
                <FiCheckCircle size={48} className="text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-slate-400">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline mt-2"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card p-7 space-y-5"
                noValidate
              >
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5 font-medium">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5 font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project or just say hi..."
                    className={inputClass("message") + " resize-none"}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
