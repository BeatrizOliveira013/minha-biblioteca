import { useState } from 'react'
import './App.css'

const books = [
  { title: 'Dom Casmurro', author: 'Machado de Assis', progress: 68, cover: 'dom' },
  { title: 'A Relíquia', author: 'Eça de Queirós', progress: 42, cover: 'relic' },
]

const features = [
  {
    icon: 'shelf',
    title: 'Sua estante, do seu jeito',
    description:
      'Organize seus livros em estantes personalizadas e encontre qualquer leitura num instante.',
  },
  {
    icon: 'progress',
    title: 'Acompanhe cada página',
    description:
      'Veja seu progresso, registre suas leituras e celebre cada livro terminado.',
  },
  {
    icon: 'spark',
    title: 'Novas histórias esperam',
    description:
      'Guarde os livros que despertam sua curiosidade e monte sua próxima lista de leitura.',
  },
]

function Icon({ name, className = '' }) {
  const paths = {
    book: (
      <>
        <path d="M12 7v14" />
        <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v18H5.5A2.5 2.5 0 0 0 3 23.5z" />
        <path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H12v18h6.5a2.5 2.5 0 0 1 2.5 2.5z" />
      </>
    ),
    shelf: (
      <>
        <path d="M4 20V5" />
        <path d="M20 20V5" />
        <path d="M4 9h16" />
        <path d="M4 15h16" />
        <path d="M8 5v4" />
        <path d="M14 5v4" />
        <path d="M10 10v5" />
        <path d="M16 10v5" />
        <path d="M7 16v4" />
        <path d="M13 16v4" />
      </>
    ),
    progress: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h17" />
        <path d="m7 15 4-4 3 2 6-7" />
        <path d="M16 6h4v4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2z" />
        <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  )
}

function BookCover({ book, small = false }) {
  return (
    <div
      aria-label={`Capa ilustrativa de ${book.title}`}
      className={`book-cover book-cover--${book.cover}${small ? ' book-cover--small' : ''}`}
      role="img"
    >
      <span className="cover-ornament" />
      <span className="cover-title">{book.title}</span>
      <span className="cover-author">{book.author}</span>
    </div>
  )
}

