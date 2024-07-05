import Card from "../Components/Shared/Card";
import useFetch from "../utils/useFetch";

const Women = () => {
  const { data, isPending, error } = useFetch("http://localhost:3000/products");
  const womenProducts = data
    ? data.filter((item) => item.type === "women")
    : [];

  return (
    <div className="mt-24 text-center">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && (
        <div className="p-4">
          <h2 className="text-center text-3xl font-semibold mb-2 ">
            Women Products
          </h2>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card data={[...womenProducts]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Women;
