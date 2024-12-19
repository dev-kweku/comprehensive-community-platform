import React from "react";

function useCountdown(seconds:number){
    const [time,setTime]=React.useState(seconds);
    const intervalId=React.useRef<ReturnType<typeof setInterval>|null>(null);


    const start=React.useCallback(()=>{
        setTime(seconds);
        intervalId.current=setInterval(()=>{
            setTime((t)=>t-1);
        },1000);
    },[seconds]);

    const stop=React.useCallback(()=>{
        clearInterval(intervalId.current as ReturnType<typeof setInterval>);
    },[]);

    React.useEffect(()=>{
        if(time===0){
            stop();
        }
    },[time,start,stop]);
    
}

export default useCountdown;