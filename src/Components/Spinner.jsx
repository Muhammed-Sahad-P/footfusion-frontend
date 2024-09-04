import { SyncLoader } from "react-spinners";

const Spinner = ({ loading, size = 150, color = "#123abc" }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <SyncLoader color={color} loading={loading} height={size} />
    </div>
  );
};

export default Spinner;
