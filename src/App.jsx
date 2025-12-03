import { useState } from 'react'
import reactLogo from './assets/react.svg'
import ContactForm from './components/contactForm'
import "@fortawesome/fontawesome-free/css/all.css";
import Contacts from './components/contacts.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='min-h-screen min-w-screen flex flex-col bg-black'>
      <ContactForm />
      <Contacts/>
    </div>
    </>
  )
}

export default App
