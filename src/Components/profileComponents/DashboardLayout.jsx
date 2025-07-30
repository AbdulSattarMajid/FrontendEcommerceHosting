import Sidebar from './Sidebar';

const DashboardLayout = ({ role, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 pt-20">
      <Sidebar role={role} />
      <main className="ml-0 md:ml-64 px-6 md:px-12 py-10">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
