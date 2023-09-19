import styles from "./page.module.css";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className="">
          {process.env.NODE_ENV === "development" && (
            <Link href="/studio">
              <button>
                <EditIcon />
              </button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
