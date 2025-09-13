import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WellnessCard } from "@/components/WellnessCard";
import { MoodSelector } from "@/components/MoodSelector";
import { RecommendationCard } from "@/components/RecommendationCard";
import { JournalEntry } from "@/components/JournalEntry";
import { MoodAnalytics } from "@/components/MoodAnalytics";
import { Brain, Heart, TrendingUp, Calendar, BookOpen, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import wellnessHero from "@/assets/wellness-hero.jpg";

const Index = () => {
  const { toast } = useToast();
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [recentMoods, setRecentMoods] = useState<Array<{mood: number, note: string, date: string}>>([]);
  const [journalEntries, setJournalEntries] = useState<Array<{id: string, title: string, content: string, date: string}>>([]);

  const handleMoodSubmit = (mood: number, note: string) => {
    const newMood = {
      mood,
      note,
      date: new Date().toLocaleDateString()
    };
    setRecentMoods([newMood, ...recentMoods.slice(0, 9)]);
    setShowMoodSelector(false);
    toast({
      title: "Mood recorded!",
      description: "Your daily check-in has been saved successfully.",
    });
  };

  const handleAddJournalEntry = (entry: {title: string, content: string, date: string}) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setJournalEntries([newEntry, ...journalEntries]);
  };

  const recommendations = [
    {
      title: "5-Minute Breathing Exercise",
      description: "Start your day with mindful breathing to reduce stress and anxiety.",
      type: "mindfulness" as const,
      duration: "5 minutes"
    },
    {
      title: "Take a Walk Outside",
      description: "Fresh air and movement can boost your mood and energy levels.",
      type: "exercise" as const,
      duration: "15-30 minutes"
    },
    {
      title: "Connect with a Friend",
      description: "Social connections are vital for mental wellbeing. Reach out to someone you care about.",
      type: "social" as const,
      duration: "10-20 minutes"
    },
    {
      title: "Power Nap",
      description: "A short rest can help reset your energy and improve focus.",
      type: "rest" as const,
      duration: "10-20 minutes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wellness-calm/20 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${wellnessHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-wellness-primary to-wellness-secondary bg-clip-text text-transparent mb-6">
            Student Wellness Monitor
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track your mental health, understand your patterns, and get personalized recommendations for better wellbeing.
          </p>
          <Button
            size="lg"
            onClick={() => setShowMoodSelector(true)}
            className="bg-gradient-to-r from-wellness-primary to-wellness-secondary hover:from-wellness-primary/90 hover:to-wellness-secondary/90 shadow-wellness"
          >
            Start Your Daily Check-in
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Mood Check-in Section */}
        {showMoodSelector && (
          <section className="max-w-2xl mx-auto">
            <MoodSelector onMoodSubmit={handleMoodSubmit} />
          </section>
        )}

        {/* Main Content Tabs */}
        <section>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Journal
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Wellness
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Features Grid */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
                  Your Wellness Journey
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <WellnessCard
                    title="Daily Mood Tracking"
                    description="Check in with yourself daily and build awareness of your emotional patterns."
                    icon={<Heart className="w-6 h-6 text-wellness-accent" />}
                    variant="mood"
                    onClick={() => setShowMoodSelector(true)}
                  />
                  <WellnessCard
                    title="Trend Analysis"
                    description="Visualize your mental health journey with insightful charts and trends."
                    icon={<TrendingUp className="w-6 h-6 text-wellness-secondary" />}
                    variant="analytics"
                  />
                  <WellnessCard
                    title="AI Recommendations"
                    description="Get personalized wellness suggestions based on your mood patterns."
                    icon={<Brain className="w-6 h-6 text-wellness-primary" />}
                  />
                </div>
              </div>

              {/* Recent Moods */}
              {recentMoods.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Recent Check-ins</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentMoods.slice(0, 6).map((entry, index) => (
                      <Card key={index} className="border-wellness-primary/20">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Mood: {entry.mood}/5</CardTitle>
                            <span className="text-sm text-muted-foreground">{entry.date}</span>
                          </div>
                        </CardHeader>
                        {entry.note && (
                          <CardContent>
                            <p className="text-muted-foreground italic">"{entry.note}"</p>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analytics">
              <MoodAnalytics moodData={recentMoods} />
            </TabsContent>

            <TabsContent value="journal">
              <JournalEntry entries={journalEntries} onAddEntry={handleAddJournalEntry} />
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground">Today's Wellness Recommendations</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendations.map((rec, index) => (
                    <RecommendationCard key={index} {...rec} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>


        {/* Call to Action */}
        <section className="text-center py-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-wellness-primary/10 to-wellness-secondary/10 border-wellness-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to prioritize your mental health?</h3>
              <p className="text-muted-foreground mb-6">
                Start tracking your daily moods and discover insights about your mental wellbeing patterns.
              </p>
              <Button
                size="lg"
                onClick={() => setShowMoodSelector(true)}
                className="bg-gradient-to-r from-wellness-primary to-wellness-secondary hover:from-wellness-primary/90 hover:to-wellness-secondary/90"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Begin Your Journey
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
