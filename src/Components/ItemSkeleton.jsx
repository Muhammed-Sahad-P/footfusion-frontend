import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ItemSkeleton() {
  return (
    <div className="relative bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-lg shadow-lg overflow-hidden group transform transition-transform duration-500">
      <div className="relative overflow-hidden">
        <Skeleton
          className="w-full h-64 object-cover rounded-t-lg"
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Skeleton className="w-28 h-8" />
        </div>
      </div>

      <div className="p-6 text-center">
        <Skeleton
          className="w-3/4 h-6"
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
        <Skeleton
          className="w-1/2 h-5 mt-2"
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
        <Skeleton
          className="w-1/3 h-6 mt-4"
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
      </div>

      <div className="absolute top-4 right-4">
        <Skeleton circle={true} width={24} height={24} />
      </div>

      <div className="flex justify-center p-6">
        <Skeleton
          className="w-3/4 h-10 rounded-lg"
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />
      </div>
    </div>
  );
}
