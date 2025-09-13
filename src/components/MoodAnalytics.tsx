import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar, BarChart3, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface MoodData {
  mood: number;
  note: string;
  date: string;
}

interface MoodAnalyticsProps {
  moodData: MoodData[];
}

const moodColors = {
  1: "#ef4444", // Red - Sad
  2: "#f97316", // Orange - Down  
  3: "#eab308", // Yellow - Okay
  4: "#22c55e", // Green - Good
  5: "#10b981", // Emerald - Great
};

const moodLabels = {
  1: "Sad",
  2: "Down", 
  3: "Okay",
  4: "Good",
  5: "Great",
};

export const MoodAnalytics = ({ moodData }: MoodAnalyticsProps) => {
  const analytics = useMemo(() => {
    if (moodData.length === 0) return null;

    // Calculate average mood
    const averageMood = moodData.reduce((sum, entry) => sum + entry.mood, 0) / moodData.length;

    // Prepare data for trend chart (last 7 days)
    const trendData = moodData.slice(-7).map((entry, index) => ({
      day: `Day ${index + 1}`,
      mood: entry.mood,
      date: entry.date,
    }));

    // Calculate mood distribution
    const moodDistribution = Object.entries(moodLabels).map(([value, label]) => {
      const count = moodData.filter(entry => entry.mood === parseInt(value)).length;
      return {
        mood: label,
        count,
        percentage: ((count / moodData.length) * 100).toFixed(1),
        color: moodColors[parseInt(value) as keyof typeof moodColors],
      };
    }).filter(item => item.count > 0);

    // Calculate weekly comparison (if enough data)
    const weeklyData = [];
    if (moodData.length >= 7) {
      const thisWeek = moodData.slice(-7);
      const lastWeek = moodData.slice(-14, -7);
      
      const thisWeekAvg = thisWeek.reduce((sum, entry) => sum + entry.mood, 0) / thisWeek.length;
      const lastWeekAvg = lastWeek.length > 0 
        ? lastWeek.reduce((sum, entry) => sum + entry.mood, 0) / lastWeek.length 
        : thisWeekAvg;

      weeklyData.push(
        { period: "Last Week", average: Number(lastWeekAvg.toFixed(1)) },
        { period: "This Week", average: Number(thisWeekAvg.toFixed(1)) }
      );
    }

    return {
      averageMood,
      trendData,
      moodDistribution,
      weeklyData,
      totalEntries: moodData.length,
    };
  }, [moodData]);

  if (!analytics) {
    return (
      <Card className="border-wellness-secondary/20">
        <CardContent className="pt-6 text-center">
          <BarChart3 className="w-12 h-12 mx-auto text-wellness-secondary/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Data Yet</h3>
          <p className="text-muted-foreground">
            Start tracking your mood daily to see analytics and trends.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-wellness-secondary/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-wellness-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Average Mood</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {analytics.averageMood.toFixed(1)}/5
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-wellness-secondary/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-wellness-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Total Entries</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{analytics.totalEntries}</p>
          </CardContent>
        </Card>

        <Card className="border-wellness-secondary/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-wellness-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Best Mood</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {Math.max(...moodData.map(d => d.mood))}/5
            </p>
          </CardContent>
        </Card>

        <Card className="border-wellness-secondary/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-wellness-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Streak</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {Math.min(analytics.totalEntries, 7)} days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mood Trend Chart */}
      <Card className="border-wellness-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-wellness-secondary">
            <TrendingUp className="w-5 h-5" />
            Mood Trend (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.trendData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="day" 
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                domain={[1, 5]} 
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="hsl(var(--wellness-secondary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--wellness-secondary))', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: 'hsl(var(--wellness-secondary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mood Distribution */}
        <Card className="border-wellness-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-wellness-secondary">
              <BarChart3 className="w-5 h-5" />
              Mood Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analytics.moodDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="count"
                  label={({ mood, percentage }) => `${mood}: ${percentage}%`}
                  labelLine={false}
                >
                  {analytics.moodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Comparison */}
        {analytics.weeklyData.length > 0 && (
          <Card className="border-wellness-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-wellness-secondary">
                <Calendar className="w-5 h-5" />
                Weekly Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analytics.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="period" 
                    fontSize={12}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    domain={[1, 5]} 
                    fontSize={12}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar 
                    dataKey="average" 
                    fill="hsl(var(--wellness-secondary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};