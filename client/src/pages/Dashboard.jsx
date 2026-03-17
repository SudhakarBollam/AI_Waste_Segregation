import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            AI Powered Waste Segregation
          </h1>
          <p className="text-gray-500 text-lg">
            Upload waste images and let AI classify recyclable materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatsCard title="Total Predictions" value="120" color="text-ai" icon="total" />
          <StatsCard title="Recyclable Items" value="80" color="text-eco" icon="recyclable" />
          <StatsCard title="Non-Recyclable" value="40" color="text-red-500" icon="nonrecyclable" />
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          <UploadCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
