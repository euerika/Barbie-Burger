//import { Footer } from "../Footer";
import "../../../src/Componentes/Layout/Layout.css";
import "../../../src/index.css";

export const LayoutForm = ({children}) => {
  return (
    <div className="container">
      <section className="container-layout container-flexbox">
        <div className="container-content container-flexbox">
          {children}
        </div>
        {/* <Footer /> */}
      </section>
    </div>
   );
};