import React from "react";

const AllFoods = () => {
  return (
    <div>
      <div className="text-2xl text-center font-bold"> All Models</div>
      <p className=" text-center ">Explore 3d models.</p>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {data.map((model) => (
          <ModelCard key={model._id} model={model}></ModelCard>
        ))}
      </div>
    </div>
  );
};

export default AllFoods;
