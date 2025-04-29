import React from 'react';

// Example video URLs or local file paths
const videoData = [
  { id: 1, title: 'Video 1', url: 'path_to_video_1.mp4' },
  { id: 2, title: 'Video 2', url: 'path_to_video_2.mp4' },
  { id: 3, title: 'Video 3', url: 'path_to_video_3.mp4' },
  { id: 4, title: 'Video 4', url: 'path_to_video_4.mp4' },
  { id: 5, title: 'Video 5', url: 'path_to_video_5.mp4' },
  { id: 6, title: 'Video 6', url: 'path_to_video_6.mp4' },
  { id: 7, title: 'Video 7', url: 'path_to_video_7.mp4' },
  { id: 8, title: 'Video 8', url: 'path_to_video_8.mp4' },
  { id: 9, title: 'Video 9', url: 'path_to_video_9.mp4' },
];

function Aartifromations() {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Aarti Fromations - Video Gallery</h2>
      <div className="row">
        {videoData.map((video) => (
          <div key={video.id} className="col-md-4 mb-4">
            <div className="card">
              <video width="100%" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="card-body text-center">
                <h5 className="card-title">{video.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Aartifromations;
