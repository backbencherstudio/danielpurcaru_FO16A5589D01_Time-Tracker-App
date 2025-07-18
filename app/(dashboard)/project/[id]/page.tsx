import ProjectDetails from "./ProjectDetails"

const Page = async({params}) => {
  const { id } = await params
  // console.log("Params : ",id)
  return (
    <div>
      <ProjectDetails id={id}/>
    </div>
  )
}

export default Page;
