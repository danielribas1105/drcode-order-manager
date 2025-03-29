import Aside from "@/components/layout/aside"

export default function HomeLayout({ children }: any) {
   return (
      <div className="container-box flex-col md:flex-row">
         {children}
         <Aside />
      </div>
   )
}