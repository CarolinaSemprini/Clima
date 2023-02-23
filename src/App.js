
import { useEffect, useState } from 'react';
import './App.css';
import Icons from './componentes/Icons';

function App() {
  const [search, setSearch]=useState('Buenos Aires')
  const [values, setValues]=useState('')
  const [icon, setIcon]=useState('')

 const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=pt&units=metric&appid=${process.env.REACT_APP_API_KEY}`

 const getData = async () => {
  await fetch(URL)
    .then(response => {return response.json()})
    .then( data => {
      if(data.cod >= 400) {
        setValues(false)
      }else{   
        console.log (data)      
        setIcon(data.weather[0].main)
        
        setValues(data)
      }        
    })
    .catch(error => {
      console.log(error)
    })
}

  const handleSearch=(e)=>{
    //cuando haga un enter va a cargar la informacion de busqueda
    if(e.key==='Enter'){
      console.log(e.target.value)
      setSearch(e.target.value)
    }
  }

  useEffect(()=>{
    getData()
  },[search])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <div className="container">
      <h2>MI APP DEL CLIMA</h2>
      <p>Semprini Carolina</p>
      <div className='row'>
        <input onKeyDown={handleSearch}
        type="text"
        autoFocus
        placeholder="Escriba el nombre de su ciudad" required="" />
        
      </div>
    </div>

    <div className='card'>
      {(values) ? (
        <div className='card-container'>
          <h1 className='city-name'>{values.name}</h1>
          <p className='temp'>{values.main.temp.toFixed(0)}&deg;</p>
          <img className='icon' src={Icons(icon)} alt="icon-weather" />
          <div className='card-footer'>
            <p className='temp-max-min'>Min: {values.main.temp_min.toFixed(0)}&deg;  | Max:  {values.main.temp_max.toFixed(0)}&deg;</p>
          </div>
          <div className='card-footer-dos'>
            <p className='footer-dos'>Humedad: {values.main.humidity.toFixed(0)}%  </p>
            <p className='footer-dos'>Presión: {values.main.pressure.toFixed(0)} hPa </p>
          </div>
        </div>
      ) : (
        <h1>{"City not found"}</h1>
      )}

    </div>
    </>

  );
}

export default App;
