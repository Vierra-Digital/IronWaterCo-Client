import VendorsSection from '../../components/VendorsSection'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Vendors',
  description: 'Discover our curated selection of premium architectural hardware and plumbing vendors. Partnering with the world\'s finest manufacturers for exceptional quality and design.',
}

export default function VendorsPage() {
  return (
    <>
      <Navbar activePage="vendors" />
      <VendorsSection />
      <Footer />
    </>
  )
}

