import "antd/dist/antd.css";
import Login from "./Pages/Role/User/Session/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fonctions from "./Pages/Role/Admin/Fonction/fonction";
import Services from "./Pages/Role/Admin/Service/service";
import Typesortie from "./Pages/Role/Admin/TypeSortie/typesortie";
import Typestage from "./Pages/Role/Admin/TypeStage/typestage";
import Rebut from "./Pages/Role/User/Autorisation/Rebut/rebut";
import Sortiepersonel from "./Pages/Role/User/Autorisation/sortiePersonel/sortiepersonel";
import Sortiesociete from "./Pages/Role/User/Autorisation/sortieSociete/sortiesociete";
import Confirmrebut from "./Pages/Chef/confirmation_rebut/confirmation_rebut";
import Confirmpersonel from "./Pages/Chef/confirmation_personel/confirmation_personel";
import Confirmsociete from "./Pages/Chef/confirmation_societe/confirmation_societe";
import Changepassword from "./Pages/Role/User/Session/changePass";
import Utilisateurs from "./Pages/Role/Admin/utilisateurs/utilisateurs";
import Materielle from "./Pages/Role/User/Autorisation/sortieSociete/materielle";
import AjoutUtilisateur from "./Pages/Role/Admin/utilisateurs/AjoutUtilisateur";
import AjoutTypeStage from "./Pages/Role/Admin/TypeStage/AjoutTypeStage";
import AjoutTypeSortie from "./Pages/Role/Admin/TypeSortie/AjoutTypeSortie";
import AjoutService from "./Pages/Role/Admin/Service/AjoutService";
import AjoutFonction from "./Pages/Role/Admin/Fonction/AjoutFonction";
import AutorisationInofrmation from "./Pages/Chef/confirmation_societe/AutorisationInofrmation";
import Refus_rebut from "./Pages/Chef/refus_rebut/refus_rebut";
import Refus_societe from "./Pages/Chef/refus_societe/refus_societe";
import Refus_personel from "./Pages/Chef/refus_personel/refus_personel";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/gestion_users" element={<Utilisateurs />} />
          <Route path="/ajout_users" element={<AjoutUtilisateur />} />
          <Route path="/gestion_services" element={<Services />} />
          <Route path="/ajout_services" element={<AjoutService />} />
          <Route path="/gestion_fonctions" element={<Fonctions />} />
          <Route path="/ajout_fonctions" element={<AjoutFonction />} />
          <Route path="/gestion_typestage" element={<Typestage />} />
          <Route path="/ajout_typestage" element={<AjoutTypeStage />} />
          <Route path="/gestion_typesortie" element={<Typesortie />} />
          <Route path="/ajout_typesortie" element={<AjoutTypeSortie />} />
          <Route
            path="/autorisation_bienssociete"
            element={<Sortiesociete />}
          />
          <Route
            path="/autorisation_bienssociete/:id"
            element={<Materielle />}
          />
          <Route
            path="/autorisation_info/:id"
            element={<AutorisationInofrmation />}
          />
          <Route path="/autorisation_rebut" element={<Rebut />} />
          <Route
            path="/autorisation_bienspersonel"
            element={<Sortiepersonel />}
          />
          <Route
            path="/confirm_autorisation_bienssociete"
            element={<Confirmsociete />}
          />

          <Route
            path="/confirm_autorisation_rebut"
            element={<Confirmrebut />}
          />
          <Route
            path="/confirm_autorisation_bienspersonel"
            element={<Confirmpersonel />}
          />
           <Route
            path="/refus_autorisation_rebut"
            element={<Refus_rebut />}
          />
          <Route
            path="/refus_autorisation_bienssociete"
            element={<Refus_societe/>}
          />
          <Route
            path="/refus_autorisation_bienspersonel"
            element={<Refus_personel />}
          />
          <Route path="/change_password" element={<Changepassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
