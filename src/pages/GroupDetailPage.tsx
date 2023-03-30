import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { doc, getDoc } from "firebase/firestore";
import { ellipsisVertical, trash, buildOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import db from "../firebase";
interface ParamsId
  extends RouteComponentProps<{
    id: string;
  }> {}

const GroupDetailPage: React.FC<ParamsId> = ({ match }) => {
  const groupId: string = match.params.id;
  const [group, setModelValue] = useState<any>({
    name: "",
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
      const docRef = doc(db, "/Peenrad", groupId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const group: any = {
          name: docSnap.data().peenraNimi,
        };
        setModelValue(group);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
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
      <IonContent className="ion-padding">
        <IonText>
          <h1>{group.name}</h1>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default GroupDetailPage;
