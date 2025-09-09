import ProjectDetails from "./ProjectDetails"

const Page = async({params}) => {
  const { id } = await params
  // console.log("Params : ",id)
  return (
    <div className="w-full h-full">
      <ProjectDetails id={id}/>
    </div>
  )
}

export default Page;
