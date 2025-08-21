

import { Outlet } from 'react-router'
import ComponentLayout from './components/layout/ComponentLayout'
import './index.css'


function App() {


  return (
    <>
    <ComponentLayout>
      <Outlet />
    </ComponentLayout>
    </>
  )
}

export default App
