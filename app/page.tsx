import DashboardCard from "@/components/reusable/DashboardCard";

export default function Home() {
  const cardData = [
    ["Total Employee",2500],
    ["Total Hours",1540],
    ["Labor Cost",3540],
    ["Active Project",10]
  ]
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {cardData.map((card,index)=><DashboardCard key={index} title={card[0]} value={card[1]}/>)}
      </div>
    </div>
  );
}
