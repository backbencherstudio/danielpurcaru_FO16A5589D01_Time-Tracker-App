import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"

interface Project {
    project: {
        id: string
        name: string
    }
    total_hours: string
    total_cost: string
}

export default function ProjectAssignments({ projects }: { projects: Project[] }) {
    return (
        <Card className="p-2 sm:p-4">
            <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Assign projects</h2>
            </div>

            <div className="overflow-x-auto w-full pb-2" style={{maxWidth:'calc(100vw - 210px)'}}>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground whitespace-nowrap">Project Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground whitespace-nowrap">Total Hours</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground whitespace-nowrap">Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((assignment) => (
                            <tr key={assignment.project.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                                <td className="py-3 px-4">
                                    <span className="font-medium text-nowrap">{assignment.project.name}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <Badge variant="outline">{assignment.total_hours}h</Badge>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="font-semibold text-green-600">${assignment.total_cost}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {projects.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No project assignments yet</div>
            )}
        </Card>
    )
}