import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import GroupList from "../components/GroupList";
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
      <GroupList />
      <GroupModal />
    </IonPage>
  );
};

export default Tab2;
