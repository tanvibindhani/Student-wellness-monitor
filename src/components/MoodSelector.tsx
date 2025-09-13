import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const moods = [
  { emoji: "😄", label: "Great", value: 5, color: "bg-wellness-success" },
  { emoji: "😊", label: "Good", value: 4, color: "bg-wellness-secondary" },
  { emoji: "😐", label: "Okay", value: 3, color: "bg-wellness-calm" },
  { emoji: "😔", label: "Down", value: 2, color: "bg-wellness-warning" },
  { emoji: "😢", label: "Sad", value: 1, color: "bg-destructive" },
];

interface MoodSelectorProps {
  onMoodSubmit: (mood: number, note: string) => void;
}

export const MoodSelector = ({ onMoodSubmit }: MoodSelectorProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (selectedMood !== null) {
      onMoodSubmit(selectedMood, note);
      setSelectedMood(null);
      setNote("");
    }
  };

  return (
    <Card className="shadow-mood border-wellness-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-wellness-primary">
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-5 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`
                p-4 rounded-xl transition-all duration-300 text-center
                ${selectedMood === mood.value 
                  ? 'scale-110 ring-4 ring-wellness-primary/50' 
                  : 'hover:scale-105'
                }
                ${mood.color}/20 hover:${mood.color}/30
              `}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium text-foreground">{mood.label}</div>
            </button>
          ))}
        </div>
        
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Any thoughts or notes? (optional)
          </label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Share what's on your mind..."
            className="border-wellness-primary/20 focus:border-wellness-primary"
          />
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={selectedMood === null}
          className="w-full bg-gradient-to-r from-wellness-primary to-wellness-secondary hover:from-wellness-primary/90 hover:to-wellness-secondary/90"
        >
          Record Mood
        </Button>
      </CardContent>
    </Card>
  );
};