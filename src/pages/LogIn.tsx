import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  useIonAlert,
} from "@ionic/react";
import { useHistory } from "react-router";
import TAIMI from "../assets/img/TAIMI.png";

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
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonImg src={TAIMI} alt="logo" />
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonItem id="login-input">
              <IonInput
                value={email}
                placeholder="Sisesta e-mail"
                onIonChange={(e) => setEmail(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonItem id="login-input">
              <IonInput
                value={password}
                type="password"
                placeholder="Sisesta parool"
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonRow>
          <br />
          <IonRow className="ion-justify-content-center">
            <IonButton onClick={() => SignIn()}>Logi sisse</IonButton>
          </IonRow>
          <br />
          <IonRow className="ion-justify-content-center">
            <IonButton id="login-input" color="light" routerLink="/signup">
              Või registreeri uus kasutaja
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Login;
