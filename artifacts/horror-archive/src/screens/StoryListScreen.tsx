import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ScreenState } from '../App';
import { AdsgramBanner } from '../components/AdsgramBanner';

interface StoryEntry {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  link: string;
  thumbnail?: string;
}

export function StoryListScreen({ 
  type, 
  onNavigate 
}: { 
  type: 'stories-id' | 'stories-en' | 'stories-jp';
  onNavigate: (screen: ScreenState) => void;
}) {
  const [stories, setStories] = useState<StoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (type === 'stories-jp') {
      setLoading(false);
      return;
    }

    const parseEntries = (data: any): StoryEntry[] => {
      const entries = data?.feed?.entry || [];
      return entries.map((entry: any) => {
        const linkObj = entry.link?.find((l: any) => l.rel === 'alternate');
        const link = linkObj ? linkObj.href : '#';

        const rawContent = entry.content?.$t || entry.summary?.$t || '';
        const tmp = document.createElement('DIV');
        tmp.innerHTML = rawContent;
        const textContent = tmp.textContent || tmp.innerText || '';
        const excerpt = textContent.trim().substring(0, 180) + '...';

        // Blogger thumbnail — upgrade ke ukuran lebih besar
        let thumbnail: string | undefined = entry.media$thumbnail?.url;
        if (thumbnail) {
          thumbnail = thumbnail.replace(/\/s[0-9]+-c\//, '/s400/').replace(/=s[0-9]+-c$/, '=s400');
        }
        if (!thumbnail) {
          const imgMatch = rawContent.match(/<img[^>]+src=["']([^"']+)["']/);
          if (imgMatch) thumbnail = imgMatch[1];
        }

        const date = new Date(entry.published?.$t).toLocaleDateString('id-ID', {
          year: 'numeric', month: 'long', day: 'numeric'
        });

        return {
          id: entry.id?.$t ?? link,
          title: entry.title?.$t ?? '(Tanpa Judul)',
          excerpt,
          date,
          link,
          thumbnail
        };
      });
    };

    const fetchStories = async () => {
      setLoading(true);
      setError(false);

      const feedBase = type === 'stories-id'
        ? 'https://triwidmui-horor-indo.blogspot.com/feeds/posts/default'
        : 'https://triwidmui-en-horror.blogspot.com/feeds/posts/default';

      const directUrl = `${feedBase}?alt=json&max-results=20`;
      const proxyUrl  = `https://api.allorigins.win/raw?url=${encodeURIComponent(directUrl)}`;

      try {
        // Coba langsung dulu
        let res = await fetch(directUrl);
        if (!res.ok) throw new Error('direct failed');
        const data = await res.json();
        setStories(parseEntries(data));
      } catch {
        try {
          // Fallback: pakai CORS proxy
          const res2 = await fetch(proxyUrl);
          if (!res2.ok) throw new Error('proxy failed');
          const data2 = await res2.json();
          setStories(parseEntries(data2));
        } catch (err) {
          console.error("Failed to fetch stories:", err);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [type]);

  const blogUrl = type === 'stories-id' 
    ? 'https://triwidmui-horor-indo.blogspot.com/'
    : 'https://triwidmui-en-horror.blogspot.com/';

  // Japan Pixiv Screen
  if (type === 'stories-jp') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center w-full max-w-4xl px-4 py-8"
      >
        <button 
          onClick={() => onNavigate('read')}
          className="self-start mb-8 text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-mono uppercase text-sm tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO LANGUAGES
        </button>

        <div className="w-full relative border-2 border-primary/20 bg-black overflow-hidden flex flex-col items-center pb-16">
          <div className="w-full h-64 md:h-96 relative border-b-2 border-primary/20 overflow-hidden">
            <img src="/oni-demon.jpg" alt="Oni Demon" className="w-full h-full object-cover object-center opacity-70 sepia-[0.3]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <h2 className="font-display text-4xl md:text-6xl text-primary mt-12 mb-6 tracking-widest text-center px-4">
            Pixiv Novels — 日本語ホラー小説
          </h2>
          
          <p className="text-muted-foreground font-serif text-lg md:text-xl text-center max-w-2xl px-8 mb-12">
            Triwid Mui's Japanese horror novels are published on Pixiv. Step into the realm of Yokai and Japanese urban legends.
          </p>

          <a 
            href="https://www.pixiv.net/en/users/117291873/novels"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-primary text-black font-display tracking-widest text-2xl hover:bg-accent transition-colors shadow-[0_0_20px_rgba(139,0,0,0.5)] hover:shadow-[0_0_30px_rgba(204,0,0,0.8)]"
          >
            READ ON PIXIV <ExternalLink size={24} />
          </a>
        </div>
      </motion.div>
    );
  }

  const title = type === 'stories-id' ? 'ARSIP INDONESIA' : 'ENGLISH ARCHIVES';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full max-w-4xl px-4 py-8"
    >
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={() => onNavigate('read')}
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-mono uppercase text-sm tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {type === 'stories-id' ? 'Kembali' : 'Back'}
        </button>
        <h2 className="font-display text-3xl md:text-5xl text-primary tracking-widest glitch-hover" data-text={title}>
          {title}
        </h2>
      </div>

      <AdsgramBanner />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin"></div>
          <p className="font-mono text-muted-foreground tracking-widest text-sm animate-pulse">
            {type === 'stories-id' ? 'Menarik jiwa dari kegelapan...' : 'Summoning lost souls...'}
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 border border-primary/20 bg-card/10 p-8 text-center">
          <p className="font-display text-2xl text-primary mb-4 tracking-widest">SINYAL TERPUTUS</p>
          <p className="text-muted-foreground font-serif italic text-sm">
            {type === 'stories-id'
              ? 'Arsip tidak dapat dijangkau. Coba lagi nanti.'
              : 'Archive unreachable. Please try again later.'}
          </p>
        </div>
      ) : stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-border bg-card/10 text-center">
          <p className="font-display text-2xl text-muted-foreground tracking-widest">
            {type === 'stories-id' ? 'Arsip masih kosong...' : 'Archive is empty...'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {stories.map((story) => (
            <a 
              key={story.id} 
              href={story.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col md:flex-row border border-border bg-card/20 hover:bg-card/60 hover:border-primary/50 transition-all duration-300 group overflow-hidden"
            >
              {story.thumbnail && (
                <div className="w-full md:w-48 h-48 md:h-auto border-b md:border-b-0 md:border-r border-border overflow-hidden shrink-0">
                  <img src={story.thumbnail} alt={story.title} className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              )}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <p className="font-mono text-xs text-primary/70 mb-3 tracking-widest">{story.date}</p>
                  <h3 className="font-display text-2xl text-foreground mb-3 tracking-wide group-hover:text-primary transition-colors">{story.title}</h3>
                  <p className="font-serif text-muted-foreground italic text-sm leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-primary/60 group-hover:text-primary transition-colors tracking-widest uppercase">
                  Baca Selengkapnya <ExternalLink size={12} />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
      
      <div className="mt-12 flex justify-center">
        <a 
          href={blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 border border-border px-6 py-3 hover:bg-primary/10"
        >
          {type === 'stories-id' ? 'Kunjungi Blog Utama' : 'Visit Main Blog'} <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
}
