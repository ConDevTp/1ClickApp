import "./index.css";
import { useAllData } from "../../../Hooks/useAllData";
const Header1 = () => {
  const { value } = useAllData("Header-1");

  return (
    <section className="bg-danger d-flex justify-content-center align-items-center flex-column p-4">
      <h1>{value?.title || "بدون تایتل"}</h1>
    </section>
  );
};

export default Header1;
