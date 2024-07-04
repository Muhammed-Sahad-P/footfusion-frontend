
import AdminNavbar from '../AdminNavbar'
import AdminSidebar from '../AdminSidebar'

const AdminHome = ({children}) => {
  return (
    <div>
      <AdminNavbar/>
      <AdminSidebar/>
    </div>
  )
}

export default AdminHome