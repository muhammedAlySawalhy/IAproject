import pharmacy_main from "../assets/pharmacy_main.jpg";

const MainPhoto: React.FC = () => {
  return (
    <div className="w-full h-full">
      <img className="w-full h-full" src={pharmacy_main} alt="Pharmacies" />
    </div>
  );
};

export default MainPhoto;
