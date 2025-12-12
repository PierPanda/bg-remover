import { Card, CardBody } from "@heroui/react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card
      className="transition-all duration-300 hover:scale-105 hover:shadow-xl"
      isPressable
    >
      <CardBody className="gap-4 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 text-white shadow-lg">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
}
