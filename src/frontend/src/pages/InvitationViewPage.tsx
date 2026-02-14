import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetInvitation } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Heart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import InvitationPreviewCard from '../components/InvitationPreviewCard';
import ValentineInteractions from '../components/ValentineInteractions';

export default function InvitationViewPage() {
  const { id } = useParams({ from: '/invite/$id' });
  const navigate = useNavigate();
  const { data: invitation, isLoading, error } = useGetInvitation(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="shadow-xl border-2 border-rose-200/50 bg-card/95 backdrop-blur">
          <CardContent className="py-12 text-center">
            <div className="animate-pulse space-y-4">
              <Heart className="h-12 w-12 mx-auto text-rose-400" />
              <p className="text-muted-foreground">Loading your invitation...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Alert variant="destructive" className="shadow-xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Invitation Not Found</AlertTitle>
          <AlertDescription>
            We couldn't find the invitation you're looking for. It may have been removed or the link might be incorrect.
          </AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
          <Button
            onClick={() => navigate({ to: '/' })}
            variant="outline"
            className="gap-2"
          >
            <Heart className="h-4 w-4" />
            Create Your Own Invitation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="relative">
        <InvitationPreviewCard
          inviterName={invitation.title}
          recipientName=""
          message={invitation.description}
          date={invitation.date}
          time={invitation.time}
          location={invitation.location}
          closing=""
          isPublicView
        />
        
        <ValentineInteractions />
      </div>
    </div>
  );
}
