import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <header class="site-header">
    <a class="logo" href="#">Fina</a>
    <nav class="nav">
      <a href="#features">Features</a>
      <a href="#cta">Get started</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <p class="eyebrow">Landing page prototype</p>
      <h1>Clarity for your money, without the spreadsheet.</h1>
      <p class="lead">
        Fina helps you see spending, savings, and goals in one calm dashboard—built for
        people who want control, not complexity.
      </p>
      <div class="hero-actions">
        <button type="button" class="btn btn-primary" id="demo-cta">Try the demo</button>
        <a class="btn btn-ghost" href="#features">See how it works</a>
      </div>
      <p class="demo-status" id="demo-status" aria-live="polite"></p>
    </section>

    <section class="features" id="features">
      <article class="card">
        <h2>Unified view</h2>
        <p>Connect accounts once and track balances and cash flow in real time.</p>
      </article>
      <article class="card">
        <h2>Smart goals</h2>
        <p>Set targets for travel, emergency funds, or debt payoff with gentle nudges.</p>
      </article>
      <article class="card">
        <h2>Private by design</h2>
        <p>Your data stays encrypted. No ads, no selling your financial history.</p>
      </article>
    </section>

    <section class="cta" id="cta">
      <h2>Ready when you are</h2>
      <p>Join the waitlist—this prototype is your sandbox for iterating on the story.</p>
      <form class="waitlist" id="waitlist-form">
        <label class="sr-only" for="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" required />
        <button type="submit" class="btn btn-primary">Join waitlist</button>
      </form>
      <p class="form-message" id="form-message" aria-live="polite"></p>
    </section>
  </main>

  <footer class="site-footer">
    <p>© ${new Date().getFullYear()} Fina prototype. Not financial advice.</p>
  </footer>
`;

document.getElementById("demo-cta")?.addEventListener("click", () => {
  const status = document.getElementById("demo-status");
  if (status) {
    status.textContent =
      "Demo activated — you’re viewing a sample dashboard snapshot (prototype only).";
  }
});

document.getElementById("waitlist-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("email");
  const message = document.getElementById("form-message");
  const email = input instanceof HTMLInputElement ? input.value.trim() : "";
  if (!message) return;
  if (!email) {
    message.textContent = "Please enter a valid email.";
    return;
  }
  message.textContent = `Thanks! We’ll reach out at ${email} when early access opens.`;
  if (input instanceof HTMLInputElement) input.value = "";
});
