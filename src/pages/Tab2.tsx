import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import GroupModal from "../components/GroupModal";
import "./Tab2.css";
const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Peenrad, istutusalad</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GroupModal />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
