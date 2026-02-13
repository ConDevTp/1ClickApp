import "./index.css";
import { useAllData } from "../../../Hooks/useAllData";

const Header2 = () => {
  const { value } = useAllData("Header-2");

  return (
    <section className="d-flex bg-info justify-content-center align-items-center flex-column p-4">
      <h1>{value.title}</h1>
    </section>
  );
};

export default Header2;
