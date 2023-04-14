import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from "@ionic/react";
import {
  roseOutline,
  locationOutline,
  calendarOutline,
  cogOutline,
} from "ionicons/icons";
import { Route, Redirect } from "react-router";
import GroupDetailPage from "./pages/GroupDetailPage";
import PlantDetailPage from "./pages/PlantDetailPage";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Tab4 from "./pages/Tab4";

const MainTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tab1" component={Tab1} />
        <Route path="/tab1/:id" component={PlantDetailPage} />
        <Tab1 />
        <Route exact path="/tab2" component={Tab2} />
        <Route path="/tab2/:id" component={GroupDetailPage} />
        <Tab2 />
        <Route path="/tab3">
          <Tab3 />
        </Route>
        <Route path="/tab4">
          <Tab4 />
        </Route>
        <Route exact path="/">
          <Redirect to="/tab1" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon aria-hidden="true" icon={roseOutline} />
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon aria-hidden="true" icon={locationOutline} />
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon aria-hidden="true" icon={calendarOutline} />
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tab4">
          <IonIcon aria-hidden="true" icon={cogOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default MainTabs;
