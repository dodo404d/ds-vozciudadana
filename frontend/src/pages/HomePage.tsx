function HomePage() {
  return (
    <main className="page-shell">
      <nav className="navbar">
        <strong>VozCiudadana</strong>
        <span>Mini · Lite</span>
      </nav>

      <section className="hero-card">
        <p className="eyebrow">Plataforma digital mini</p>
        <h1>VozCiudadana</h1>
        <p className="hero-text">
          Base inicial para una aplicación de propuestas legislativas ciudadanas.
          En los siguientes avances se agregarán propuestas, firmas, comentarios,
          recursos, patrones de diseño y panel Congreso.
        </p>
        <div className="button-row">
          <button>Registrar propuesta</button>
          <button className="secondary">Ver propuestas</button>
          <button className="secondary">Panel Congreso</button>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
