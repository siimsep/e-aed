import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useHistory } from "react-router";
import {
  IonButton,
  IonInput,
  IonItem,
  useIonAlert,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const CreateAccount: React.FC = () => {
  const history = useHistory();
  const [alert] = useIonAlert();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const CreateUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Account created in Firebase
        // Handle successful creation
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("isLogin", "true");
        history.replace("/");
        return true;
      })
      .catch(async (error) => {
        const errorMessage = error.message;

        await alert({
          header: "Error Creating Account",
          message: errorMessage,
          buttons: ["OK"],
        });
      });
  };
  return (
    <IonPage id="create-account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Uue kasutaja tegemine</IonTitle>
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
        <IonButton onClick={() => CreateUser()}>LOO KASUTAJA</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default CreateAccount;
