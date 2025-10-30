import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', () => setIsPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/dfb00a3d-69b6-437e-ad82-0d8ee5650242/files/d13bf8ce-7418-454e-8bd3-8592b1a0209a.jpg')`,
          backgroundSize: '300px',
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-4" />
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-2">
              Татар Мәдәнияте
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-accent via-secondary to-primary mx-auto mt-4" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Безнең халыкның байлыгы һәм матурлыгы
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="overflow-hidden group hover-scale transition-all duration-300 border-2 border-primary/20 animate-fade-in">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/projects/dfb00a3d-69b6-437e-ad82-0d8ee5650242/files/d13bf8ce-7418-454e-8bd3-8592b1a0209a.jpg"
                alt="Татар орнаменты"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6 bg-card">
              <h2 className="text-3xl font-bold mb-3 text-primary">Орнамент</h2>
              <p className="text-muted-foreground leading-relaxed">
                Татар орнаменты — безнең халыкның рухи байлыгының символы. 
                Геометрик формалар һәм үсемлек мотивлары гасырлар буе кулланыла.
              </p>
            </div>
          </Card>

          <Card className="overflow-hidden group hover-scale transition-all duration-300 border-2 border-secondary/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="aspect-square relative overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/projects/dfb00a3d-69b6-437e-ad82-0d8ee5650242/files/bc8a49da-9adc-45d0-b48e-0249e3ce01bf.jpg"
                alt="Татар милли киеме"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6 bg-card">
              <h2 className="text-3xl font-bold mb-3 text-secondary">Милли Киемнәр</h2>
              <p className="text-muted-foreground leading-relaxed">
                Татар милли киеме — камзул, түбәтәй, читек — безнең тарихның һәм 
                мәдәниятнең күренекле билгеләре. Матур бизәкләр һәм төсләр.
              </p>
            </div>
          </Card>
        </div>

        <Card className="mb-12 p-8 border-2 border-accent/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Music" size={32} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-accent">Татар Җыры</h2>
              <p className="text-muted-foreground">Халык моңнары җыентыгыннан</p>
            </div>
          </div>

          <audio
            ref={audioRef}
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Icon 
                  name={isPlaying ? "Pause" : "Play"} 
                  size={24} 
                  className="text-primary-foreground"
                  style={{ marginLeft: isPlaying ? 0 : '2px' }}
                />
              </button>

              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(currentTime / duration) * 100}%, hsl(var(--muted)) ${(currentTime / duration) * 100}%, hsl(var(--muted)) 100%)`
                  }}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
                  <Icon name="Volume2" size={20} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-2 border-primary/30 bg-gradient-to-br from-card to-muted/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Icon name="BookOpen" size={32} className="text-primary-foreground" />
            </div>
            <h2 className="text-4xl font-bold text-accent">Әкият</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Акыллы Тиен</h3>
            
            <p className="text-foreground leading-relaxed mb-4">
              Борынгы заманнарда бер авылда бик акыллы тиен яшәгән. Ул бик матур 
              җырларга да, күп хикмәтле сүзләр әйтергә дә осталык белгән.
            </p>

            <p className="text-foreground leading-relaxed mb-4">
              Бер көнне тиен урманда бүре белән очраша. Бүре аны ашарга теләгән, 
              ләкин тиен әйткән: "Син мине ашамас алдыннан, мин сиңа бер матур 
              җыр җырлыйм инде."
            </p>

            <p className="text-foreground leading-relaxed mb-4">
              Бүре ризалашкан һәм тиен җырлый башлаган. Аның тавышы шулкадәр матур 
              булган ки, бүре күзләрен йомган һәм тыңларга тотынган.
            </p>

            <p className="text-foreground leading-relaxed mb-4">
              Шул вакытта акыллы тиен очып китә һәм куркынычсыз урынга барып утыра. 
              Бүре күзләрен ачкач, тиеннең юк булуын күрә һәм үз акылсызлыгына 
              үкенә башлый.
            </p>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
              <p className="text-lg font-semibold text-primary italic">
                Хикмәт: Акыл һәм зирәклек көчтән дә көчлерәк була ала.
              </p>
            </div>
          </div>
        </Card>

        <footer className="text-center mt-16 pt-8 border-t border-border">
          <div className="w-48 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-4" />
          <p className="text-muted-foreground">
            © 2024 Татар Мәдәнияте
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
