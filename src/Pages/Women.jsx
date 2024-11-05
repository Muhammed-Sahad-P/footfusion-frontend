import ItemSkeleton from "../Components/ItemSkeleton";
import Card from "../Components/Shared/Card";
import useFetch from "../utils/useFetch";

const Women = () => {
  const { data, isPending, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/users/products/women`
  );

  return (
    <div className="mt-24 text-center">
      {isPending && (
        <div className="p-4">
          <h2 className="text-center text-3xl font-poppins mb-2">
            Men Products
          </h2>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <ItemSkeleton key={index} />
              ))}
          </div>
        </div>
      )}

      {error && <div>{error}</div>}
      {data && (
        <div className="p-4">
          <h2 className="text-center text-3xl font-poppins mb-2 ">
            Women Products
          </h2>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Women;
