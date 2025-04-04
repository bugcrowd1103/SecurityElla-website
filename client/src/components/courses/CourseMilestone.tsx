import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { 
  Award, 
  CheckCircle2,
  Share2,
  Lock
} from 'lucide-react';
import SocialShare from '@/components/shared/SocialShare';
import type { CourseMilestone as CourseMilestoneType } from '@shared/schema';

interface CourseMilestoneProps {
  milestone: CourseMilestoneType;
  isCompleted?: boolean;
  isLocked?: boolean;
  onComplete?: (milestoneId: number) => void;
}

const CourseMilestone: React.FC<CourseMilestoneProps> = ({
  milestone,
  isCompleted = false,
  isLocked = false,
  onComplete
}) => {
  const [showShare, setShowShare] = useState(false);

  const handleCompleteClick = () => {
    if (onComplete) {
      onComplete(milestone.id);
    }
  };

  const toggleShare = () => {
    setShowShare(!showShare);
  };

  return (
    <Card className={`mb-4 transition-all ${isCompleted ? 'border-green-200 bg-green-50' : isLocked ? 'border-gray-200 bg-gray-50 opacity-75' : 'border-blue-100 hover:border-blue-200'}`}>
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {milestone.achievementBadge ? (
              <div className="rounded-full bg-blue-100 p-2 mr-2">
                <img 
                  src={milestone.achievementBadge} 
                  alt={`${milestone.title} badge`} 
                  className="h-8 w-8"
                />
              </div>
            ) : (
              <div className="rounded-full bg-blue-100 p-2 mr-2">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">{milestone.title}</h3>
              <div className="flex gap-2 mt-1">
                <Badge 
                  variant={isCompleted ? "secondary" : isLocked ? "outline" : "secondary"} 
                  className={`text-xs ${isCompleted ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}`}
                >
                  {isCompleted ? 'Completed' : isLocked ? 'Locked' : `Milestone ${milestone.order}`}
                </Badge>
              </div>
            </div>
          </div>
          {isCompleted && (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          )}
          {isLocked && (
            <Lock className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{milestone.description}</p>
        
        {showShare && isCompleted && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-gray-100">
            <SocialShare 
              title={`${milestone.title} Achievement`}
              text={milestone.shareableText}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-1 flex justify-between">
        {isCompleted ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-blue-600" 
            onClick={toggleShare}
          >
            <Share2 className="mr-2 h-4 w-4" />
            {showShare ? 'Hide sharing options' : 'Share this achievement'}
          </Button>
        ) : !isLocked ? (
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleCompleteClick}
          >
            Mark as completed
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            disabled
          >
            <Lock className="mr-2 h-4 w-4" />
            Complete previous milestones first
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseMilestone;