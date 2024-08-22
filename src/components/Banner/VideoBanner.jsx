import React from 'react';
import './VideoBanner.css'; 

const VideoBanner = () => {
  return (
    <div className="video-banner-container">
      <div className="banner-row">
        <img
          className="background-img"
          src="https://http2.mlstatic.com/D_NQ_829617-MLU74642844308_022024-OO.webp"
          alt="Transformers: O último cavaleiro"
        />
        <span className="gradient-banner"></span>
        <div className="col">
          <a className="banner-link" title="Transformers: O último cavaleiro">
            <div className="banner-logo-text">
              <img
                className="logo"
                src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/touchpoint_trailer/logo-mercado-play-v3.png"
                alt="Agora você pode assistir séries e filmes"
              />
              <div className="text">
                <span className="primary-title">Agora você pode assistir</span>
                <br/>
                <br/>
                <span className="secondary-title">séries e filmes</span>
                <br/>
                <span className="pill" style={{ backgroundColor: '#00A650' }}>grátis</span>
              </div>
            </div>
          </a>
        </div>
        <div className="col">
          <div className="video-wrapper-trailer">
            <div
              className="video-player-wrapper"
              role="region"
              aria-label="Video Player"
            >
              <video 
                      title="Advertisement"
                      webkit-playsinline="true"
                      playsinline="true"
                      src="https://redirector.gvt1.com/videoplayback/id/8630bc17ff2f59a0/itag/106/source/dclk_video_ads/acao/yes/cpn/sEICnLQVAYzFaHoo/ctier/L/ei/-fLFZuLeCMCR-LAPnu-S2Q8/ip/0.0.0.0/requiressl/yes/susc/dvc/xpc/Eghovf3BOnoBAQ%3D%3D/expire/1755784825/sparams/expire,ei,ip,requiressl,acao,ctier,source,id,itag,susc,xpc/sig/AJfQdSswRgIhAMZALuU6I63HrtNlL08Sr7ssyri0A7ZDtuIitA855ZK0AiEA-_Xzn0aB8zcYgWSdWxBsPpgQqMQrHsktxDgv2H4OZ24%3D/file/file.mp4"
                      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
                    ></video>
                    <iframe 
                    src="https://imasdk.googleapis.com/js/core/bridge3.660.0_pt_br.html#goog_434567082"
                    allowFullScreen
                    allow="autoplay"
                    title="Advertisement"
                  ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
