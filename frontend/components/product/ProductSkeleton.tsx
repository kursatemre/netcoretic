export default function ProductSkeleton() {
  return (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-md mb-4"></div>
      <div className="h-6 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-8 bg-gray-200 rounded"></div>
    </div>
  );
}
