import naming from "../data/ru.json";

const ProfileOrders = () => {
  return (
    <div>
      <h1 className="text text_type_main-medium mb-4 mt-4">
        {naming.ProfileOrders.history}
      </h1>
      <p className="text text_type_main-default text_color_inactive">
        {naming.ProfileOrders.emptyHistory}
      </p>
    </div>
  );
};

export default ProfileOrders;
