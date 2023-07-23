import React from "react";
import { useSelector } from "react-redux";
import { routeLoading, routeLoadingError } from "../features/router/routerSlice";
import DrawMap from "../components/DrawMap";
import Loader from "../components/Loader";

const Home = () => {
  const loading = useSelector(routeLoading);
  const loadingError = useSelector(routeLoadingError);

  if (loadingError) return <div>please retry...</div>;
  if (loading) return <Loader />;

  return (
    <DrawMap
      center={{lat: 59.82877165216871, lng: 30.36209106445313}}
      zoom={12}
    />
  );
};

export default Home;
