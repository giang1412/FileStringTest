import useRouteElement from './useRouteElement'
import './App.css'

function App() {
  const routeElement = useRouteElement()
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 bg-custom-gradient'>{routeElement}</div>
  )
}

export default App
