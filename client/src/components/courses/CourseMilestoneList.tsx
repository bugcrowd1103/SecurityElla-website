import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import CourseMilestone from './CourseMilestone';
import { Separator } from '@/components/ui/separator';
import { Trophy, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { CourseMilestone as CourseMilestoneType } from '@shared/schema';

interface CourseMilestoneListProps {
  courseId: number;
}

const CourseMilestoneList: React.FC<CourseMilestoneListProps> = ({ courseId }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // This would come from user progress in a real application
  const [completedMilestones, setCompletedMilestones] = useState<number[]>([]);
  
  const { data: milestones, isLoading, error } = useQuery<CourseMilestoneType[]>({
    queryKey: ['/api/courses', courseId, 'milestones'],
    queryFn: async () => {
      const response = await apiRequest(`/api/courses/${courseId}/milestones`);
      return response.json();
    },
  });

  const completeMutation = useMutation({
    mutationFn: (milestoneId: number) => {
      // In a real app, this would be a call to update user progress
      // For demo, we'll just simulate success with a delay
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
    },
    onSuccess: (_, milestoneId) => {
      setCompletedMilestones(prev => [...prev, milestoneId]);
      
      // Find the milestone to get its title for the toast
      const milestone = milestones?.find((m: CourseMilestoneType) => m.id === milestoneId);
      
      toast({
        title: `Achievement Unlocked!`,
        description: `${milestone?.title} milestone completed successfully.`,
        duration: 5000,
      });
    }
  });

  const handleCompleteMilestone = (milestoneId: number) => {
    completeMutation.mutate(milestoneId);
  };

  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !milestones) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-500">Failed to load course milestones</p>
      </div>
    );
  }

  if (milestones.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No milestones available for this course yet</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <Trophy className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-bold">Course Milestones</h2>
      </div>
      <Separator className="my-2" />
      
      <div className="mt-4 space-y-4">
        {milestones.map((milestone: CourseMilestoneType, index: number) => {
          const isCompleted = completedMilestones.includes(milestone.id);
          // A milestone is locked if any previous milestone is not completed
          const isLocked = index > 0 && !completedMilestones.includes(milestones[index - 1].id);
          
          return (
            <CourseMilestone
              key={milestone.id}
              milestone={milestone}
              isCompleted={isCompleted}
              isLocked={isLocked}
              onComplete={handleCompleteMilestone}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseMilestoneList;