import { useEffect } from "react"

type ToastProps = {
    message: string,
    type: "SUCCESS"|"ERROR"
    onClose: ()=>void
}

const Toast = ({message,type,onClose}: ToastProps) =>{
    useEffect(()=>{
        const timer = setTimeout(()=>{
         onClose()
        },5000)
        return ()=>{
            clearTimeout(timer)
        }
    },[onClose])
  const style = type ==="SUCCESS" ? " fixed bg-green-500 text-white top-4 right-4 z-50 max-w-md rounded-md": "fixed bg-red-500 text-white top-4 right-4 z-50 max-w-md rounded-md"


    return(
        <div className={style}>
            <div className="flex justify-center items-center">
                <span className="text-white font-semibold">{message}</span>
            </div>
        </div>
    )
}
export default Toast