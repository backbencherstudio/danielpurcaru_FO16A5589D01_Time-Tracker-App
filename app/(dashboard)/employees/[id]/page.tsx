import EmployeeDetailsPage from "@/components/Shared/EmployeeDetails";

const Page = async({params}) => {
  const { id } = await params
  // console.log("Params : ",id)
  return (
    <div className="w-full h-full">
      <EmployeeDetailsPage id={id}/>
    </div>
  )
}

export default Page;
