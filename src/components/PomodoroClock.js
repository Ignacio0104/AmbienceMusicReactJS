import React, { useEffect, useRef, useState } from 'react'
import "./PomodoroClock.css"

function PomodoroClock() {
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [clockActive, setClockActive] = useState(false)
  const [focus, setFocus] = useState(false)
  const minutesText = useRef();
  const breakMinutesText = useRef()

  const runClock = ()=>{
    setFocus(true)
    setClockActive(true);
    setTimerMinutes(minutesText.current.value-1);
    setBreakMinutes(breakMinutesText.current.value-1);
    setTimerSeconds(59);
  }

  const focusTime = ()=>{
    let interval = setInterval(()=>{
      clearInterval(interval);

      if(timerSeconds ===0){
        if(timerMinutes!== 0){
          setTimerSeconds(59);
          setTimerMinutes(timerMinutes-1);
        }else{
          setFocus(false);
          setTimerSeconds(59);
          setTimerMinutes(timerMinutes);
        }
      }else{
        setTimerSeconds(timerSeconds-1)
      }
    },1000)
  }

  const breakTime = ()=>{
    let interval = setInterval(()=>{
      clearInterval(interval);

      if(timerSeconds ===0){
        if(breakMinutes!== 0){
          setTimerSeconds(59);
          setBreakMinutes(breakMinutes-1);
        }else{
          setFocus(true);
          setTimerSeconds(59);
          setBreakMinutes(breakMinutes);      
        }
      }else{
        setTimerSeconds(timerSeconds-1)
      }
    },1000)
  }

  const stopClock = ()=>{
    setClockActive(false)
  }

  useEffect(() => {
    if(clockActive)
    {
      if(focus)
      {
          focusTime();
      }else{
        breakTime();
      }
    }
  }, [timerSeconds])
  

  return (
    <div>
      <div className='pomodoro-header'>
        <div  className='pomodoro-time'>
          <label>Focus time</label>
          <input ref={minutesText} type="number" min="0"></input>
        </div>
        <div className='pomodoro-time'>
          <label>Break time</label>
          <input ref={breakMinutesText} type="number" min="0"></input>
        </div>
      </div>
      <div className='pomodoro-main'>
      {
        focus?
        <h2>{timerMinutes} : {timerSeconds}</h2>
        :
        <h2>{breakMinutes} : {timerSeconds}</h2>
      }
      </div>
      <button onClick={runClock}>Start</button>
      <button onClick={stopClock}>Pause</button>
      <button onClick={stopClock}>Stop</button>
    </div>
  )
}

export default PomodoroClock
