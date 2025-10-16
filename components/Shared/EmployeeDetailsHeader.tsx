import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { Mail } from "lucide-react"
import Image from "next/image"

interface Employee {
    name: string
    email: string
    employee_role: string
    avatarUrl: string
    username: string
}

export default function EmployeeHeader({ employee }: { employee: Employee }) {
    const initials = employee?.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()

    return (
        <Card className="p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start gap-6">
                <Avatar className="h-24 w-24">
                    {employee?.avatarUrl?
                        <Image src={employee?.avatarUrl || "/placeholder.svg"} width={500} height={500} alt={employee?.name} />
                        :
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-medium text-lg">
                            {employee?.name?.slice(0,1)}
                            {employee?.name?.slice(0,1)}
                        </div>
                    }
                </Avatar>

                <div className="flex-1 sm:space-y-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold">{employee?.name}</h1>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{employee?.employee_role}</Badge>
                    </div>

                    <p className="text-muted-foreground">@{employee?.username}</p>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${employee?.email}`} className="text-blue-600 hover:underline">
                                {employee?.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
