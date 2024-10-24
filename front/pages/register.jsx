import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../css/Register.module.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registrado com sucesso!");
      router.push("/ferramentas");
    } catch (error) {
      alert("Erro ao registrar: " + error.message);
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
      <button className={styles.button} onClick={register}>
        Registrar
      </button>

      <p>
        Já tem uma conta?{" "}
        <Link href="/login">
          <span className={styles.link}>Entre aqui</span>
        </Link>
      </p>
    </div>
  );
}
