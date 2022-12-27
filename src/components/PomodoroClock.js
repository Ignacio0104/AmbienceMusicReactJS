import React, { useEffect, useRef, useState } from 'react'
import "./PomodoroClock.css"

function PomodoroClock() {
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [numberOfSets, setNumberOfSets] = useState(0);
  const [iconVisible, setIconVisible] = useState([false,false,false])
  const [secondsAcumulator, setSecondsAcumulator] = useState(0)
  const [progress, setProgress] = useState(0)
  const [clockActive, setClockActive] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false)
  const [focus, setFocus] = useState(false);
  const minutesText = useRef();
  const breakMinutesText = useRef()
  const setsText = useRef();

  const runClock = ()=>{
    setNumberOfSets(setsText.current.value);
    setFocus(true)
    setClockActive(true);
    setTimerMinutes(minutesText.current.value-1);
    setBreakMinutes(breakMinutesText.current.value-1);
    setInputDisabled(true)
    setTimerSeconds(59);
  }

  const calulatePercentage = ()=>{
    let totalTimeInSeconds
    let percentage;
    if(focus)
    {
      totalTimeInSeconds = minutesText.current.value * 60;
      percentage= Math.ceil((secondsAcumulator / totalTimeInSeconds) * 100);
    }else{
      totalTimeInSeconds = breakMinutesText.current.value * 60;
      percentage= Math.ceil((secondsAcumulator / totalTimeInSeconds) * 100);
      
    }
    setProgress(percentage);
  }

  const focusTime = ()=>{
    let interval = setInterval(()=>{
      clearInterval(interval);

      if(timerSeconds ===0){
        if(timerMinutes!== 0){
          setTimerSeconds(59);
          setTimerMinutes(timerMinutes-1);
          setSecondsAcumulator(secondsAcumulator+1);
        }else{
          setFocus(false);
          setProgress(0);
          setTimerSeconds(59);
          setSecondsAcumulator(0);
          setTimerMinutes(timerMinutes);
        }
      }else{
        setTimerSeconds(timerSeconds-1)
        setSecondsAcumulator(secondsAcumulator+1);
      }
      calulatePercentage();
    },1000)
  }


  const breakTime = ()=>{
    let interval = setInterval(()=>{
      clearInterval(interval);

      if(timerSeconds ===0){
        if(breakMinutes!== 0){
          setTimerSeconds(59);
          setBreakMinutes(breakMinutes-1);
          setSecondsAcumulator(secondsAcumulator+1);
        }else{
          setFocus(true);
          setProgress(0);
          setSecondsAcumulator(0);
          setTimerSeconds(59);
          setNumberOfSets(numberOfSets-1)
          setBreakMinutes(breakMinutesText.current.value-1);  
          setTimerMinutes(minutesText.current.value-1);    
        }
      }else{
        setTimerSeconds(timerSeconds-1)
        setSecondsAcumulator(secondsAcumulator+1);
      }
      calulatePercentage();
    },1000)
  }

  const showIcons = (index,boolean)=>{
      let icons = [...iconVisible];
      let iconToChange = {...icons[index]};
      iconToChange = boolean;
      icons[index] = iconToChange;
      setIconVisible(icons);
  }

  const stopClock = ()=>{
    setClockActive(!clockActive);
    setTimerSeconds(timerSeconds-1);
  }

  const resetClock = () =>{
    setInputDisabled(false)
    setTimerSeconds(0);
    setProgress(0)
    setClockActive(false);
    setBreakMinutes(0);  
    setTimerMinutes(0);  
    setNumberOfSets(0);  
    setSecondsAcumulator(0);
  }

  useEffect(() => {
    if(clockActive)
    {
      if(numberOfSets > 0)
      {
        if(focus)
        {
            focusTime();
        }else{
          breakTime();
        }
      }
    }else{
    }
  }, [timerSeconds])
  

  return (
    <div>
      <div className='pomodoro-header'>
        <div  className='pomodoro-time'>
          <label>Focus time</label>
          <input ref={minutesText} className="input-pomodoro" disabled={inputDisabled} type="number" min="0"></input>
        </div>
        <div className='pomodoro-time'>
          <label>Break time</label>
          <input ref={breakMinutesText} className="input-pomodoro" disabled={inputDisabled} type="number" min="0"></input>
        </div>
        <div className='pomodoro-time'>
          <label>Sets</label>
          <input ref={setsText} className="input-pomodoro" disabled={inputDisabled} type="number" min="0"></input>
        </div>
      </div>
      <div className='pomodoro-main'>
          <h2 className='set-container'> Session: {numberOfSets}</h2>
          <div className='clock-container'>
          {
            focus ?
            (<div>
              <h2 className='session-type'>Focus time</h2>
              <h2 className='pomodoro-minutes'>{ timerMinutes < 10 ?  `0${timerMinutes}` : timerMinutes} : { timerSeconds < 10 ?  `0${timerSeconds}` : timerSeconds}</h2>
            </div>)
            :
            (<div>
              <h2 className='session-type'>Break time</h2>
              <h2 className='pomodoro-minutes'>{ breakMinutes < 10 ?  `0${breakMinutes}` : breakMinutes} : { timerSeconds < 10 ?  `0${timerSeconds}` : timerSeconds}</h2>
            </div>)      
          }
            <div className='progress-bar'>
              <div className='progress__fill' style={{width: `${progress}%`}}></div>
            </div>
          </div>
      </div>
      <div className='pomodoro-button-container'>
      {!inputDisabled && 
      (<button onClick={runClock} onMouseLeave={()=>showIcons(0,false)} onMouseEnter={()=>showIcons(0,true)} 
      className="pomodoro-start-btn">{iconVisible[0] ? <i className="fas fa-play"></i> : "Start"}</button>)}    
        <button onClick={stopClock} onMouseLeave={()=>showIcons(1,false)} onMouseEnter={()=>showIcons(1,true)} className="pomodoro-pause-btn">
        {iconVisible[1] ? clockActive ?  <i class="fas fa-pause"></i> : <i className="fas fa-play"></i> :
        clockActive ? "Pause" : "Resume"}
        </button>
      {!clockActive&& 
      (<button onClick={resetClock} onMouseLeave={()=>showIcons(2,false)} onMouseEnter={()=>showIcons(2,true)} 
      className="pomodoro-stop-btn">{iconVisible[2] ? <i class="fas fa-stop"></i>: "Stop"}</button>)}
      </div>
    </div>
  )
}

export default PomodoroClock
