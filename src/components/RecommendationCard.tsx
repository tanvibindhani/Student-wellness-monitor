import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecommendationCardProps {
  title: string;
  description: string;
  type: "exercise" | "mindfulness" | "social" | "rest";
  duration?: string;
}

export const RecommendationCard = ({ 
  title, 
  description, 
  type, 
  duration 
}: RecommendationCardProps) => {
  const getTypeColor = () => {
    switch (type) {
      case "exercise": return "bg-wellness-success/20 text-wellness-success";
      case "mindfulness": return "bg-wellness-primary/20 text-wellness-primary";
      case "social": return "bg-wellness-secondary/20 text-wellness-secondary";
      case "rest": return "bg-wellness-calm/20 text-wellness-accent";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-wellness-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground group-hover:text-wellness-primary transition-colors">
            {title}
          </CardTitle>
          <Badge variant="outline" className={getTypeColor()}>
            {type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-2">{description}</p>
        {duration && (
          <p className="text-sm text-wellness-primary font-medium">
            Duration: {duration}
          </p>
        )}
      </CardContent>
    </Card>
  );
};