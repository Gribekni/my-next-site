"use client";
import { useState } from "react";
import headerStyles from './Header.module.css';
import genreGridStyles from './GenreGrid.module.css';
import tabsStyles from './Tabs.module.css';
import favoritesStyles from './FavoritesPage.module.css';
import trackTabStyles from './TrackTab.module.css';

const tracks = [
  { genre: "House", artist: "Tiёsto", file: "house.mp3", title: "House Track" },
  { genre: "Tech House", artist: "Mau P / Pawsa", file: "techhouse.mp3", title: "Tech House Track" },
  { genre: "Deep House", artist: "Lost Frequencies", file: "deephouse.mp3", title: "Deep House Track" },
  { genre: "Jungle", artist: "Deekline", file: "jungle.mp3", title: "Jungle Track" },
  { genre: "Drum'n'Bass", artist: "Chase & Status", file: "drumnbass.mp3", title: "Drum'n'Bass Track" },
  { genre: "Breaks", artist: "3D Stas", file: "breaks.mp3", title: "Breaks Track" },
  { genre: "Breakbeat", artist: "Bicep", file: "breakbeat.mp3", title: "Breakbeat Track" },
  { genre: "Dubstep", artist: "Skrillex", file: "dubstep.mp3", title: "Dubstep Track" },
  { genre: "Afro House", artist: "Keinemusic", file: "afrohouse.mp3", title: "Afro House Track" },
  { genre: "Phonk", artist: "DVRST", file: "phonk.mp3", title: "Phonk Track" },
  { genre: "Ambient", artist: "Aphex Twin", file: "ambient.mp3", title: "Ambient Track" },
  { genre: "Mainstage", artist: "David Guetta", file: "mainstage.mp3", title: "Mainstage Track" },
  { genre: "Progressive House", artist: "Martin Garrix", file: "progressivehouse.mp3", title: "Progressive House Track" },
  { genre: "Trance", artist: "Armin Van Buuren", file: "trance.mp3", title: "Trance Track" },
  { genre: "Techno", artist: "Anyma", file: "techno.mp3", title: "Techno Track" },
  { genre: "Disco", artist: "Purple Disco Machine", file: "disco.mp3", title: "Disco Track" },
];

const genreColors = [
  "#ffb347", "#b0b0b0", "#1e90ff", "#228b22",
  "#8a2be2", "#ffd700", "#ff6347", "#222222",
  "#e67e22", "#c71585", "#87ceeb", "#ff4500",
  "#00ced1", "#9400d3", "#333333", "#ffe135",
];

