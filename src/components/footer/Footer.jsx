import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Built with
      <FontAwesomeIcon
        icon={faHeart}
        className={styles["footer-icon"]}
        aria-hidden="true"
      />
      by
      <a
        href="https://github.com/ArkadiuszBlochowiak"
        target="_blank"
        rel="noreferrer"
      >
        ArkadiuszBlochowiak
      </a>
    </footer>
  );
}
