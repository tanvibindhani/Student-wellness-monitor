import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar, Save, Book, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JournalEntryData {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: number;
}

interface JournalEntryProps {
  entries: JournalEntryData[];
  onAddEntry: (entry: Omit<JournalEntryData, 'id'>) => void;
}

export const JournalEntry = ({ entries, onAddEntry }: JournalEntryProps) => {
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSaveEntry = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please add both a title and content for your journal entry.",
        variant: "destructive",
      });
      return;
    }

    onAddEntry({
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString(),
    });

    setTitle("");
    setContent("");
    setIsWriting(false);
    
    toast({
      title: "Journal entry saved!",
      description: "Your thoughts have been recorded successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Add New Entry */}
      <Card className="border-wellness-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-wellness-primary">
            <Book className="w-5 h-5" />
            Journal Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isWriting ? (
            <Button
              onClick={() => setIsWriting(true)}
              className="w-full bg-gradient-to-r from-wellness-accent to-wellness-primary hover:from-wellness-accent/90 hover:to-wellness-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Write New Entry
            </Button>
          ) : (
            <div className="space-y-4">
              <Input
                placeholder="Entry title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-wellness-accent/20 focus:border-wellness-accent"
              />
              <Textarea
                placeholder="What's on your mind today? Write about your thoughts, feelings, experiences, or anything you'd like to remember..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="border-wellness-accent/20 focus:border-wellness-accent resize-none"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveEntry}
                  className="bg-gradient-to-r from-wellness-success to-wellness-accent hover:from-wellness-success/90 hover:to-wellness-accent/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Entry
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsWriting(false);
                    setTitle("");
                    setContent("");
                  }}
                  className="border-wellness-accent/20 hover:bg-wellness-accent/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Recent Entries</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {entries.slice(0, 6).map((entry) => (
              <Card key={entry.id} className="border-wellness-accent/20 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-wellness-primary line-clamp-1">
                      {entry.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {entry.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                    {entry.content}
                  </p>
                  {entry.content.length > 150 && (
                    <Button
                      variant="link"
                      className="text-wellness-accent hover:text-wellness-primary p-0 h-auto mt-2"
                    >
                      Read more...
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {entries.length > 6 && (
            <div className="text-center">
              <Button
                variant="outline"
                className="border-wellness-accent/20 hover:bg-wellness-accent/10"
              >
                View All Entries ({entries.length})
              </Button>
            </div>
          )}
        </div>
      )}

      {entries.length === 0 && !isWriting && (
        <Card className="border-wellness-accent/20">
          <CardContent className="pt-6 text-center">
            <Book className="w-12 h-12 mx-auto text-wellness-accent/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Start Your Journal</h3>
            <p className="text-muted-foreground mb-4">
              Begin documenting your thoughts, experiences, and emotional journey.
            </p>
            <Button
              onClick={() => setIsWriting(true)}
              className="bg-gradient-to-r from-wellness-accent to-wellness-primary hover:from-wellness-accent/90 hover:to-wellness-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Write Your First Entry
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};