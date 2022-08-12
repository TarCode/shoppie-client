export function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <strong>Shoppie</strong>
        </li>
      </ul>
      <ul>
        <li>
          <button
            className="outline contrast"
            onClick={() => {
              localStorage.removeItem('user')
              window.location.assign('/')
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
