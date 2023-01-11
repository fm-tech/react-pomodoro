import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'


function App() {
  const [ isRunning, setIsRunninng] = useState(false)
  const [ timeMin, setTimeMin] = useState(25)
  const [ timeSec, setTimeSec] = useState(0)

  // useEffect 
  useEffect(() => {
    if (isRunning){
      const intervalPom = setInterval(() => {
        // Decrease Seconds
        if( timeSec > 0){
          setTimeSec((timeSec) => timeSec -1 )
        }
        // Decrease Minutes 
        if( timeSec === 0){
          setTimeMin((timeMin) => timeMin -1)
          setTimeSec(59)
        }
        // Check if time ends 
        if(timeMin === 0 && timeSec === 0){
          setIsRunninng(false)
        }
      }, 1000)
      return () => clearInterval(intervalPom)
    }
  }, [isRunning, timeMin, timeSec])

  // Component functions 
  const startTimer = () => {
    setIsRunninng(true)
  }

  const pauseTimer = () => {
    setIsRunninng(false)
  }

  const resetTimer = () => {
    setIsRunninng(false)
    setTimeMin(25)
    setTimeSec(0)
  }

  // Rendered JSX
  return (
    <div className='container'>
      <div className="d-flex align-items-center flex-column">
        <div className='Lead'>
          <h2 className='display-2'>
            Pomodoro Timer
          </h2>
        </div>
        <div className='Timer py-4 my-2'>
          <h2 className='display-1 align-self-center'>{timeMin}:{timeSec < 10 ? "0" + timeSec : timeSec }</h2>
        </div>
      </div>
      <div className='Ctrl py-8 my-2 d-grid gap-2 fixed-bottom'>
        <Button variant="primary" size="lg" onClick={startTimer}>Start</Button>
        <Button variant='primary' size='lg' onClick={resetTimer} >Reset</Button>
        <Button variant='danger' size='lg' onClick={pauseTimer}>Pause</Button>
      </div>
    </div>

  );
}

export default App;
