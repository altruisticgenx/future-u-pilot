import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/types/terminal';

export const useTerminalMessages = (projectId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('terminal_messages')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data.map(msg => ({
          id: msg.id,
          type: msg.message_type as Message['type'],
          content: msg.content,
          metadata: msg.metadata as Record<string, any>,
          timestamp: new Date(msg.created_at),
        })));
      }
      setLoading(false);
    };

    fetchMessages();

    const channel = supabase
      .channel(`terminal-messages-${projectId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'terminal_messages',
        filter: `project_id=eq.${projectId}`,
      }, (payload) => {
        const newMessage: Message = {
          id: payload.new.id,
          type: payload.new.message_type as Message['type'],
          content: payload.new.content,
          metadata: payload.new.metadata as Record<string, any>,
          timestamp: new Date(payload.new.created_at),
        };
        setMessages(prev => [...prev, newMessage]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  const addMessage = async (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!projectId) return;

    const { error } = await supabase
      .from('terminal_messages')
      .insert({
        project_id: projectId,
        message_type: message.type,
        content: message.content,
        metadata: message.metadata,
      });

    if (error) {
      console.error('Error adding message:', error);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return { messages, loading, addMessage, clearMessages };
};
