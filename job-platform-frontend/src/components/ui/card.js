const Card = ({ children }) => (
  <div className="bg-white shadow-md p-4 rounded-lg">{children}</div>
);
const CardContent = ({ children }) => <div className="p-2">{children}</div>;
export { Card, CardContent };