export default function Home() {
  const [tab, setTab] = useState<"catalog" | "favorites" | "track">("catalog");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const toggleFavorite = (i: number) => {
    setFavorites((prev) =>
      prev.includes(i) ? prev.filter((idx) => idx !== i) : [...prev, i]
    );
  };

  const openTrack = (i: number) => {
    setSelectedGenre(i);
    setTab("track");
  };

  return (
    <>
      <header className={headerStyles['site-header']}>
        <img src="/mussic.png" alt="Логотип" className={headerStyles['site-logo']} />
        <div className={headerStyles['site-title-block']}>
          <h1 className={headerStyles['site-title']}>
            Mu<span className={headerStyles['seek-accent']}>Seek</span>
          </h1>
          <div className={headerStyles['site-subtitle']}>Новинки электронной музыки</div>
        </div>
        <div className={headerStyles['header-spacer']} />
        <input
          className={headerStyles['search-input']}
          type="text"
          placeholder="Поиск по трекам..."
          autoComplete="off"
        />
        <div className={headerStyles['login-wrapper']}>
          <button className={headerStyles['login-btn']}>Войти</button>
          <div className={headerStyles['login-menu']}>
            <input type="email" placeholder="Почта" />
            <input type="password" placeholder="Пароль" />
            <button className={headerStyles['login-submit']}>Войти</button>
          </div>
        </div>
      </header>
      <nav className={tabsStyles.tabs}>
        <button
          className={tab === "catalog" ? `${tabsStyles.tab} ${tabsStyles.active}` : tabsStyles.tab}
          onClick={() => setTab("catalog")}
        >
          Каталог жанров
        </button>
        <button
          className={tab === "favorites" ? `${tabsStyles.tab} ${tabsStyles.active}` : tabsStyles.tab}
          onClick={() => setTab("favorites")}
        >
          Избранные жанры
        </button>
      </nav>
      <main>
        {tab === "catalog" && (
          <div className={genreGridStyles['genre-grid']}>
            {tracks.map((track, i) => (
              <div className={genreGridStyles['genre-cell']} key={i}>
                <div
                  className={genreGridStyles['genre-card']}
                  style={{ background: genreColors[i], cursor: "pointer" }}
                  onClick={() => openTrack(i)}
                >
                  <span
                    className={genreGridStyles['favorite-icon-perm']}
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(i);
                    }}
                    style={{
                      color: favorites.includes(i) ? "#ff4d6d" : "#fff",
                      opacity: favorites.includes(i) ? 1 : 0.4,
                    }}
                    title={favorites.includes(i) ? "Убрать из избранного" : "Добавить в избранное"}
                  >
                    &#10084;
                  </span>
                </div>
                <span className={genreGridStyles['genre-label']}>{track.genre}</span>
                <span className={genreGridStyles['genre-number']}>{track.artist}</span>
              </div>
            ))}
          </div>
        )}
        {tab === "favorites" && (
          <div className={favoritesStyles['favorites-page']}>
            {favorites.length === 0 ? (
              <div className={favoritesStyles['empty-favorites']}>
                Здесь пусто. Вы можете добавить жанры из{" "}
                <span
                  className={favoritesStyles['catalog-link']}
                  onClick={() => setTab("catalog")}
                  tabIndex={0}
                  role="button"
                >
                  каталога
                </span>
                .
              </div>
            ) : (
              <div className={genreGridStyles['genre-grid']}>
                {favorites.map((i) => (
                  <div className={genreGridStyles['genre-cell']} key={i}>
                    <div
                      className={genreGridStyles['genre-card']}
                      style={{ background: genreColors[i], cursor: "pointer" }}
                      onClick={() => openTrack(i)}
                    >
                      <span
                        className={genreGridStyles['favorite-icon-perm']}
                        style={{
                          color: "#ff4d6d",
                          opacity: 1,
                        }}
                        title="В избранном"
                      >
                        &#10084;
                      </span>
                    </div>
                    <span className={genreGridStyles['genre-label']}>{tracks[i].genre}</span>
                    <span className={genreGridStyles['genre-number']}>{tracks[i].artist}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab === "track" && selectedGenre !== null && (
          <div className={trackTabStyles['track-tab']}>
            <button onClick={() => setTab("catalog")} className={trackTabStyles['back-btn']}>
              ← Назад к жанрам
            </button>
            <h2>{tracks[selectedGenre].genre}</h2>
            <p>
              {tracks[selectedGenre].artist} — {tracks[selectedGenre].title}
            </p>
            <audio controls style={{ width: "100%", maxWidth: 400 }}>
              <source src={`/audio/${tracks[selectedGenre].file}`} type="audio/mpeg" />
              Ваш браузер не поддерживает аудио.
            </audio>
          </div>
        )}
      </main>
      <footer className="footer">
  <div className="footer-links">
    <a href="mailto:gribov.re@yandex.ru" className="footer-link" target="_blank" rel="noopener noreferrer"><em>Email</em></a>
    <a href="https://github.com/gribekni" className="footer-link" target="_blank" rel="noopener noreferrer"><em>GitHub</em></a>
    <a href="https://t.me/voIokna" className="footer-link" target="_blank" rel="noopener noreferrer"><em>Telegram</em></a>
  </div>
  <div className="footer-copy">
    © 2025 Электронная музыка
  </div>
</footer>
    </>
  );
}