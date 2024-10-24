import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import styles from "../css/Home.module.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleFerramentasClick = () => {
    if (user) {
      router.push("/ferramentas");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Bem-vindo!</h1>
      <button className={styles.button} onClick={handleFerramentasClick}>
        Ferramentas
      </button>
    </div>
  );
}
