import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab4.css";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router";
import { useFirebaseApp } from "reactfire";

const Tab4: React.FC = () => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Seaded</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={async () => {
                await signOut(auth);
                history.replace("/login");
              }}
            >
              Logi välja
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Seaded</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
