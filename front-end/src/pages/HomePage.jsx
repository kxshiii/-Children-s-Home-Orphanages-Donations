import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomes } from "../features/homes/homeSlice";
import Loader from "../components/Loader";
import Card from "../components/Card";
import NavBar from "../components/Navbar";
import ReviewForm from "../components/ReviewForm";

const HomePage = () => {
  const dispatch = useDispatch();
  const { homes, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomes());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Available Homes</h1>

        {loading && <Loader />}
        {error && <p className="text-red-500">{error.message}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {homes.map((home) => (
            <Card
              key={home.id}
              title={home.name}
              description={home.description}
              imageUrl={home.image_url}
              location={home.location}
              id={home.id}
            />
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Leave a Review</h2>
          <ReviewForm />
        </div>
      </div>
    </>
  );
};

export default HomePage;

