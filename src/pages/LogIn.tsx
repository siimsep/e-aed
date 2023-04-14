import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const history = useHistory();
  const [alert] = useIonAlert();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const SignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        // Signed in
        // Handle successful login
        const user = userCredential.user;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("email", user.email);
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("isLogin", "true");
        history.push("/tab2");
        return true;
      })
      .catch(async (error) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const errorCode = error.code;
        const errorMessage = error.message;

        await alert({
          header: "Error Signing In",
          message: errorMessage,
          buttons: ["OK"],
        });
      });
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Logi sisse</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonItem>
          <IonInput
            value={email}
            placeholder="Sisesta e-mail"
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            value={password}
            type="password"
            placeholder="Sisesta parool"
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonButton onClick={() => SignIn()}>Logi sisse</IonButton>
        <br />
        <br />
        <IonButton color="secondary" routerLink="/signup">
          Või registreeri uus kasutaja
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Login;
