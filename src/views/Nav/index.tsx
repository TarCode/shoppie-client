import { Button } from "@mui/material"

export function Nav() {
  return (
    <div>
      <nav style={{
        height: '60px',
        position: 'fixed',
        width: '100%',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1000
      }}>
        <div>
          <strong style={{ position: 'absolute', left: '20px', top: '10px', zIndex: 1001 }}>Shoppie</strong>
          <Button
            style={{ position: 'absolute', right: '20px', top: '10px', zIndex: 1001 }}
            variant="outlined"
            onClick={() => {
              localStorage.removeItem('user')
              window.location.assign('/')
            }}
          >
            Logout
          </Button>
        </div>
      </nav>
      <div style={{ height: '60px' }}></div>
    </div>
  )
}
