import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import styles from "../css/Ferramentas.module.css";

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function Ferramentas() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/register");
      } else {
        setUserEmail(user.email);

        axios
          .get("http://localhost:3000/ferramentas")
          .then((response) => {
            setItems(response.data);
          })
          .catch((error) => {
            console.error("Erro ao obter as ferramentas:", error);
          });
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      <h1 className={styles.container}>Lista de Ferramentas</h1>
      <ul className={styles.list}>
        {items.map((ferramenta, index) => (
          <li key={index}>
            {ferramenta.nome}
            {userEmail === adminEmail && ` - ${ferramenta.img}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
