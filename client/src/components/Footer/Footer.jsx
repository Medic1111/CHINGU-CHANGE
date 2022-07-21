import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <small className={classes.small}>
        Copyrights {new Date().getFullYear()}
      </small>
    </footer>
  );
};

export default Footer;
