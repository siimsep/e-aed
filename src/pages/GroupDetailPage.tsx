import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { doc, getDoc } from "firebase/firestore";
import { ellipsisVertical, trash, buildOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import db from "../firebase";
import PlantDescription from "../components/PlantDescription";
import PlantImg from "../components/PlantImg";
interface ParamsId
  extends RouteComponentProps<{
    id: string;
  }> {}

const GroupDetailPage: React.FC<ParamsId> = ({ match }) => {
  const groupId: string = match.params.id;
  const [group, setModelValue] = useState<any>({
    name: "",
    description: "",
    date: "",
    photoUrl: "",
  });
  /*
  //
  //	Initializing our router
  const router = useIonRouter();

  //	A simple, hard-coded navigation
  const simpleNavigate = () => {
    router.push("/tab1", "forward", "push");
  };
  //
  */
  useEffect(() => {
    const fetchGroup = async () => {
      const docRef = doc(db, "users", localStorage.uid, "Peenrad", groupId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        var date = docSnap.data().date.toDate().toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const group: any = {
          name: docSnap.data().peenraNimi,
          description: docSnap.data().description,
          date: date,
          photoUrl: docSnap.data().photoUrl,
        };
        setModelValue(group);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        // maybe make toast as alert for user
      }
    };
    fetchGroup();
  }, [groupId]);

  return (
    <IonPage>
      <IonFab vertical="top" horizontal="end">
        <IonFabButton size="small">
          <IonIcon icon={ellipsisVertical}></IonIcon>
        </IonFabButton>
        <IonFabList side="bottom">
          <IonFabButton
            onClick={() => {
              console.log("hee-heey");
            }}
          >
            <IonIcon color="danger" icon={trash}></IonIcon>
          </IonFabButton>
          <IonFabButton onClick={() => console.log("change")}>
            <IonIcon icon={buildOutline}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
      <IonHeader className="ion-padding-bottom">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab2"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/*  <PlantEntry plantId={plantId} /> */}
        <IonItem>
          <h2>{group.name}</h2>
        </IonItem>
        <IonItem>
          <IonText>Rajatud: {group.date}</IonText>
        </IonItem>
        <PlantDescription description={group.description} />
        <PlantImg photoUrl={group.photoUrl} />
        {/* <EntryCard plantId={plantId} /> */}
      </IonContent>
    </IonPage>
  );
};

export default GroupDetailPage;
