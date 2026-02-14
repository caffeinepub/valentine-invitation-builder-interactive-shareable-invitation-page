import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Heart, Send, Copy, Check } from 'lucide-react';
import InvitationPreviewCard from '../components/InvitationPreviewCard';
import { useCreateInvitation } from '../hooks/useQueries';
import { useDraftState } from '../state/invitationDraft';

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState<'builder' | 'preview'>('builder');
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const { draft, updateDraft, clearDraft } = useDraftState();
  const createInvitation = useCreateInvitation();

  const handlePublish = async () => {
    if (!draft.inviterName || !draft.recipientName || !draft.message) {
      alert('Please fill in at least the inviter name, recipient name, and message fields.');
      return;
    }

    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      await createInvitation.mutateAsync({
        id,
        title: draft.inviterName,
        description: draft.message,
        location: draft.location || '',
        date: draft.date || '',
        time: draft.time || '',
      });

      const url = `${window.location.origin}/invite/${id}`;
      setPublishedUrl(url);
      clearDraft();
    } catch (error) {
      console.error('Failed to publish invitation:', error);
      alert('Failed to publish invitation. Please try again.');
    }
  };

  const handleCopyUrl = () => {
    if (publishedUrl) {
      navigator.clipboard.writeText(publishedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCreateAnother = () => {
    setPublishedUrl(null);
    setActiveTab('builder');
  };

  if (publishedUrl) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="shadow-2xl border-2 border-rose-200/50 bg-card/95 backdrop-blur">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
              <Heart className="h-8 w-8 text-white fill-white" />
            </div>
            <CardTitle className="text-3xl font-display">Invitation Published!</CardTitle>
            <CardDescription className="text-base">
              Your Valentine invitation is ready to share
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="share-url">Shareable Link</Label>
              <div className="flex gap-2">
                <Input
                  id="share-url"
                  value={publishedUrl}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  onClick={handleCopyUrl}
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => window.open(publishedUrl, '_blank')}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              >
                View Invitation
              </Button>
              <Button
                onClick={handleCreateAnother}
                variant="outline"
                className="flex-1"
              >
                Create Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8 space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img 
            src="/assets/generated/valentine-envelope.dim_768x768.png" 
            alt="" 
            className="w-16 h-16 object-contain"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
          yourlove
        </h1>
        <p className="text-muted-foreground text-lg">
          Create a beautiful, interactive invitation for your special someone
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'builder' | 'preview')} className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
          <TabsTrigger value="builder" className="text-base">
            <Heart className="h-4 w-4 mr-2" />
            Builder
          </TabsTrigger>
          <TabsTrigger value="preview" className="text-base">
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <Card className="shadow-xl border-2 border-rose-200/50 bg-card/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl font-display">Invitation Details</CardTitle>
              <CardDescription>Fill in the details for your Valentine invitation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="inviter">Your Name *</Label>
                  <Input
                    id="inviter"
                    placeholder="e.g., Alex"
                    value={draft.inviterName}
                    onChange={(e) => updateDraft({ inviterName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient's Name *</Label>
                  <Input
                    id="recipient"
                    placeholder="e.g., Jordan"
                    value={draft.recipientName}
                    onChange={(e) => updateDraft({ recipientName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Write a heartfelt message..."
                  value={draft.message}
                  onChange={(e) => updateDraft({ message: e.target.value })}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date (optional)</Label>
                  <Input
                    id="date"
                    type="date"
                    value={draft.date}
                    onChange={(e) => updateDraft({ date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time (optional)</Label>
                  <Input
                    id="time"
                    type="time"
                    value={draft.time}
                    onChange={(e) => updateDraft({ time: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location (optional)</Label>
                <Input
                  id="location"
                  placeholder="e.g., Our favorite café"
                  value={draft.location}
                  onChange={(e) => updateDraft({ location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="closing">Closing/Signature (optional)</Label>
                <Input
                  id="closing"
                  placeholder="e.g., With all my love"
                  value={draft.closing}
                  onChange={(e) => updateDraft({ closing: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handlePublish}
                  disabled={createInvitation.isPending}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white h-12 text-base"
                >
                  {createInvitation.isPending ? (
                    'Publishing...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Publish Invitation
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <InvitationPreviewCard
            inviterName={draft.inviterName}
            recipientName={draft.recipientName}
            message={draft.message}
            date={draft.date}
            time={draft.time}
            location={draft.location}
            closing={draft.closing}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
