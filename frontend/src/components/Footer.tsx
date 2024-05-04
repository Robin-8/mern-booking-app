
const Footer = () => {
    return(
        <div className="bg-blue-800">
            <div className="container mx-auto py-10 flex justify-between">
             <div className="text-white justify-between items-center font-bold ">
                <span className="text-white font-bold text-2xl">GoAnyWere.com</span>
             </div>
             
             <span className="text-white font-normal ">
                <p className="cursor-pointer">Privacy Policy</p>
                <p className="cursor-pointer">Terms of Services</p>
             </span>
            </div>
        </div>
    )
}
export default Footer;