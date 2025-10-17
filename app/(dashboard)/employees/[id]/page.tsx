import EmployeeDetailsPage from "@/components/Shared/EmployeeDetails";

const Page = async({params}) => {
  const { id } = await params
  return (
    <div className="w-full h-full">
      <EmployeeDetailsPage id={id}/>
    </div>
  )
}

export default Page;
