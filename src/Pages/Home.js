import React from "react";

function Home({ goToPage }) {
  return (
    <div className="home-container">
      
      <nav className="navbar">
        <span className="navbar-logo">Eazy Bank</span>

        <div className="nav-links">
          <span onClick={() => goToPage("home")}>Home</span>
          {/* <span onClick={() => goToPage("login")}>Login</span> */}
          <span onClick={() => goToPage("create")}>Create</span>
          <span onClick={() => goToPage("deposit")}>Deposit</span>
          <span onClick={() => goToPage("withdraw")}>Withdraw</span>
          <span onClick={() => goToPage("alldata")}>All Data</span>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-left"></div>

        <div className="hero-right">
          <h1 className="bank-title">Eazy Bank</h1>

          <marquee className="home-marquee">
            Secure • Simple • Smart Banking Experience
          </marquee>

          <p className="bank-quote">
            “Banking made simple, because your trust matters.”
          </p>

          <button
            className="get-started-btn"
            onClick={() => goToPage("create")}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;