import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heart, Calendar, Clock, MapPin } from 'lucide-react';

interface InvitationPreviewCardProps {
  inviterName: string;
  recipientName: string;
  message: string;
  date?: string;
  time?: string;
  location?: string;
  closing?: string;
  isPublicView?: boolean;
}

export default function InvitationPreviewCard({
  inviterName,
  recipientName,
  message,
  date,
  time,
  location,
  closing,
  isPublicView = false,
}: InvitationPreviewCardProps) {
  const isEmpty = !inviterName && !recipientName && !message;

  if (isEmpty && !isPublicView) {
    return (
      <Card className="shadow-xl border-2 border-rose-200/50 bg-card/95 backdrop-blur">
        <CardContent className="py-16 text-center">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground text-lg">
            Your invitation preview will appear here
          </p>
          <p className="text-muted-foreground/70 text-sm mt-2">
            Start filling in the details to see your beautiful invitation
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl border-2 border-rose-200/50 bg-gradient-to-br from-rose-50/95 to-pink-50/95 dark:from-rose-950/40 dark:to-pink-950/40 backdrop-blur relative overflow-hidden">
      {/* Decorative stickers */}
      <div className="absolute top-4 right-4 w-16 h-16 opacity-20 pointer-events-none">
        <img 
          src="/assets/generated/valentine-stickers-set.dim_1024x1024.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>

      <CardHeader className="text-center space-y-4 pb-6">
        <div className="flex justify-center gap-2">
          <Heart className="h-8 w-8 text-rose-500 fill-rose-500 animate-pulse" />
          <Heart className="h-6 w-6 text-pink-400 fill-pink-400 animate-pulse delay-100" />
          <Heart className="h-8 w-8 text-rose-500 fill-rose-500 animate-pulse delay-200" />
        </div>
        
        {recipientName && !isPublicView && (
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Dear {recipientName},
          </h2>
        )}
      </CardHeader>

      <CardContent className="space-y-6 px-6 md:px-12 pb-12">
        {message && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed whitespace-pre-wrap text-foreground/90 font-serif italic">
              {message}
            </p>
          </div>
        )}

        {(date || time || location) && (
          <div className="space-y-3 pt-4 border-t border-rose-200/50">
            {date && (
              <div className="flex items-center gap-3 text-foreground/80">
                <Calendar className="h-5 w-5 text-rose-500 shrink-0" />
                <span className="font-medium">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}

            {time && (
              <div className="flex items-center gap-3 text-foreground/80">
                <Clock className="h-5 w-5 text-rose-500 shrink-0" />
                <span className="font-medium">{time}</span>
              </div>
            )}

            {location && (
              <div className="flex items-center gap-3 text-foreground/80">
                <MapPin className="h-5 w-5 text-rose-500 shrink-0" />
                <span className="font-medium">{location}</span>
              </div>
            )}
          </div>
        )}

        {closing && (
          <div className="pt-6 text-right">
            <p className="text-lg font-serif italic text-foreground/80">{closing}</p>
          </div>
        )}

        {inviterName && (
          <div className="pt-4 text-right">
            <p className="text-xl font-display font-semibold text-foreground">
              {inviterName}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
