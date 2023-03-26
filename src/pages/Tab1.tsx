import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PlantList from "../components/PlantList";
import PlantModal from "../components/PlantModal";
import "./Tab1.css";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Taimed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Taimed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PlantList />
        <PlantModal />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
