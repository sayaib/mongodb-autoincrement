
import './App.css';
import axios from 'axios';
import { useFormik } from 'formik'

function App() {
  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      try {
        const res = await axios.post('/postData', {
          name: "sayaib",
          email: "sayaib@gmail.com",
        })
      } catch (error) {
        console.log(error)
      }
    }
  })


  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
