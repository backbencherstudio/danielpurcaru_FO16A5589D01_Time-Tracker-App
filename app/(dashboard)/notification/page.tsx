import Image from "next/image";
import NotificationCard from "./NotificationCard";
import Profilepic from '@/public/images/Employee/ronald.png';
import Profilepic2 from '@/public/images/Employee/sanvannah.png';
import Profilepic3 from '@/public/images/profileIcon.png';

const notifications = [
  {
    imageSrc: Profilepic3,
    name: "Kathryn Murphy",
    message: "Kathryn Murphy has requested a payment of $150",
  },
  {
    imageSrc: Profilepic,
    name: "Leslie Alexander",
    message: "Leslie Alexander has requested a payment of $150",
  },
  {
    imageSrc: Profilepic2,
    name: "Leslie Murphy",
    message: "Leslie Murphy has requested a payment of $150",
  },
  {
    imageSrc: Profilepic3,
    name: "Kathryn Murphy",
    message: "Kathryn Murphy has requested a payment of $150",
  },
];

export default function Page() {
  return (
    <div className="p-5 bg-gradient-to-l from-white/60 to-white rounded-2xl">
      <div className="flex flex-col gap-8">
        <div>
          <div className="justify-start text-neutral-800 text-2xl font-semibold font-['Urbanist'] leading-9">
            Notification
          </div>
          <div className="self-stretch justify-start text-zinc-500 text-base font-normal font-['Urbanist'] leading-relaxed">
            All Notifications
          </div>
        </div>

        {/* Map through the notifications array */}
        {notifications.map((notification, index) => (
          <NotificationCard
            key={index}
            imageSrc={notification.imageSrc}
            name={notification.name}
            message={notification.message}
          />
        ))}
      </div>
    </div>
  );
}
