import style from "./Layout.module.css"
import Link from "next/link"

export default function Layout({ children }) {
  return (
    <>
      <header className={style.header}>
        <div className={style.left}>
          <Link href="/">BotoFood</Link>
        </div>
        <div className={style.rigth}>
          <Link href="/menu">Menu</Link>
          <Link href="/categories">Categories</Link>
        </div>
      </header>
      <div className={style.container}>
        {children}
      </div>
      <footer className={style.footer}>
        <a href="https://botostart.ir" target="_blank" rel="noreferrer">
          Botostart
        </a>
        
      </footer>
    </>
  )
}
