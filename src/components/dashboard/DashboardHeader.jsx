const DashboardHeader = ({ name }) => (
    <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Welcome back, {name}!</h1>
        <p className="text-text-secondary">Let's continue your learning journey.</p>
    </div>
);

export default DashboardHeader;