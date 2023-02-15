
export default function Footer(theme) {

  return (
    <div
      className="container-fluid text-center"
      style={{ position: 'relative', bottom:'0', display:'block !important'}}
    >
      <div className="card-body">
        <h5 className="card-title">React Dictionary.com</h5>
        <p className="card-text">
          This website fetches data from freeDictionary Api.com
        </p>
        <a
          href="https://dictionaryapi.dev/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-dark"
        >
          Go to FreeDictionary.com
        </a>
      </div>
    </div>
  );
}
