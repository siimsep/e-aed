import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import PlantList from "../components/PlantList";
import "./Tab1.css";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Taimed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Taimed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <PlantList />
    </IonPage>
  );
};

export default Tab1;
