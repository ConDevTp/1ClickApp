import { useAllData } from "../../../Hooks/useAllData";
const Footer2 = () => {
  const { value } = useAllData("Footer-2");

  return (
    <footer className="bg-danger d-flex justify-content-center align-items-center flex-column p-4">
      <h1>{value?.title || "بدون تایتل"}</h1>
    </footer>
  );
};

export default Footer2;
