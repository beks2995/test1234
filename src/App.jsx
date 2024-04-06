import { useState, useEffect } from 'react'
import './App.scss'

const App = () => {
    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState('')
    const apiKey = '6c489eac6d829f4eedba9bdde135f04e'
    const submitHandler = (event) => {
        event.preventDefault()

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then((res) => res.json())
            .then(data => setWeather(data))
        setCity('')
    }

    const changeHandle = (e) => {
        setCity(e.target.value)
    }
    const timeGenerateHandle = (timestamp) => {
        const time = new Date(timestamp * 1000)
        const hours = time.getHours()
        const minutes = time.getMinutes()
        const sec = time.getSeconds()
        return `${hours}:${minutes}:${sec}`
    }
    return (
        <div className='bg'>
            <div className="weather-box">
                <form onSubmit={submitHandler}>
                    <input type="text" name='citysName' value={city} onChange={changeHandle} />
                    <button type='submit' >find</button>
                </form>
                {
                    weather
                    &&
                    <div>
                        <p>{weather.name} {weather.sys.country}</p>
                        <p>Время: {timeGenerateHandle(weather.dt)}</p>
                        <p>Восход: {timeGenerateHandle(weather.sys.sunrise)}</p>
                        <p>Закат: {timeGenerateHandle(weather.sys.sunset)}</p>
                    </div>
                }
            </div>

        </div>
    )
}
export default App