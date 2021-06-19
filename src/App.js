import JobForm from './components/JobForm';
import Header from './components/Header';
import Footer from './components/Footer'

const App=()=> {
  return (
    <div className="container">
      <Header />
      <JobForm/>
      <Footer/>
    </div>
  );
}

export default App;