function AppPreview() {
  return (
    <div aria-label="Prévia do aplicativo Minha Biblioteca" className="app-window">
      <div className="window-topbar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="preview-content">
        <div className="preview-heading">
          <div>
            <span className="eyebrow">SUA ESTANTE</span>
            <h2>Olá, leitora.</h2>
          </div>
          <span className="avatar">B</span>
        </div>
        <div className="reading-card">
          <BookCover book={books[0]} />
          <div className="reading-info">
            <span className="eyebrow">LENDO AGORA</span>
            <h3>{books[0].title}</h3>
            <p>{books[0].author}</p>
            <div className="progress-label">
              <span>Seu progresso</span>
              <strong>{books[0].progress}%</strong>
            </div>
            <div
              aria-label={`Progresso de leitura: ${books[0].progress}%`}
              className="progress-track"
              role="progressbar"
              aria-valuenow={books[0].progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span style={{ width: `${books[0].progress}%` }} />
            </div>
          </div>
        </div>
        <div className="queue-heading">
          <h3>Próximos na fila</h3>
          <span>Ver estante <span aria-hidden="true">→</span></span>
        </div>
        <div className="queue-list">
          {books.slice(1).map((book) => (
            <div className="queue-book" key={book.title}>
              <BookCover book={book} small />
              <div>
                <strong>{book.title}</strong>
                <span>{book.author}</span>
              </div>
              <span className="queue-book-more" aria-hidden="true">···</span>
            </div>
          ))}
          <div className="queue-book queue-book--placeholder" aria-hidden="true">
            <span className="placeholder-cover"><Icon name="book" /></span>
            <div>
              <strong>Uma nova história</strong>
              <span>Adicione à sua lista</span>
            </div>
            <span className="queue-book-more">+</span>
          </div>
        </div>
      </div>
      <div className="preview-decoration preview-decoration--one" aria-hidden="true" />
      <div className="preview-decoration preview-decoration--two" aria-hidden="true" />
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a aria-label="Minha Biblioteca - início" className="brand" href="#inicio" onClick={closeMenu}>
            <span className="brand-mark"><Icon name="book" /></span>
            <span>Minha Biblioteca</span>
          </a>
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
          <nav aria-label="Navegação principal" className={menuOpen ? 'site-nav site-nav--open' : 'site-nav'}>
            <a href="#inicio" onClick={closeMenu}>Início</a>
            <a href="#recursos" onClick={closeMenu}>Recursos</a>
            <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
            <a href="#sobre" onClick={closeMenu}>Sobre</a>
          </nav>
        </div>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="hero-section" id="inicio">
          <div className="hero-inner page-container">
            <div className="hero-copy">
              <span className="eyebrow hero-eyebrow">O SEU DIÁRIO LITERÁRIO DEFINITIVO</span>
              <h1 id="hero-title">Sua biblioteca. Seus livros. Do seu jeito.</h1>
              <p className="hero-description">
                Organize sua coleção, acompanhe suas leituras e descubra novos livros
                em um só lugar. Uma experiência poética e focada, feita sob medida
                para quem ama a leitura.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="#recursos">Começar agora</a>
                <a className="button button--secondary" href="#como-funciona">Conhecer o app</a>
              </div>
              <div className="social-proof">
                <span aria-label="5 estrelas" className="star-rating">☆ ☆ ☆ ☆ ☆</span>
                <span>Mais de 15.000 leitores organizando suas estantes virtuais.</span>
              </div>
            </div>
            <div className="hero-visual">
              <AppPreview />
            </div>
          </div>
        </section>

        <section aria-labelledby="features-title" className="features-section section-pad" id="recursos">
          <div className="page-container">
            <div className="section-heading">
              <span className="eyebrow">UM LUGAR PARA CADA HISTÓRIA</span>
              <h2 id="features-title">Tudo o que sua vida de leitura precisa.</h2>
              <p>Menos tempo procurando. Mais tempo vivendo outras histórias.</p>
            </div>
            <div className="feature-grid">
              {features.map((feature, index) => (
                <article className="feature-card" key={feature.title}>
                  <span className="feature-number">0{index + 1}</span>
                  <span className="feature-icon"><Icon name={feature.icon} /></span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="how-title" className="how-section section-pad" id="como-funciona">
          <div className="how-inner page-container">
            <div className="how-copy">
              <span className="eyebrow">SIMPLES COMO ABRIR UM LIVRO</span>
              <h2 id="how-title">Sua próxima página começa aqui.</h2>
              <p>
                Crie sua estante, acompanhe cada leitura e mantenha por perto os
                livros que ainda querem encontrar você.
              </p>
              <a className="text-link" href="#inicio">Explore sua biblioteca <span aria-hidden="true">→</span></a>
            </div>
            <div className="steps-card">
              <div className="step-row">
                <span className="step-number">01</span>
                <div><h3>Monte sua estante</h3><p>Reúna seus livros em um só lugar.</p></div>
                <Icon className="step-icon" name="shelf" />
              </div>
              <div className="step-row">
                <span className="step-number">02</span>
                <div><h3>Leia no seu ritmo</h3><p>Registre o progresso de cada história.</p></div>
                <Icon className="step-icon" name="progress" />
              </div>
              <div className="step-row">
                <span className="step-number">03</span>
                <div><h3>Descubra o próximo</h3><p>Deixe sua lista pronta para quando quiser.</p></div>
                <Icon className="step-icon" name="spark" />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="closing-title" className="closing-section" id="sobre">
          <div className="closing-inner page-container">
            <span className="eyebrow">CADA LEITURA DEIXA UM POUCO DE SI</span>
            <h2 id="closing-title">Sua história também merece uma estante.</h2>
            <a className="button button--light" href="#inicio">Começar agora <span aria-hidden="true">→</span></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner page-container">
          <a aria-label="Minha Biblioteca - voltar ao início" className="brand footer-brand" href="#inicio">
            <span className="brand-mark"><Icon name="book" /></span>
            <span>Minha Biblioteca</span>
          </a>
          <p>Um cantinho especial para cada história.</p>
          <span className="footer-note">Feito para quem ama ler <span aria-hidden="true">♥</span></span>
        </div>
      </footer>
    </>
  )
}

export default App
