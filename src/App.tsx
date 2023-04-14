import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/LogIn";
import CreateAccount from "./pages/SignUp";
import {
  AuthProvider,
  FirestoreProvider,
  useFirebaseApp,
  useSigninCheck,
} from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import React from "react";
import MainTabs from "./mainTabs";

setupIonicReact();

const App: React.FC = () => {
  const app = useFirebaseApp();
  const firestoreDatabase = getFirestore(app);
  const auth = getAuth(app);

  return (
    <IonApp>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestoreDatabase}>
          <IonReactRouter>
            <IonRouterOutlet>
              <PrivateRoute></PrivateRoute>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={CreateAccount} />
            </IonRouterOutlet>
          </IonReactRouter>
        </FirestoreProvider>
      </AuthProvider>
    </IonApp>
  );
};
export default App;

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const PrivateRoute = ({
  children,
  location,
  ...rest
}: React.PropsWithChildren<any>) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  if (status === "loading") {
    return <span>loading...</span>;
  }
  if (signInCheckResult.signedIn === true) {
    return <MainTabs />;
  } else {
    return <Login />;
  }
};
