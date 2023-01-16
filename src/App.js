import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'

import {Howl} from 'howler';

// media 
import clockMp3  from '../src/media/clock.mp3'
import bellMp3 from '../src/media/bell.mp3'

// assets 
let clockLoop = new Howl({
  src: [ clockMp3 ],
  loop: true
})

let bellSfx = new Howl({
  src: [ bellMp3 ],
})


function App() {
  const [ isRunning, setIsRunninng] = useState(false)
  const [ timeMin, setTimeMin] = useState(25)
  const [ timeSec, setTimeSec] = useState(0)
  const [ onBreak, setOnBreak ] = useState(false)
  const [ workInterval, setWorkInteval ] = useState(0)
  const [ breakInterval, setBreakInterval ] = useState(0)


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
          setTimeSec(0)
          setTimeMin(0)
          clockLoop.stop()
          bellSfx.play()
          // Keep track of intervals
          if(!onBreak){
            setWorkInteval((workInterval) => workInterval + 1)
            setTimeMin(5)
            setOnBreak(true)
          }
          if (onBreak) {
            setBreakInterval((breakInterval) => breakInterval + 1)
            setTimeMin(25)
            clockLoop.start()
            setOnBreak(false)
          }
         
        }
      }, 1000)
      return () => {

        clearInterval(intervalPom)
      }
    }
  }, [isRunning, timeMin, timeSec, workInterval, breakInterval])

  // Component functions 
  const startTimer = () => {
    clockLoop.play()
    setIsRunninng(true)
  }

  const pauseTimer = () => {
    clockLoop.pause()
    setIsRunninng(false)
  }

  const resetTimer = () => {
    clockLoop.stop()
    setIsRunninng(false)
    setTimeMin(25)
    setTimeSec(0)
  }

  const reduceTime = () => {
    if(timeMin > 0){
      setTimeMin((timeMin) => timeMin -1)
    }
  }
  const increaseTime = () => {
    if(timeMin < 100){
      setTimeMin((timeMin) => timeMin +1)
    }
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
          <div className='time-ctrl d-flex justify-content-center flex-row'>
              <Button className='mx-2' size="lg" onClick={reduceTime}><h1>-</h1></Button>  <Button className='mx-2' size="lg" onClick={increaseTime}><h1>+</h1></Button>
          </div>
          <div className='time-ctrl d-flex justify-content-center flex-row my-2'>
            <h2 className='h2'><span>🍅{workInterval}</span>/🏖️{breakInterval}</h2>
          </div>
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
