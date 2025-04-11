import SideBar from "../components/SideBar/SideBar";
import ProductsList from "../components/ProductsList/ProductsList";

const HomePageLayout = () => {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <SideBar />
      <ProductsList />
    </div>
  );
};

export default HomePageLayout;
