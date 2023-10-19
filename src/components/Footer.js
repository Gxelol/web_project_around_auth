import React from "react";

export default class Main extends React.Component {
  render() {
    return (
      <footer className="footer">
        <p className="copyright">
          &copy; <span className="footer__year">{document.querySelector(".footer__year").textContent = new Date().getFullYear()}</span> Around the U.S.
        </p>
      </footer>
    );
  }
}
