import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WellnessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  variant?: "default" | "mood" | "analytics";
  onClick?: () => void;
}

export const WellnessCard = ({ 
  title, 
  description, 
  icon, 
  variant = "default",
  onClick 
}: WellnessCardProps) => {
  return (
    <Card className={cn(
      "group cursor-pointer transition-all duration-300 hover:scale-105",
      "border-0 shadow-wellness hover:shadow-xl",
      variant === "mood" && "bg-gradient-to-br from-wellness-accent/20 to-wellness-primary/20",
      variant === "analytics" && "bg-gradient-to-br from-wellness-secondary/20 to-wellness-calm/30",
      variant === "default" && "bg-gradient-to-br from-card to-wellness-calm/10"
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className={cn(
            "p-3 rounded-xl transition-colors",
            variant === "mood" && "bg-wellness-accent/30",
            variant === "analytics" && "bg-wellness-secondary/30",
            variant === "default" && "bg-wellness-primary/20"
          )}>
            {icon}
          </div>
          <CardTitle className="text-foreground group-hover:text-wellness-primary transition-colors">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button 
          variant="outline"
          className="w-full border-wellness-primary/20 hover:bg-wellness-primary hover:text-wellness-primary-foreground"
          onClick={onClick}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};