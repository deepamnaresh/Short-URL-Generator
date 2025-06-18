import ContactUs from './ContactUs';
import Sidebar from '../components/Sidebar';

function App() {
  return (
    <div className="flex">
  <div className="w-1/4">
    <Sidebar />
  </div>
  <div className="w-3/4">
    <ContactUs />
  </div>
</div>

    
  );
}

export default App;
