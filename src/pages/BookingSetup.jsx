import founderLogo from "../assets/founder-logo.png";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Link2,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePrototype } from "../context/PrototypeContext";
import { Button } from "../components/UI";

export default function BookingSetup() {
  const navigate = useNavigate();
  const { bookingUrl, updateBookingUrl, startup } = usePrototype();

  const [link, setLink] = useState(bookingUrl || "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const validate = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && !!url.hostname;
    } catch {
      return false;
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const trimmedLink = link.trim();

    if (!validate(trimmedLink)) {
      setError("Enter a complete secure URL beginning with https://");
      return;
    }

    updateBookingUrl(trimmedLink);
    setSaved(true);
    setError("");

    navigate("/dashboard");
  };

  return (
    <div className="booking-setup-page">
      <div className="setup-top">
        <a className="brand" href="/login">
          <div className="brand-mark">
  <img src={founderLogo} alt="Blue Code - OS logo" />
</div>
          <div>
            <strong>Blue Code - OS</strong>
            <span>Meeting setup</span>
          </div>
        </a>
        <span className="step-count">REQUIRED SETUP</span>
      </div>

      <div className="setup-progress">
        <span style={{ width: "100%" }} />
      </div>

      <div className="setup-container">
        <div className="setup-step-kicker">
          <span>04</span> MEETING BOOKING
        </div>

        <h1>Let interested prospects book a conversation.</h1>

        <p className="setup-intro">
          Blue Code - OS does not create meetings on your behalf. Set up your own Calendly account, create a public booking page, and add that link here so interested prospects can choose a suitable time.
        </p>

        <div className="booking-setup-card">
          <div className="booking-illustration">
            <CalendarDays size={27} />
          </div>

          <h2>Use your own Calendly booking page</h2>
          <p>Create your account on Calendly, then share your personal scheduling URL with Blue Code - OS.</p>
          <div className="calendly-guide">
            <div className="calendly-guide-heading"><strong>Get started with Calendly</strong><a href="https://calendly.com/signup" target="_blank" rel="noreferrer">Visit the official Calendly website <ExternalLink size={14} /></a></div>
            <ol>
              <li><span>1</span><div><strong>Create your Calendly account</strong><small>Register using your work email at calendly.com.</small></div></li>
              <li><span>2</span><div><strong>Set up your booking page</strong><small>Create an event such as “20-minute discovery conversation” and choose your available hours.</small></div></li>
              <li><span>3</span><div><strong>Copy and add your personal link</strong><small>Copy the public URL from Calendly (for example, https://calendly.com/your-name) and paste it below.</small></div></li>
            </ol>
            <p className="calendly-help-note">When a prospect chooses a time using your link, Calendly handles the booking. You can use another secure scheduling service as well.</p>
          </div>

          <form onSubmit={submit}>
            <label className="field-label" htmlFor="booking-url">
              Booking URL
            </label>

            <div className="input-with-icon">
              <Link2 size={17} />
              <input
                id="booking-url"
                className="input"
                type="url"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setError("");
                }}
                placeholder="https://calendly.com/your-name/intro"
                required
              />
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <div className="form-note">
              <ShieldCheck size={16} />
              Your public scheduling URL is saved in this browser demo and can be included in meeting suggestions. Meeting creation, availability checks and bookings take place through your external scheduling service.
            </div>

            <Button
              type="submit"
              icon={ArrowRight}
              className="button-full"
            >
              Save and open dashboard
            </Button>
          </form>

          {saved && (
            <p className="booking-saved">
              <CheckCircle2 size={16} />
              Link saved.
            </p>
          )}
        </div>

        <p className="privacy-note">
          {startup.companyName ? `Workspace: ${startup.companyName}` : "Founder workspace"} · You can update this link later in Settings.
        </p>
      </div>
    </div>
  );
}
