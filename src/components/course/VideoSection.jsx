import { useState } from 'react';
import { PlayCircle } from 'lucide-react';

const VideoSection = ({ videos }) => {
    const [currentVideo, setCurrentVideo] = useState(videos[0]);
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                    <iframe 
                        className="w-full h-full" 
                        src={currentVideo.url} 
                        title={currentVideo.title} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
                <h3 className="text-xl font-bold text-text-primary mt-4">
                    {currentVideo.title}
                </h3>
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {videos.map((video, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrentVideo(video)} 
                        className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                            currentVideo.url === video.url 
                                ? 'bg-primary-hover' 
                                : 'bg-background hover:bg-border'
                        }`}
                    >
                        <PlayCircle 
                            className={`text-primary mt-1 flex-shrink-0 ${
                                currentVideo.url === video.url ? '' : 'opacity-50'
                            }`} 
                        />
                        <div>
                            <p className="font-semibold text-text-primary leading-tight">
                                {video.title}
                            </p>
                            <p className="text-xs text-text-tertiary">{video.duration}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default VideoSection;