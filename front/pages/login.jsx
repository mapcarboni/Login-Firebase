import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../css/Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado com sucesso!");
      router.push("/ferramentas");
    } catch (error) {
      alert("Erro ao logar: " + error.message);
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.formDiv}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.formDiv}>
        <label className={styles.label}>Senha</label>
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.button} onClick={logIn}>
        Login
      </button>

      <p>
        Não tem uma conta?{" "}
        <Link href="/register">
          <span className={styles.link}>Registre-se aqui</span>
        </Link>
      </p>
    </div>
  );
}
