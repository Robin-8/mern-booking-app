import AdminHeader from '../components/AdminHeader'


interface AdminProps {
    children: React.ReactNode
}

 const AdminLayout = ({ children }: AdminProps) => {
    return(
        <div className="flex flex-col min-h-screen">
            <AdminHeader/>
    
            <div className=" py-10 px-4 sm:ml-[280px] ">{children}</div>
        </div>
    )
}
export default AdminLayout;